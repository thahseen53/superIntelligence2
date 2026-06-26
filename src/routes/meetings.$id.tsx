import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  FileText,
  Download,
  Mail,
  Presentation,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Loader2,
  Mic,
  ListChecks,
} from "lucide-react";

type Search = { view?: "prep" | "summary" };

export const Route = createFileRoute("/meetings/$id")({
  head: ({ params }) => ({ meta: [{ title: `Meeting · ${params.id}` }] }),
  validateSearch: (s: Record<string, unknown>): Search => ({
    view: s.view === "summary" ? "summary" : "prep",
  }),
  component: MeetingDetail,
});

const completed = ["ascension-qbr-prev", "intermountain-eol"];

function MeetingDetail() {
  const { id } = Route.useParams();
  const { view } = Route.useSearch();
  const isCompleted = completed.includes(id);
  const defaultTab = isCompleted ? "summary" : view ?? "prep";

  return (
    <AppShell
      title="Quarterly Business Review — Mercy Health"
      subtitle="Meeting workspace · prep, deck, and post-meeting summary"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export brief
          </Button>
          <GenerateDeckButton />
        </div>
      }
    >
      <div className="mb-2 text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/meetings" className="hover:text-foreground">Meetings</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{id}</span>
      </div>

      <MeetingHeader completed={isCompleted} />

      <Tabs defaultValue={defaultTab} className="mt-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="prep">Meeting prep</TabsTrigger>
          <TabsTrigger value="summary">Summary & actions</TabsTrigger>
          <TabsTrigger value="deck">Deck</TabsTrigger>
        </TabsList>

        <TabsContent value="prep" className="mt-6">
          <PrepTab />
        </TabsContent>
        <TabsContent value="summary" className="mt-6">
          <SummaryTab completed={isCompleted} />
        </TabsContent>
        <TabsContent value="deck" className="mt-6">
          <DeckTab />
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function MeetingHeader({ completed }: { completed: boolean }) {
  return (
    <Card className="border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">
        <div className="p-6" style={{ background: "var(--gradient-hero)" }}>
          <Badge className="bg-primary-foreground/15 text-primary-foreground border-0 mb-3">
            {completed ? "Completed · Jun 18, 2026" : "Today · in 2h 14m"}
          </Badge>
          <h2 className="text-xl font-semibold text-primary-foreground">
            Quarterly Business Review — Mercy Health
          </h2>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-primary-foreground/85">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Tue, Jun 23, 2026</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 2:00 – 3:00 PM ET</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Microsoft Teams</span>
          </div>
        </div>
        <div className="p-6 bg-card">
          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" /> Attendees
          </div>
          <div className="space-y-2">
            {[
              { n: "Dr. Elena Park", r: "CIO · Mercy", tag: "New" },
              { n: "Marcus Chen", r: "VP Imaging · Mercy" },
              { n: "Sara Reyes", r: "ECE · Philips" },
              { n: "Tom Bauer", r: "BU Lead IGT · Philips" },
            ].map((a) => (
              <div key={a.n} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-secondary text-primary-deep flex items-center justify-center text-xs font-semibold">
                  {a.n.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground flex items-center gap-2">
                    {a.n}
                    {a.tag && (
                      <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                        {a.tag}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{a.r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function PrepTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-border/60 shadow-[var(--shadow-card)]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">AI executive brief</CardTitle>
            </div>
            <CardDescription>Generated 8 min ago · 12 sources synthesized</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-foreground">
            <p>
              <strong>Mercy Health</strong> is entering FY27 with a $120M imaging
              modernization capex program. New CIO <strong>Dr. Elena Park</strong>,
              formerly of Cleveland Clinic, has a published track record of consolidating
              vendor footprints and prioritizing image-guided therapy.
            </p>
            <p>
              Lead with <strong>IGT cath lab modernization</strong> and the{" "}
              <strong>HPM monitoring bundle</strong> — both align directly with her public
              statements and Mercy's strategic roadmap.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Recommended talking points</CardTitle>
            <CardDescription>Tailored to attendees and current signals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { t: "Congratulate Dr. Park on CIO appointment", d: "Reference her recent HIMSS keynote on integrated care platforms.", tone: "primary" },
              { t: "Position Azurion for cath lab modernization", d: "6 sites planned by 2027 — case studies from Ascension and Banner.", tone: "primary" },
              { t: "Flag stalled IGT-2026 opportunity carefully", d: "Re-anchor on clinical outcomes; avoid pricing discussion early.", tone: "warning" },
              { t: "Cross-sell HPM monitoring with EOL replacement", d: "12 IntelliVue units reach EOL Q4 — propose bundled refresh.", tone: "success" },
            ].map((p) => (
              <div key={p.t} className="flex gap-3 p-4 rounded-lg border bg-card">
                <div className={`h-8 w-8 shrink-0 rounded-md flex items-center justify-center ${
                  p.tone === "warning" ? "bg-warning/15 text-warning-foreground"
                    : p.tone === "success" ? "bg-success/15 text-success"
                      : "bg-primary/10 text-primary"
                }`}>
                  {p.tone === "warning" ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">{p.t}</div>
                  <div className="text-xs text-muted-foreground mt-1">{p.d}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Competitive flags</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { v: "GE Healthcare", n: "Recent MRI win at Anderson site — expect comparison Qs." },
              { v: "Siemens", n: "Artis pilot ended Q1 without renewal — leverage clinical outcomes." },
            ].map((c) => (
              <div key={c.v} className="p-4 rounded-lg border bg-card">
                <div className="text-sm font-semibold text-foreground">{c.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.n}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-border/60 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> Pre-meeting email draft
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground mb-2">To: Dr. Elena Park</div>
            <div className="text-sm text-foreground leading-relaxed bg-secondary rounded-md p-3 border whitespace-pre-line">
{`Dr. Park,

Looking forward to today's QBR and to learning more about your vision for Mercy's imaging strategy.

Ahead of the call, I've shared a short brief on how Philips IGT and HPM align with your FY27 priorities.

Best,
Sara`}
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="flex-1">Regenerate</Button>
              <Button size="sm" className="flex-1">Send</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "Executive brief — Mercy QBR.pdf",
              "Azurion cath lab case study.pptx",
              "HPM bundle proposal v3.docx",
            ].map((d) => (
              <div key={d} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {d}
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function GenerateDeckButton() {
  const [state, setState] = useState<"idle" | "generating" | "ready">("idle");
  return (
    <Button
      className="gap-2"
      onClick={() => {
        setState("generating");
        setTimeout(() => setState("ready"), 1800);
      }}
    >
      {state === "generating" ? (
        <><Loader2 className="h-4 w-4 animate-spin" /> Generating deck…</>
      ) : state === "ready" ? (
        <><CheckCircle2 className="h-4 w-4" /> Deck ready</>
      ) : (
        <><Presentation className="h-4 w-4" /> Generate presentation</>
      )}
    </Button>
  );
}

function DeckTab() {
  const slides = [
    { t: "Welcome — Mercy Health × Philips", s: "Title · partnership context" },
    { t: "Your FY27 strategic priorities", s: "Sourced from press release & board minutes" },
    { t: "Where Philips fits today", s: "Install base · 127 systems across 42 sites" },
    { t: "Cath lab modernization with Azurion", s: "6-site rollout · Banner case study" },
    { t: "HPM bundle: EOL refresh + early-warning", s: "12 IntelliVue units · sepsis program fit" },
    { t: "Implementation roadmap", s: "Q3 pilot · Q1'27 full deployment" },
    { t: "Next steps & decisions needed", s: "Champion alignment, pricing window" },
  ];
  return (
    <Card className="border-border/60 shadow-[var(--shadow-card)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Presentation className="h-4 w-4 text-primary" /> Generated deck · 7 slides
            </CardTitle>
            <CardDescription>Auto-built from the executive brief, install base, and competitive flags</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Download .pptx
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {slides.map((s, i) => (
          <div key={s.t} className="rounded-lg border bg-card overflow-hidden hover:border-primary/40 transition-colors cursor-pointer">
            <div
              className="aspect-video flex items-end p-3 text-primary-foreground"
              style={{ background: "var(--gradient-hero)" }}
            >
              <div>
                <div className="text-[10px] uppercase tracking-wider opacity-80">Slide {i + 1}</div>
                <div className="text-xs font-semibold leading-tight mt-1 line-clamp-2">{s.t}</div>
              </div>
            </div>
            <div className="p-3 text-xs text-muted-foreground">{s.s}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SummaryTab({ completed }: { completed: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-border/60 shadow-[var(--shadow-card)]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Meeting summary</CardTitle>
            </div>
            <CardDescription>
              {completed
                ? "Transcribed from Microsoft Teams · 48 min · 4 attendees"
                : "Summary will appear here automatically once the meeting completes."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-foreground leading-relaxed">
            <p>
              The QBR opened with Dr. Park outlining Mercy's FY27 focus on cath lab
              modernization and a unified monitoring platform. Sara presented the
              Azurion 6-site plan and HPM bundle; both received positive signals.
            </p>
            <p>
              The IGT-2026 opportunity was discussed candidly. Dr. Park requested a
              clinical-outcomes addendum before re-engaging procurement.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="outline" className="text-success border-success/30 bg-success/10">Positive sentiment</Badge>
              <Badge variant="secondary">2 commitments captured</Badge>
              <Badge variant="secondary">1 follow-up requested</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-primary" /> Action items
            </CardTitle>
            <CardDescription>Auto-extracted · assign owners and due dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { t: "Send Azurion clinical outcomes addendum to Dr. Park", owner: "Sara Reyes", due: "Jun 25", done: true },
              { t: "Schedule clinical workshop with cardiology team", owner: "Tom Bauer", due: "Jul 1", done: false },
              { t: "Draft HPM bundle pricing for 12-unit refresh", owner: "Deal desk", due: "Jun 27", done: false },
              { t: "Log opportunity stage change to 'Proposal'", owner: "Sara Reyes", due: "Jun 24", done: true },
            ].map((a) => (
              <div key={a.t} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <CheckCircle2 className={`h-4 w-4 shrink-0 ${a.done ? "text-success" : "text-muted-foreground/40"}`} />
                <div className="flex-1">
                  <div className={`text-sm ${a.done ? "text-muted-foreground line-through" : "text-foreground font-medium"}`}>
                    {a.t}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.owner} · due {a.due}</div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Mic className="h-4 w-4 text-primary" /> Key quotes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { who: "Dr. Park", q: "We need a vendor that can grow with us across imaging and monitoring — not 12 separate contracts." },
              { who: "Marcus Chen", q: "If Azurion's downtime story holds in Anderson, we can fast-track procurement." },
            ].map((k) => (
              <div key={k.q} className="border-l-2 border-primary/40 pl-3">
                <div className="italic text-foreground">"{k.q}"</div>
                <div className="text-xs text-muted-foreground mt-1">— {k.who}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-border/60 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> Follow-up email draft
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground mb-2">To: Dr. Elena Park, Marcus Chen</div>
            <div className="text-sm text-foreground leading-relaxed bg-secondary rounded-md p-3 border whitespace-pre-line">
{`Hi Elena, Marcus,

Thanks for a great QBR. As discussed, I'm sharing the Azurion clinical outcomes addendum and an HPM bundle pricing draft.

Proposing a clinical workshop with the cardiology team week of Jul 1.

— Sara`}
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="flex-1">Regenerate</Button>
              <Button size="sm" className="flex-1">Send</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">CRM updates</CardTitle>
            <CardDescription>Ready to push to Salesforce</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              "IGT-2026: stage → Proposal",
              "Mercy Health: add contact 'Dr. Elena Park (CIO)'",
              "Log meeting activity (48 min)",
            ].map((s) => (
              <div key={s} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-success" />
                <span className="text-foreground">{s}</span>
              </div>
            ))}
            <Button size="sm" className="w-full mt-2">Sync to Salesforce</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
