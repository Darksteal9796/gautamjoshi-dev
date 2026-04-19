import { getAnthropicClient } from "@/lib/anthropic";
import {
  validateChatRequest,
} from "@/lib/chat-validate";
import {
  checkRateLimit,
  type RateLimitConfig,
  type RateLimitState,
} from "@/lib/rate-limit";
import {
  canSpendTokens,
  initialBudget,
  recordTokens,
  type TokenBudgetState,
} from "@/lib/token-budget";
import { systemPrompt } from "@/content/system-prompt";

export const runtime = "edge";

const CHAT_MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 200;
const TEMPERATURE = 0.5;

const RATE_LIMIT: RateLimitConfig = {
  limit: 10,
  windowMs: 5 * 60 * 1000,
};

function getDailyTokenCap(): number {
  const raw = process.env.CHAT_DAILY_TOKEN_CAP;
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 500_000;
}

const rateLimitState: RateLimitState = new Map();
let budgetState: TokenBudgetState = initialBudget();

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const SSE_HEADERS = {
  "content-type": "text/event-stream",
  "cache-control": "no-cache, no-transform",
  "x-accel-buffering": "no",
};

export async function POST(req: Request): Promise<Response> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return jsonResponse({ error: "invalid json" }, 400);
  }

  const parsed = validateChatRequest(raw);
  if (!parsed.ok) {
    return jsonResponse({ error: "invalid request" }, 400);
  }

  const now = Date.now();
  const ip = getClientIp(req);

  const rl = checkRateLimit(rateLimitState, ip, now, RATE_LIMIT);
  if (!rl.allowed) {
    return new Response(JSON.stringify({ error: "slow down" }), {
      status: 429,
      headers: {
        "content-type": "application/json",
        "retry-after": String(Math.ceil(rl.retryAfterMs / 1000)),
      },
    });
  }

  const cap = getDailyTokenCap();
  if (!canSpendTokens(budgetState, now, cap)) {
    return jsonResponse({ error: "chat is offline today" }, 503);
  }

  let client;
  try {
    client = getAnthropicClient();
  } catch {
    return jsonResponse({ error: "chat unavailable" }, 500);
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const write = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      };

      try {
        const streaming = client.messages.stream({
          model: CHAT_MODEL,
          max_tokens: MAX_TOKENS,
          temperature: TEMPERATURE,
          system: [
            {
              type: "text",
              text: systemPrompt,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: parsed.value.messages,
        });

        for await (const event of streaming) {
          write(JSON.stringify(event));
        }

        try {
          const finalMsg = await streaming.finalMessage();
          const total =
            (finalMsg.usage?.input_tokens ?? 0) +
            (finalMsg.usage?.output_tokens ?? 0);
          budgetState = recordTokens(budgetState, Date.now(), total);
        } catch {
          // ignore — stream already surfaced errors above
        }

        write("[DONE]");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "unknown upstream error";
        write(JSON.stringify({ type: "error", message }));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: SSE_HEADERS });
}
