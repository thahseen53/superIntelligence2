import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Users,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  Globe,
  Database,
  ChevronRight,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/accounts/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Account · ${params.id}` }],
  }),
  component: AccountDetail,
});

function AccountDetail() {
  const { id } = Route.useParams();
  const name = id
    .split("-")
    .map((w: string) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <AppShell
      title={name}
      subtitle="Account 360 · designated AI agent active"
      actions={
        <Button asChild variant="outline" className="gap-2">
          <Link to="/ask">
            <Sparkles className="h-4 w-4" /> Ask about this account
          </Link>
        </Button>
      }
    >
      <div className="mb-2 text-xs text-muted-foreground flex items-center gap-1">
        <Link to="/accounts" className="hover:text-foreground">Accounts</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{name}</span>
      </div>

      {/* Hero */}
      <Card className="mb-6 border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row gap-6" style={{ background: "var(--gradient-soft)" }}>
          <div className="h-16 w-16 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shrink-0">
            {name[0]}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold text-foreground">{name}</h2>
              <Badge variant="secondary">IDN</Badge>
              <Badge variant="outline" className="text-success border-success/30 bg-success/10">Health 82</Badge>
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Cincinnati, OH</span>
              <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> 42 facilities · 8,200 beds</span>
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> 18 known contacts</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center md:text-right">
            <div>
              <div className="text-xs text-muted-foreground">Open pipeline</div>
              <div className="text-lg font-semibold text-foreground">$4.2M</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Open opps</div>
              <div className="text-lg font-semibold text-foreground">6</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Install base</div>
              <div className="text-lg font-semibold text-foreground">127</div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="intelligence">
        <TabsList className="bg-secondary">
          <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="installbase">Install base</TabsTrigger>
          <TabsTrigger value="competitive">Competitive</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="intelligence" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-border/60 shadow-[var(--shadow-card)]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">AI executive brief</CardTitle>
                  </div>
                  <CardDescription>Generated 12 min ago · 4 sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-foreground leading-relaxed">
                  <p>
                    <strong>{name}</strong> has accelerated investment in image-guided
                    therapy following the appointment of <strong>Dr. Elena Park as CIO</strong>.
                    Capital deployment for FY27 emphasizes modernization of cath labs and
                    monitoring infrastructure across the Midwest region.
                  </p>
                  <p>
                    Active strategic initiatives align with <strong>Philips IGT and HPM
                    portfolio</strong>. Two opportunities are progressing in stage, one is
                    showing risk indicators (no activity in 38 days).
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Annual report", "Press release", "Salesforce", "Outlook thread"].map((s, i) => (
                      <Badge key={s} variant="secondary" className="gap-1 text-[10px]">
                        {i < 2 ? <Globe className="h-3 w-3" /> : <Database className="h-3 w-3" />}
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60 shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="text-base">Strategic initiatives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { t: "Cath lab modernization — 6 sites by 2027", tag: "IGT fit", tone: "text-success" },
                    { t: "Sepsis early-warning program rollout", tag: "HPM fit", tone: "text-success" },
                    { t: "Imaging AI vendor consolidation RFP Q3", tag: "Competitive", tone: "text-warning" },
                  ].map((i) => (
                    <div key={i.t} className="flex items-start justify-between gap-4 p-3 rounded-lg border bg-card">
                      <span className="text-sm text-foreground">{i.t}</span>
                      <span className={`text-xs font-medium ${i.tone}`}>{i.tag}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border/60 shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    Active signals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {[
                    "New CIO — Dr. Elena Park (2h ago)",
                    "Q3 board approved $120M capex (1d)",
                    "Competitor pilot ended without renewal",
                    "Opp 'IGT-2026' stalled 38 days",
                  ].map((s) => (
                    <div key={s} className="flex gap-2">
                      <div className="h-1.5 w-1.5 mt-2 rounded-full bg-primary" />
                      <span className="text-foreground">{s}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/60 shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="text-base">Next-best actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {[
                    "Schedule intro with Dr. Park",
                    "Send IGT cath lab case study",
                    "Cross-sell: HPM monitoring bundle",
                  ].map((s) => (
                    <Button key={s} variant="outline" className="w-full justify-between h-auto py-2 text-left">
                      <span className="text-sm">{s}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hierarchy" className="mt-6">
          <Card className="border-border/60 shadow-[var(--shadow-card)]">
            <CardContent className="p-6">
              <div className="space-y-2 text-sm">
                <HierarchyRow level={0} name={name} kind="Parent IDN" />
                <HierarchyRow level={1} name="Mercy Regional - Midwest" kind="Region" />
                <HierarchyRow level={2} name="Mercy Hospital Cincinnati" kind="Facility · 410 beds" />
                <HierarchyRow level={2} name="Mercy Hospital Anderson" kind="Facility · 280 beds" />
                <HierarchyRow level={1} name="Mercy Regional - Northeast" kind="Region" />
                <HierarchyRow level={2} name="Mercy Hospital Buffalo" kind="Facility · 320 beds" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="mt-6">
          <Card className="border-border/60 shadow-[var(--shadow-card)]">
            <CardContent className="divide-y">
              {[
                { n: "Dr. Elena Park", r: "CIO", t: "Decision maker", new: true },
                { n: "Marcus Chen", r: "VP Imaging", t: "Champion" },
                { n: "Linda Okafor", r: "Director Biomed", t: "Influencer" },
                { n: "Dr. Raj Patel", r: "Cardiology Chair", t: "Clinical sponsor" },
              ].map((c) => (
                <div key={c.n} className="flex items-center gap-4 py-4">
                  <div className="h-10 w-10 rounded-full bg-secondary text-primary-deep flex items-center justify-center font-semibold">
                    {c.n.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{c.n}</span>
                      {c.new && <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20" variant="outline">New</Badge>}
                    </div>
                    <div className="text-xs text-muted-foreground">{c.r}</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">{c.t}</Badge>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    LinkedIn <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="mt-6 space-y-6">
          {/* Stagnation & forecast risk alerts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Stagnant > 30 days", value: "2", tone: "text-destructive", icon: AlertTriangle, sub: "IGT-2026, Ultrasound Cart" },
              { label: "Forecast at risk this Q", value: "$1.8M", tone: "text-warning-foreground", icon: TrendingUp, sub: "1 opp slipping to next Q" },
              { label: "Healthy / on track", value: "$2.0M", tone: "text-success", icon: Sparkles, sub: "2 opps trending green" },
            ].map((k) => (
              <Card key={k.label} className="border-border/60 shadow-[var(--shadow-card)]">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className={`h-9 w-9 rounded-md bg-secondary flex items-center justify-center ${k.tone}`}>
                    <k.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</div>
                    <div className={`text-xl font-semibold ${k.tone}`}>{k.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{k.sub}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-warning/30 bg-warning/5 shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-warning-foreground">
                <AlertTriangle className="h-4 w-4" /> Stagnation & forecast-risk alerts
              </CardTitle>
              <CardDescription>AI-detected from activity logs, email cadence, and pipeline movement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  opp: "IGT-2026 Cath Lab Refresh",
                  alert: "Stagnant — no logged activity in 38 days",
                  rec: "Re-engage Dr. Park with clinical-outcomes addendum within 5 days.",
                  severity: "High",
                  tone: "border-destructive/30 bg-destructive/5",
                  badge: "bg-destructive/10 text-destructive border-destructive/20",
                },
                {
                  opp: "Ultrasound Pediatric Cart",
                  alert: "Close date slipped twice (Sep → Nov)",
                  rec: "Validate champion availability; confirm budget approval status.",
                  severity: "Medium",
                  tone: "border-warning/30 bg-warning/5",
                  badge: "bg-warning/15 text-warning-foreground border-warning/30",
                },
                {
                  opp: "EI Clinical Informatics",
                  alert: "Forecast confidence dropped 22% week-over-week",
                  rec: "Schedule discovery on integration scope before next forecast call.",
                  severity: "Medium",
                  tone: "border-warning/30 bg-warning/5",
                  badge: "bg-warning/15 text-warning-foreground border-warning/30",
                },
              ].map((a) => (
                <div key={a.opp} className={`flex items-start gap-3 p-4 rounded-lg border ${a.tone}`}>
                  <div className="h-8 w-8 rounded-md bg-card flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-4 w-4 text-warning-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-semibold text-foreground">{a.opp}</span>
                      <Badge variant="outline" className={`text-[10px] ${a.badge}`}>{a.severity}</Badge>
                    </div>
                    <div className="text-sm text-foreground">{a.alert}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-primary" /> {a.rec}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">Act</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-[var(--shadow-card)]">
            <CardContent className="p-0">
              <div className="grid grid-cols-12 px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide bg-secondary border-b">
                <div className="col-span-4">Opportunity</div>
                <div className="col-span-2">Stage</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-2">Close</div>
                <div className="col-span-1">Idle</div>
                <div className="col-span-1 text-right">Risk</div>
              </div>
              {[
                { n: "IGT-2026 Cath Lab Refresh", s: "Proposal", a: "$1.8M", c: "Sep 2026", idle: "38 d", r: "High", tone: "text-destructive" },
                { n: "HPM Monitoring Bundle", s: "Negotiation", a: "$1.2M", c: "Aug 2026", idle: "3 d", r: "Low", tone: "text-success" },
                { n: "Ultrasound Pediatric Cart", s: "Discovery", a: "$420K", c: "Nov 2026", idle: "21 d", r: "Med", tone: "text-warning-foreground" },
                { n: "EI Clinical Informatics", s: "Qualification", a: "$780K", c: "Q1 2027", idle: "9 d", r: "Med", tone: "text-warning-foreground" },
              ].map((o) => (
                <div key={o.n} className="grid grid-cols-12 items-center px-5 py-4 border-b last:border-0 text-sm">
                  <div className="col-span-4 font-medium text-foreground">{o.n}</div>
                  <div className="col-span-2"><Badge variant="secondary">{o.s}</Badge></div>
                  <div className="col-span-2 font-medium">{o.a}</div>
                  <div className="col-span-2 text-muted-foreground">{o.c}</div>
                  <div className="col-span-1 text-muted-foreground">{o.idle}</div>
                  <div className={`col-span-1 text-right font-semibold ${o.tone}`}>{o.r}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="installbase" className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/60 shadow-[var(--shadow-card)]">
              <CardContent className="p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Total units</div>
                <div className="text-2xl font-semibold text-foreground">100</div>
              </CardContent>
            </Card>
            <Card className="border-destructive/30 bg-destructive/5 shadow-[var(--shadow-card)]">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-destructive/10 text-destructive flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Active tickets</div>
                  <div className="text-2xl font-semibold text-destructive">20</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/60 shadow-[var(--shadow-card)]">
              <CardContent className="p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Reaching EOL ≤ 12mo</div>
                <div className="text-2xl font-semibold text-warning-foreground">17</div>
              </CardContent>
            </Card>
          </div>
          <Card className="border-border/60 shadow-[var(--shadow-card)]">
            <CardContent className="p-6 text-sm space-y-4">
              {[
                { p: "IntelliVue Patient Monitors", q: 64, eol: 12, tickets: 11 },
                { p: "Azurion Image-Guided Therapy", q: 8, eol: 1, tickets: 2 },
                { p: "EPIQ Ultrasound Systems", q: 22, eol: 4, tickets: 5 },
                { p: "Ingenia MRI", q: 6, eol: 0, tickets: 2 },
              ].map((p) => (
                <div key={p.p} className="flex items-center justify-between gap-4 p-4 rounded-lg border">
                  <div>
                    <div className="font-medium text-foreground">{p.p}</div>
                    <div className="text-xs text-muted-foreground">{p.q} units installed</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10 gap-1">
                      <AlertTriangle className="h-3 w-3" /> {p.tickets} active tickets
                    </Badge>
                    {p.eol > 0 ? (
                      <Badge variant="outline" className="text-warning border-warning/30 bg-warning/10">
                        {p.eol} reach EOL ≤ 12mo
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Healthy</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitive" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "My Competitors",
                items: [
                  { v: "GE Healthcare", note: "20 new hospitals in the Bay Area", area: "Imaging", time: "1 week ago" },
                  { v: "Siemens Healthineers", note: "Planning a research centre at their headquarters, New York", area: "Human Monitoring System", time: "1 month ago" },
                  { v: "Masimo", note: "Active monitoring pilot in 2 Mercy facilities", area: "Patient Monitoring", time: "3 weeks ago" },
                ],
              },
              {
                title: "Similar Business",
                items: [
                  { v: "Canon Medical", note: "Announced new cath lab partnership with Trinity Health", area: "IGT", time: "2 weeks ago" },
                  { v: "Hillrom (Baxter)", note: "Released next-gen vital signs monitor for IDN segment", area: "Patient Monitoring", time: "1 month ago" },
                  { v: "Mindray", note: "Expanded North American distribution network", area: "Ultrasound", time: "6 weeks ago" },
                ],
              },
            ].map((col) => (
              <Card key={col.title} className="border-border/60 shadow-[var(--shadow-card)]">
                <CardHeader>
                  <CardTitle className="text-base">{col.title}</CardTitle>
                  <CardDescription>Recent updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {col.items.map((c) => (
                    <div key={c.v} className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="font-semibold text-foreground text-sm">{c.v}</div>
                        <span className="text-xs text-muted-foreground">{c.time}</span>
                      </div>
                      <div className="text-sm text-foreground">{c.note}</div>
                      <Badge variant="secondary" className="mt-2 text-[10px]">{c.area}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card className="border-border/60 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-base">Documents</CardTitle>
              <CardDescription>Auto-saved from briefs, decks, proposals, and synced sources</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-12 px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide bg-secondary border-b">
                <div className="col-span-5">Name</div>
                <div className="col-span-3">Source</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2 text-right">Updated</div>
              </div>
              {[
                { n: "Mercy Health — QBR Executive Brief.pdf", src: "Outlook", size: "1.4 MB", upd: "12 min ago", color: "bg-primary/10 text-primary" },
                { n: "Azurion Cath Lab — Pitch Deck.pptx", src: "Salesforce", size: "8.2 MB", upd: "1h ago", color: "bg-success/10 text-success" },
                { n: "Dr. Park — Intro thread.eml", src: "Outlook", size: "48 KB", upd: "3h ago", color: "bg-primary/10 text-primary" },
                { n: "Mercy IGT-2026 Opportunity Notes.docx", src: "Salesforce", size: "212 KB", upd: "Yesterday", color: "bg-primary/10 text-primary" },
                { n: "HPM Bundle Proposal v2.docx", src: "Outlook", size: "640 KB", upd: "2d ago", color: "bg-primary/10 text-primary" },
                { n: "Mercy Competitive Battle Card.pdf", src: "Salesforce", size: "980 KB", upd: "3d ago", color: "bg-destructive/10 text-destructive" },
                { n: "Service contract renewal — IntelliVue.pdf", src: "Salesforce", size: "1.1 MB", upd: "5d ago", color: "bg-destructive/10 text-destructive" },
              ].map((d) => (
                <div key={d.n} className="grid grid-cols-12 items-center px-5 py-3 border-b last:border-0 text-sm hover:bg-secondary/50">
                  <div className="col-span-5 flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-md flex items-center justify-center ${d.color}`}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-foreground">{d.n}</span>
                  </div>
                  <div className="col-span-3">
                    <Badge variant="secondary" className="text-[10px]">{d.src}</Badge>
                  </div>
                  <div className="col-span-2 text-muted-foreground">{d.size}</div>
                  <div className="col-span-2 text-right text-muted-foreground">{d.upd}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function HierarchyRow({ level, name, kind }: { level: number; name: string; kind: string }) {
  return (
    <div
      className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-secondary"
      style={{ marginLeft: level * 24 }}
    >
      <Building2 className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium text-foreground">{name}</span>
      <span className="text-xs text-muted-foreground">· {kind}</span>
    </div>
  );
}
