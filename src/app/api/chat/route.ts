import { getChatClient } from "@/lib/chat-client";
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

const CHAT_MODEL =
  process.env.CHAT_MODEL ?? "openai/gpt-oss-20b:free";
const CHAT_FALLBACK_MODELS = (
  process.env.CHAT_FALLBACK_MODELS ??
  "z-ai/glm-4.5-air:free,google/gemma-3-27b-it:free,meta-llama/llama-3.3-70b-instruct:free,qwen/qwen3-next-80b-a3b-instruct:free"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
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
    client = getChatClient();
  } catch {
    return jsonResponse({ error: "chat unavailable" }, 500);
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const writeEvent = (event: Record<string, unknown>) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
        );
      };
      const writeRaw = (s: string) => {
        controller.enqueue(encoder.encode(`data: ${s}\n\n`));
      };

      try {
        // OpenRouter extension: `models` is a fallback chain, absent from the OpenAI SDK types.
        const streaming = (await client.chat.completions.create({
          model: CHAT_MODEL,
          max_tokens: MAX_TOKENS,
          temperature: TEMPERATURE,
          stream: true,
          messages: [
            { role: "system", content: systemPrompt },
            ...parsed.value.messages,
          ],
          stream_options: { include_usage: true },
          ...(CHAT_FALLBACK_MODELS.length > 0 && {
            models: CHAT_FALLBACK_MODELS,
          }),
        } as Parameters<typeof client.chat.completions.create>[0])) as AsyncIterable<{
          choices?: Array<{ delta?: { content?: string | null } }>;
          usage?: { prompt_tokens?: number; completion_tokens?: number };
        }>;

        let usageInput = 0;
        let usageOutput = 0;

        for await (const chunk of streaming) {
          const delta = chunk.choices?.[0]?.delta?.content;
          if (typeof delta === "string" && delta.length > 0) {
            writeEvent({
              type: "content_block_delta",
              delta: { type: "text_delta", text: delta },
            });
          }
          if (chunk.usage) {
            usageInput = chunk.usage.prompt_tokens ?? usageInput;
            usageOutput = chunk.usage.completion_tokens ?? usageOutput;
          }
        }

        budgetState = recordTokens(
          budgetState,
          Date.now(),
          usageInput + usageOutput
        );

        writeRaw("[DONE]");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "unknown upstream error";
        writeEvent({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: SSE_HEADERS });
}
