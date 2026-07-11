"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function AiCoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm your AI Career Coach. Ask me anything about your career — what to learn, whether you're ready for a role, salary expectations, or how to improve your CV.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", text: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong.");
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch {
      toast.error("Failed to reach AI Coach.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-0 flex-col">
      <div>
        <h1 className="text-4xl font-bold">AI Career Coach</h1>
        <p className="mt-2 text-muted-foreground">
          Ask anything about your career path.
        </p>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 flex-col rounded-3xl border border-border bg-card p-6">
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Bot size={16} className="text-primary" />
                </div>
              )}

<div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="space-y-2 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>

              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15">
                <Bot size={16} className="text-primary" />
              </div>
              <div className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                Thinking...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Ask your career coach..."
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}