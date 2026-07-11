"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import { suggestedPrompts } from "@/data/knowledge";

/**
 * Floating AI chat assistant with a Messenger hand-off.
 *
 * The launcher opens a panel that streams answers from /api/chat (which holds
 * the Gemini key server-side). A "Chat on Messenger" button routes visitors to
 * a human. Degrades gracefully: if the AI is unavailable, it shows a friendly
 * fallback pointing at Messenger / email.
 */

type ChatMessage = { role: "user" | "assistant"; content: string; error?: boolean };

const STORAGE_KEY = "ps-chat-history";
const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm the Peak Status assistant. Ask me about our services, packages, or how to get started.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messenger = siteConfig.messengerUrl;

  // Restore prior conversation for the session.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist + autoscroll on new messages.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Esc to close; focus the input when opened.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const history = [...messages, { role: "user" as const, content: trimmed }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Only user/assistant turns (drop the local greeting) go to the model.
        body: JSON.stringify({
          messages: history.filter((m, i) => !(i === 0 && m === GREETING)),
        }),
      });

      if (!res.ok || !res.body) throw new Error("unavailable");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
      if (!acc.trim()) throw new Error("empty");
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Sorry — I couldn't reach the assistant just now. You can chat with the team directly on Messenger or email us.",
          error: true,
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink shadow-lg shadow-black/40 transition-transform hover:scale-[1.06] active:scale-95 sm:bottom-6 sm:right-6"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
            <path d="M12 2C6.5 2 2 6.02 2 10.98c0 2.79 1.42 5.28 3.66 6.92V22l3.35-1.84c.96.27 1.98.41 3.03.41 5.5 0 10-4.02 10-8.98S17.5 2 12 2Zm.98 12.09-2.55-2.72-4.98 2.72 5.48-5.82 2.61 2.72 4.92-2.72-5.48 5.82Z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Peak Status chat assistant"
          className="fixed bottom-24 right-4 z-40 flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-soft shadow-2xl shadow-black/50 sm:right-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div>
              <p className="font-display text-sm font-semibold text-foreground">
                Peak Status Assistant
              </p>
              <p className="text-[0.7rem] text-muted">AI-powered · replies in seconds</p>
            </div>
            {messenger && (
              <a
                href={messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-white/30 hover:text-foreground"
              >
                Messenger ↗
              </a>
            )}
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-white text-ink"
                      : m.error
                        ? "border border-white/10 bg-white/[0.03] text-muted"
                        : "border border-white/10 bg-white/[0.03] text-foreground"
                  }`}
                >
                  {m.content || (busy && i === messages.length - 1 ? "…" : m.content)}
                  {m.error && messenger && (
                    <span className="mt-2 block">
                      <a
                        href={messenger}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground underline underline-offset-2"
                      >
                        Chat on Messenger
                      </a>
                      {" · "}
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-foreground underline underline-offset-2"
                      >
                        Email us
                      </a>
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Suggested prompts (only before the visitor has asked anything) */}
            {messages.filter((m) => m.role === "user").length === 0 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => send(p)}
                    className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1.5 text-xs text-muted transition-colors hover:border-white/30 hover:text-foreground"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-white/10 p-3"
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                maxLength={2000}
                placeholder="Ask about our services…"
                className="max-h-28 flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-white/35"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-center text-[0.65rem] text-muted/50">
              AI assistant — for exact quotes we&apos;ll confirm with the team.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
