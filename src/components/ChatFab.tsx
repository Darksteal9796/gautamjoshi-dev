"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

type Tone = "red" | "amber" | "dim";

type Message = {
  id: string;
  role: "user" | "bot" | "error";
  content: string;
  tone?: Tone;
};

const GREETING: Message = {
  id: "greeting",
  role: "bot",
  content:
    "Hey — I'm Gautam's AI. Ask about his stack, projects, or availability.",
};

const SUGGESTIONS = [
  "strongest skill?",
  "revenue engine?",
  "hiring?",
] as const;

const TONE_CLASS: Record<Tone, string> = {
  red: "text-[#ff3a4d]",
  amber: "text-amber",
  dim: "text-dim",
};

let idCounter = 0;
function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

export default function ChatFab() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [sending, setSending] = useState(false);

  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [messages]);

  const replaceMessage = useCallback((id: string, patch: Partial<Message>) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m))
    );
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;

      const userMsg: Message = {
        id: nextId("u"),
        role: "user",
        content: trimmed,
      };
      const placeholder: Message = {
        id: nextId("b"),
        role: "bot",
        content: "thinking…",
      };

      setMessages((prev) => [...prev, userMsg, placeholder]);
      setInput("");
      setSending(true);

      const apiMessages: { role: "user" | "assistant"; content: string }[] = [];
      for (const m of messages) {
        if (m.id === GREETING.id || m.role === "error") continue;
        apiMessages.push({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.content,
        });
      }
      apiMessages.push({ role: "user", content: trimmed });

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        });

        if (res.status === 429) {
          replaceMessage(placeholder.id, {
            role: "error",
            content: "take a breath and try again in a minute",
            tone: "dim",
          });
          return;
        }
        if (res.status === 503) {
          replaceMessage(placeholder.id, {
            role: "error",
            content:
              "AI is resting. Email me at gautamjoshi.dev@gmail.com.",
            tone: "amber",
          });
          return;
        }
        if (!res.ok || !res.body) {
          replaceMessage(placeholder.id, {
            role: "error",
            content:
              "connection error — try again or email me direct: gautamjoshi.dev@gmail.com",
            tone: "red",
          });
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffered = "";
        let reply = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffered += decoder.decode(value, { stream: true });
          const parts = buffered.split("\n\n");
          buffered = parts.pop() ?? "";

          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const evt = JSON.parse(data);
              if (
                evt.type === "content_block_delta" &&
                evt.delta?.type === "text_delta" &&
                typeof evt.delta.text === "string"
              ) {
                reply += evt.delta.text;
                replaceMessage(placeholder.id, { content: reply });
              }
            } catch {
              // tolerate malformed SSE chunks
            }
          }
        }

        if (!reply) {
          replaceMessage(placeholder.id, {
            role: "error",
            content:
              "no response — try again or email me direct: gautamjoshi.dev@gmail.com",
            tone: "red",
          });
        }
      } catch {
        replaceMessage(placeholder.id, {
          role: "error",
          content:
            "connection error — try again or email me direct: gautamjoshi.dev@gmail.com",
          tone: "red",
        });
      } finally {
        setSending(false);
      }
    },
    [messages, replaceMessage, sending]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send(input);
  };

  const showSuggestions = messages.length === 1 && !sending;

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Ask Gautam.AI chat"
          className="anim-chat-panel-in fixed z-[90] bottom-[78px] right-3.5 min-[720px]:bottom-[96px] min-[720px]:right-6 w-[340px] max-w-[calc(100vw-28px)] max-h-[440px] flex flex-col rounded-[12px] border border-line bg-panel shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden"
        >
          <header className="flex items-center gap-2 px-3.5 py-2.5 border-b border-line bg-panel2">
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber text-ink-on-amber font-mono text-[10px] font-bold tracking-[0.06em]"
            >
              AI
            </span>
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg flex-1">
              Ask Gautam.AI
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-green">
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rounded-full bg-green"
              />
              Online
            </span>
          </header>

          <div
            ref={bodyRef}
            aria-live="polite"
            className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2 text-[13px] leading-[1.5]"
          >
            {messages.map((m) => {
              if (m.role === "user") {
                return (
                  <div
                    key={m.id}
                    className="self-end max-w-[85%] rounded-[10px] rounded-br-[4px] bg-amber text-ink-on-amber px-3 py-2"
                  >
                    {m.content}
                  </div>
                );
              }
              if (m.role === "error") {
                const tone = m.tone ? TONE_CLASS[m.tone] : TONE_CLASS.red;
                return (
                  <div
                    key={m.id}
                    className={`self-start max-w-[85%] px-1 py-1 italic ${tone}`}
                  >
                    {m.content}
                  </div>
                );
              }
              return (
                <div
                  key={m.id}
                  className="self-start max-w-[85%] rounded-[10px] rounded-bl-[4px] bg-panel2 text-fg px-3 py-2 border border-line"
                >
                  {m.content}
                </div>
              );
            })}
          </div>

          {showSuggestions && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="font-mono text-[11px] tracking-[0.04em] rounded-full border border-line bg-panel2 px-2.5 py-1 text-dim hover:text-amber hover:border-amber transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-2 border-t border-line bg-panel2"
          >
            <label htmlFor="chatfab-input" className="sr-only">
              Message
            </label>
            <input
              id="chatfab-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sending}
              placeholder="ask anything..."
              className="flex-1 bg-transparent text-[13px] text-fg placeholder:text-dim outline-none"
              autoComplete="off"
              maxLength={300}
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase rounded-full bg-amber text-ink-on-amber px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={
          open ? "Close Ask Gautam.AI" : "Ask Gautam.AI — open chat"
        }
        aria-expanded={open}
        className="fixed z-[90] bottom-3.5 right-3.5 min-[720px]:bottom-6 min-[720px]:right-6 w-14 h-14 rounded-full bg-amber text-ink-on-amber font-mono text-[13px] font-bold tracking-[0.08em] shadow-[0_8px_24px_rgba(255,190,11,0.35)] anim-chat-fab-bob scale-[0.82] min-[380px]:scale-90 min-[720px]:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber cursor-pointer"
      >
        AI
      </button>
    </>
  );
}
