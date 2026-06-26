import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  Building2,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  CalendarClock,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/accounts/")({
  head: () => ({ meta: [{ title: "Accounts · Sales Intelligence" }] }),
  component: Accounts,
});

const accounts = [
  { id: "mercy-health", name: "Mercy Health System", region: "Midwest", bu: "DI, IGT", pipeline: "$4.2M", health: 82, alerts: 3 },
  { id: "hca-houston", name: "HCA Houston Healthcare", region: "South", bu: "IGT, HPM", pipeline: "$6.8M", health: 76, alerts: 2 },
  { id: "northwell", name: "Northwell Health", region: "Northeast", bu: "UL, EI", pipeline: "$2.1M", health: 48, alerts: 4 },
  { id: "banner", name: "Banner Health", region: "West", bu: "DI", pipeline: "$3.6M", health: 88, alerts: 1 },
  { id: "intermountain", name: "Intermountain", region: "West", bu: "HPM, SRC", pipeline: "$1.9M", health: 71, alerts: 2 },
  { id: "ascension", name: "Ascension", region: "National", bu: "DI, EI, IGT", pipeline: "$8.1M", health: 84, alerts: 1 },
];

function healthTone(h: number) {
  if (h >= 80) return "text-success";
  if (h >= 60) return "text-warning";
  return "text-destructive";
}

function Accounts() {
  return (
    <AppShell title="Accounts" subtitle="Your territory · 42 active accounts">
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Filter accounts…" className="pl-9 bg-card" />
        </div>
        <div className="ml-auto flex gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">All regions</Badge>
          <Badge variant="secondary">All BUs</Badge>
        </div>
      </div>

      <Card className="border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide bg-secondary border-b">
          <div className="col-span-3">Account</div>
          <div className="col-span-1">Region</div>
          <div className="col-span-2">Business units</div>
          <div className="col-span-2">Pipeline</div>
          <div className="col-span-1">Health</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>
        {accounts.map((a) => (
          <div
            key={a.id}
            className="grid grid-cols-12 items-center px-5 py-4 border-b last:border-0 hover:bg-secondary/40 transition-colors"
          >
            <Link
              to="/accounts/$id"
              params={{ id: a.id }}
              className="col-span-3 flex items-center gap-3 min-w-0"
            >
              <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground truncate">{a.name}</div>
                <div className="text-xs text-muted-foreground">IDN · {a.bu}</div>
              </div>
            </Link>
            <div className="col-span-1 text-sm text-foreground">{a.region}</div>
            <div className="col-span-2 text-sm text-muted-foreground">{a.bu}</div>
            <div className="col-span-2 text-sm font-medium text-foreground flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-success" /> {a.pipeline}
            </div>
            <div className={`col-span-1 text-sm font-semibold flex items-center gap-2 ${healthTone(a.health)}`}>
              {a.health}
              {a.alerts > 0 && (
                <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
                  <AlertTriangle className="h-3 w-3" /> {a.alerts}
                </span>
              )}
            </div>
            <div className="col-span-3 flex justify-end gap-1.5">
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <Sparkles className="h-3 w-3" /> Brief
              </Button>
              <Button asChild variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <Link to="/meetings">
                  <CalendarClock className="h-3 w-3" /> Meeting prep
                </Link>
              </Button>
              <Button asChild size="sm" variant="ghost" className="h-8 gap-1 text-xs text-primary">
                <Link to="/accounts/$id" params={{ id: a.id }}>
                  Open <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </Card>
    </AppShell>
  );
}
