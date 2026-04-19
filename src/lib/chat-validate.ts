export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatRequest = {
  messages: ChatMessage[];
};

export const MAX_MESSAGES = 40;
export const MAX_CONTENT_CHARS = 4000;

export function validateChatRequest(
  body: unknown
): { ok: true; value: ChatRequest } | { ok: false; reason: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, reason: "body must be an object" };
  }
  const b = body as Record<string, unknown>;
  if (!Array.isArray(b.messages)) {
    return { ok: false, reason: "messages must be an array" };
  }
  if (b.messages.length === 0) {
    return { ok: false, reason: "messages cannot be empty" };
  }
  if (b.messages.length > MAX_MESSAGES) {
    return { ok: false, reason: "too many messages" };
  }

  const out: ChatMessage[] = [];
  for (let i = 0; i < b.messages.length; i++) {
    const m = b.messages[i];
    if (!m || typeof m !== "object") {
      return { ok: false, reason: `messages[${i}] must be an object` };
    }
    const msg = m as Record<string, unknown>;
    if (msg.role !== "user" && msg.role !== "assistant") {
      return {
        ok: false,
        reason: `messages[${i}].role must be "user" or "assistant"`,
      };
    }
    if (typeof msg.content !== "string") {
      return {
        ok: false,
        reason: `messages[${i}].content must be a string`,
      };
    }
    if (msg.content.length === 0) {
      return { ok: false, reason: `messages[${i}].content cannot be empty` };
    }
    if (msg.content.length > MAX_CONTENT_CHARS) {
      return {
        ok: false,
        reason: `messages[${i}].content exceeds ${MAX_CONTENT_CHARS} chars`,
      };
    }
    out.push({ role: msg.role, content: msg.content });
  }
  if (out[0].role !== "user") {
    return { ok: false, reason: "first message must be from user" };
  }
  return { ok: true, value: { messages: out } };
}
