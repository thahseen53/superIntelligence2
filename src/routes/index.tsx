import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  AlertTriangle,
  UserPlus,
  Building2,
  ArrowRight,
  Sparkles,
  Globe,
  Database,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sales Intelligence" },
      { name: "description", content: "Personalized AI sales intelligence for your territory." },
    ],
  }),
  component: Home,
});

const kpis = [
  { label: "Active accounts", value: "42", delta: "+3 this week", icon: Building2, tone: "text-primary" },
  { label: "Pipeline influenced", value: "$18.4M", delta: "+12%", icon: TrendingUp, tone: "text-success" },
  { label: "Open alerts", value: "7", delta: "2 high priority", icon: AlertTriangle, tone: "text-warning" },
  { label: "Hours saved (MTD)", value: "26h", delta: "AI research", icon: Clock, tone: "text-primary" },
];

type Alert = {
  id: string;
  account: string;
  type: "Leadership" | "Funding" | "Risk" | "Opportunity" | "Construction";
  title: string;
  detail: string;
  source: "public" | "private";
  time: string;
  priority: "high" | "medium" | "low";
};

const alerts: Alert[] = [
  {
    id: "1",
    account: "Mercy Health System",
    type: "Leadership",
    title: "New CIO appointed — Dr. Elena Park",
    detail: "Previously at Cleveland Clinic. Known advocate for image-guided therapy investments.",
    source: "public",
    time: "2h ago",
    priority: "high",
  },
  {
    id: "2",
    account: "HCA Houston Healthcare",
    type: "Construction",
    title: "New 220-bed tower breaks ground in Q3 2026",
    detail: "Includes 14 ORs and dedicated cath labs — IGT + HPM opportunity.",
    source: "public",
    time: "5h ago",
    priority: "high",
  },
  {
    id: "3",
    account: "Northwell Health",
    type: "Risk",
    title: "Opportunity 'Ultrasound Refresh' stalled 38 days",
    detail: "No activity logged since proposal sent. Forecast at risk.",
    source: "private",
    time: "1d ago",
    priority: "medium",
  },
  {
    id: "4",
    account: "Banner Health",
    type: "Funding",
    title: "$120M capital plan approved for imaging modernization",
    detail: "Board minutes indicate CT and MRI replacement priorities.",
    source: "public",
    time: "1d ago",
    priority: "medium",
  },
  {
    id: "5",
    account: "Intermountain",
    type: "Opportunity",
    title: "Install base: 12 monitors reach EOL in Q4",
    detail: "Renewal window opens — propose HPM bundle with services.",
    source: "private",
    time: "2d ago",
    priority: "low",
  },
];

const priorityStyles: Record<Alert["priority"], string> = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/15 text-warning-foreground border-warning/30",
  low: "bg-secondary text-secondary-foreground border-border",
};

const typeIcon: Record<Alert["type"], typeof Building2> = {
  Leadership: UserPlus,
  Funding: TrendingUp,
  Risk: AlertTriangle,
  Opportunity: Sparkles,
  Construction: Building2,
};

function Home() {
  return (
    <AppShell
      title="Good morning, Sara"
      subtitle="Here's what changed across your 42 accounts overnight."
      actions={
        <Button asChild className="gap-2">
          <Link to="/ask">
            <Sparkles className="h-4 w-4" /> Ask AI
          </Link>
        </Button>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => (
          <Card key={k.label} className="border-border/60 shadow-[var(--shadow-card)]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {k.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{k.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{k.delta}</p>
                </div>
                <div className={`h-10 w-10 rounded-lg bg-secondary flex items-center justify-center ${k.tone}`}>
                  <k.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Intelligent alerts</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Configure subscriptions
            </Button>
          </div>

          {alerts.map((a) => {
            const Icon = typeIcon[a.type];
            return (
              <Card key={a.id} className="border-border/60 shadow-[var(--shadow-card)] hover:border-primary/30 transition-colors">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge variant="outline" className={`text-[10px] ${priorityStyles[a.priority]}`}>
                          {a.priority.toUpperCase()}
                        </Badge>
                        <span className="text-xs font-medium text-primary-deep">{a.account}</span>
                        <span className="text-xs text-muted-foreground">· {a.type}</span>
                        <span className="ml-auto text-xs text-muted-foreground">{a.time}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{a.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <Badge variant="secondary" className="gap-1 text-[10px]">
                          {a.source === "public" ? <Globe className="h-3 w-3" /> : <Database className="h-3 w-3" />}
                          {a.source === "public" ? "Public source" : "Salesforce"}
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary">
                          View account <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Side: today + suggested */}
        <div className="space-y-6">
          <Card className="border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
            <div className="px-5 py-4" style={{ background: "var(--gradient-hero)" }}>
              <p className="text-xs uppercase tracking-wider text-primary-foreground/80">
                Next meeting
              </p>
              <p className="mt-1 text-lg font-semibold text-primary-foreground">
                Mercy Health · 2:00 PM
              </p>
              <p className="text-sm text-primary-foreground/80">Quarterly Business Review</p>
            </div>
            <CardContent className="p-5 space-y-3">
              <p className="text-sm text-foreground">
                AI brief ready. 4 talking points, 2 competitive flags.
              </p>
              <Button asChild className="w-full">
                <Link to="/meetings/$id" params={{ id: "mercy-qbr" }}>Open meeting prep</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-base">Suggested next actions</CardTitle>
              <CardDescription>From your designated AI agents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Reach out to Dr. Park (Mercy) — congratulate on CIO role",
                "Re-engage Northwell on stalled Ultrasound deal",
                "Prepare HPM bundle proposal for Intermountain EOL",
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-success shrink-0" />
                  <span className="text-foreground">{s}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
