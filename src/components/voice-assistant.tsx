import { useState } from "react";
import { Mic, MicOff, Send, Sparkles, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Msg = { role: "user" | "assistant"; text: string };

const seed: Msg[] = [
  {
    role: "assistant",
    text: "Hi Sara — I'm your voice assistant. Ask me about an account, meeting, or opportunity.",
  },
];

export function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  function send(text?: string) {
    const t = (text ?? input).trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: t },
      {
        role: "assistant",
        text: "Based on Salesforce + public sources: Mercy Health's IGT-2026 opportunity has been stalled 38 days. Recommended next action: send Dr. Park a personalized note with the Azurion case study.",
      },
    ]);
    setInput("");
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="relative"
        aria-label="Open voice assistant"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-success" />
      </Button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
          />
          <div className="fixed bottom-4 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl border bg-card shadow-[var(--shadow-elevated)] overflow-hidden flex flex-col max-h-[600px]">
            <div
              className="px-4 py-3 flex items-center gap-2 text-primary-foreground"
              style={{ background: "var(--gradient-hero)" }}
            >
              <div className="h-8 w-8 rounded-md bg-primary-foreground/15 flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">IRIS Voice Assistant</div>
                <div className="text-[11px] opacity-80">Always on · for your territory</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/15"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "flex justify-end" : "flex gap-2"}
                >
                  {m.role === "assistant" && (
                    <div className="h-6 w-6 shrink-0 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      <Sparkles className="h-3 w-3" />
                    </div>
                  )}
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-xl rounded-tr-sm bg-primary text-primary-foreground px-3 py-2 text-sm"
                        : "max-w-[85%] text-sm text-foreground leading-relaxed"
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {listening && (
                <div className="flex items-center gap-2 text-xs text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Listening…
                </div>
              )}
            </div>

            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {["What's new at Mercy?", "Prep my 2pm meeting", "Risks this week"].map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] px-2.5 py-1 rounded-full border bg-secondary hover:bg-accent text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="border-t p-2 flex items-center gap-2">
              <Button
                variant={listening ? "default" : "outline"}
                size="icon"
                className="shrink-0"
                onClick={() => setListening((l) => !l)}
                aria-label="Toggle microphone"
              >
                {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Speak or type…"
                className="flex-1"
              />
              <Button size="icon" onClick={() => send()} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="px-3 pb-2 flex justify-center">
              <Badge variant="secondary" className="text-[10px]">
                Powered by Philips IRIS
              </Badge>
            </div>
          </div>
        </>
      )}
    </>
  );
}
