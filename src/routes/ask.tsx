import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  Send,
  Mic,
  Paperclip,
  Globe,
  Database,
  Building2,
  Clock,
  BookMarked,
  ExternalLink,
  // Headphones,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/ask")({
  head: () => ({ meta: [{ title: "Ask AI · Sales Intelligence" }] }),
  component: Ask,
});

const suggested = [
  "Summarize the latest news on Mercy Health",
  "Draft an intro email to Dr. Elena Park",
  "Compare Philips Azurion vs Siemens Artis for IGT",
  "Which of my accounts have monitors reaching EOL in 2026?",
];

const saved = [
  "Quarterly account brief template",
  "Competitive battle card (DI)",
  "Executive intro outreach",
];

type Msg = { role: "user" | "assistant"; content: string };

function Ask() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi Sara — I'm your account intelligence agent. Ask me anything about your territory, accounts, or upcoming meetings. I can pull from public sources and your internal Salesforce, ServiceMax, and Outlook data.",
    },
  ]);
  const [input, setInput] = useState("");

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      { role: "user", content: text },
      {
        role: "assistant",
        content:
          "Here's a synthesis from 5 sources (3 public, 2 private):\n\n• Mercy Health appointed Dr. Elena Park as CIO on Jun 19 — she previously led digital transformation at Cleveland Clinic.\n• Q3 board minutes approved a $120M imaging capex program.\n• Salesforce: 6 open opportunities ($4.2M total), one at risk (IGT-2026, stalled 38 days).\n• ServiceMax: 12 IntelliVue monitors reach EOL in Q4 — strong renewal angle.\n\nRecommended next action: send a personalized congratulations + IGT case study to Dr. Park within the next 48 hours.",
      },
    ]);
    setInput("");
  }

  return (
    <AppShell
      title="Ask AI"
      subtitle="Conversational workspace · your designated agents"
      titleActions={
        <button
          onClick={() =>
            toast("Download the app to go hands free mode with Ask AI", {
              icon: <Smartphone className="h-4 w-4" />,
            })
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:bg-foreground/80 transition-colors"
        >
          <Smartphone className="h-3.5 w-3.5" /> Go Hands Free
        </button>
      }
    >
      {/* <div className="flex justify-end mb-4">
        <button
          onClick={() =>
            toast("Download the app to go hands free mode with Ask AI", {
              icon: <Headphones className="h-4 w-4" />,
            })
          }
          className="inline-flex items-center gap-2 text-primary hover:text-primary-deep font-medium text-sm"
        >
          <Headphones className="h-4 w-4" /> Go Hands Free
        </button>
      </div> */}

      {/* Go Hands Free — sits above the grid, right-aligned to chat card, top aligned to Ask AI title */}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Conversation */}
        <Card className="border-border/60 shadow-[var(--shadow-card)] flex flex-col min-h-[70vh]">
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex items-center justify-between px-5 py-3 border-b">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="text-sm font-medium">New conversation</div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Globe className="h-3 w-3" />
                  Public
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Database className="h-3 w-3" />
                  Salesforce
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Database className="h-3 w-3" />
                  ServiceMax
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Last 30 days
                </Badge>
              </div>
            </div>

            <div className="flex-1 px-5 py-6 space-y-6 overflow-y-auto">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex gap-3"}>
                  {m.role === "assistant" && (
                    <div className="h-8 w-8 shrink-0 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[75%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-4 py-3 text-sm"
                        : "max-w-[80%] text-sm text-foreground whitespace-pre-line leading-relaxed"
                    }
                  >
                    {m.content}
                    {m.role === "assistant" && i > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "Annual report.pdf",
                          "Press release",
                          "Salesforce opps",
                          "ServiceMax IB",
                        ].map((s, j) => (
                          <Badge
                            key={s}
                            variant="outline"
                            className="gap-1 text-[10px] font-normal"
                          >
                            {j < 2 ? (
                              <Globe className="h-3 w-3" />
                            ) : (
                              <Database className="h-3 w-3" />
                            )}
                            {s}
                            <ExternalLink className="h-3 w-3" />
                          </Badge>
                        ))}
                        <Badge
                          variant="outline"
                          className="text-[10px] text-success border-success/30 bg-success/10"
                        >
                          High confidence
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {messages.length <= 1 && (
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {suggested.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="text-xs px-3 py-1.5 rounded-full border bg-secondary hover:bg-accent text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="border-t p-3">
              <div className="rounded-xl border bg-card focus-within:border-primary/50 transition-colors">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Ask anything about your accounts, opportunities, or contacts…"
                  className="border-0 resize-none min-h-[60px] focus-visible:ring-0 shadow-none bg-transparent"
                />
                <div className="flex items-center justify-between px-2 pb-2">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={send} size="sm" className="gap-2">
                    Send <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right rail */}
        <div className="space-y-6">
          <Card className="border-border/60 shadow-[var(--shadow-card)]">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Account context</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Scope this conversation to an account for sharper answers.
              </p>
              {["Mercy Health System", "HCA Houston", "Northwell Health"].map((a) => (
                <button
                  key={a}
                  className="w-full text-left text-sm px-3 py-2 rounded-md hover:bg-secondary text-foreground"
                >
                  {a}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-[var(--shadow-card)]">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <BookMarked className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Prompt library</h3>
              </div>
              <div className="space-y-1">
                {saved.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="w-full text-left text-sm px-3 py-2 rounded-md hover:bg-secondary text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
