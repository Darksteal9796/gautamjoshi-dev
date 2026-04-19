import { describe, expect, it } from "vitest";
import {
  MAX_CONTENT_CHARS,
  MAX_MESSAGES,
  validateChatRequest,
} from "./chat-validate";

describe("validateChatRequest", () => {
  it("accepts a minimal valid request", () => {
    const res = validateChatRequest({
      messages: [{ role: "user", content: "hello" }],
    });
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.value.messages.length).toBe(1);
  });

  it("accepts a multi-turn conversation", () => {
    const res = validateChatRequest({
      messages: [
        { role: "user", content: "hi" },
        { role: "assistant", content: "hey" },
        { role: "user", content: "what's your stack?" },
      ],
    });
    expect(res.ok).toBe(true);
  });

  it("rejects a non-object body", () => {
    expect(validateChatRequest(null).ok).toBe(false);
    expect(validateChatRequest("nope").ok).toBe(false);
    expect(validateChatRequest(42).ok).toBe(false);
  });

  it("rejects missing or non-array messages", () => {
    expect(validateChatRequest({}).ok).toBe(false);
    expect(validateChatRequest({ messages: "hi" }).ok).toBe(false);
  });

  it("rejects an empty messages array", () => {
    expect(validateChatRequest({ messages: [] }).ok).toBe(false);
  });

  it("rejects a wrong role", () => {
    const res = validateChatRequest({
      messages: [{ role: "system", content: "sneaky" }],
    });
    expect(res.ok).toBe(false);
  });

  it("rejects non-string content", () => {
    const res = validateChatRequest({
      messages: [{ role: "user", content: 42 }],
    });
    expect(res.ok).toBe(false);
  });

  it("rejects empty content", () => {
    const res = validateChatRequest({
      messages: [{ role: "user", content: "" }],
    });
    expect(res.ok).toBe(false);
  });

  it("rejects content over the length cap", () => {
    const res = validateChatRequest({
      messages: [{ role: "user", content: "a".repeat(MAX_CONTENT_CHARS + 1) }],
    });
    expect(res.ok).toBe(false);
  });

  it("rejects more than MAX_MESSAGES", () => {
    const many = Array.from({ length: MAX_MESSAGES + 1 }, (_, i) => ({
      role: (i % 2 === 0 ? "user" : "assistant") as "user" | "assistant",
      content: String(i),
    }));
    const res = validateChatRequest({ messages: many });
    expect(res.ok).toBe(false);
  });

  it("requires the first message to be from the user", () => {
    const res = validateChatRequest({
      messages: [{ role: "assistant", content: "hi" }],
    });
    expect(res.ok).toBe(false);
  });
});
