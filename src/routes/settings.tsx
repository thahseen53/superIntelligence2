import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  CheckCircle2,
  Database,
  Mail,
  Cloud,
  Plug,
  Bell,
  ShieldCheck,
  User,
  Briefcase,
  AlertCircle,
} from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · Sales Intelligence" }] }),
  component: Settings,
});

type Status = "connected" | "action" | "available";

type Integration = {
  id: string;
  name: string;
  desc: string;
  category: "CRM" | "Productivity" | "Data";
  status: Status;
  meta?: string;
  icon: typeof Plug;
  tone: string;
};

const integrations: Integration[] = [
  { id: "salesforce", name: "Salesforce", desc: "Sync accounts, opportunities, contacts, and activities.", category: "CRM", status: "connected", meta: "Synced 4 min ago · 42 accounts", icon: Briefcase, tone: "bg-primary/10 text-primary" },
  { id: "outlook", name: "Microsoft Outlook", desc: "Email, calendar, and meeting transcripts from Teams.", category: "Productivity", status: "connected", meta: "Sara Reyes · sara.reyes@philips.com", icon: Mail, tone: "bg-primary/10 text-primary" },
  { id: "data-lake", name: "Philips Data Lake", desc: "ServiceMax install base, contracts, and field activity.", category: "Data", status: "action", meta: "Re-authentication required", icon: Database, tone: "bg-warning/15 text-warning-foreground" },
  { id: "sharepoint", name: "SharePoint", desc: "Pull and store generated documents in shared sites.", category: "Productivity", status: "available", icon: Cloud, tone: "bg-muted text-muted-foreground" },
  { id: "linkedin", name: "LinkedIn Sales Navigator", desc: "Contact intelligence and leadership change alerts.", category: "Data", status: "available", icon: Plug, tone: "bg-muted text-muted-foreground" },
  { id: "snowflake", name: "Snowflake", desc: "Customer 360 warehouse for advanced analytics.", category: "Data", status: "connected", meta: "Read-only · 3 warehouses", icon: Database, tone: "bg-primary/10 text-primary" },
];

function statusBadge(s: Status) {
  if (s === "connected") return <Badge variant="outline" className="text-success border-success/30 bg-success/10 gap-1"><CheckCircle2 className="h-3 w-3" />Connected</Badge>;
  if (s === "action") return <Badge variant="outline" className="text-warning-foreground border-warning/30 bg-warning/10 gap-1"><AlertCircle className="h-3 w-3" />Action required</Badge>;
  return <Badge variant="secondary">Available</Badge>;
}

function Settings() {
  return (
    <AppShell title="Settings" subtitle="Manage integrations, notifications, and preferences">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
        <nav className="space-y-1 text-sm">
          {[
            { label: "Integrations", icon: Plug, active: true },
            { label: "Profile", icon: User },
            { label: "Notifications", icon: Bell },
            { label: "Security", icon: ShieldCheck },
          ].map((n) => (
            <button
              key={n.label}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left ${
                n.active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </nav>

        <div className="space-y-6">
          <Card className="border-border/60 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-base">Integrations</CardTitle>
              <CardDescription>
                Connect your data sources so IRIS can synthesize across the full picture.
              </CardDescription>
            </CardHeader>
            <CardContent className="divide-y">
              {integrations.map((i) => (
                <div key={i.id} className="flex items-center gap-4 py-4">
                  <div className={`h-11 w-11 rounded-lg flex items-center justify-center shrink-0 ${i.tone}`}>
                    <i.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-foreground">{i.name}</span>
                      <Badge variant="outline" className="text-[10px]">{i.category}</Badge>
                      {statusBadge(i.status)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{i.desc}</div>
                    {i.meta && (
                      <div className="text-[11px] text-muted-foreground mt-1 italic">{i.meta}</div>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {i.status === "connected" && (
                      <>
                        <Button variant="ghost" size="sm">Configure</Button>
                        <Button variant="outline" size="sm">Disconnect</Button>
                      </>
                    )}
                    {i.status === "action" && (
                      <Button size="sm">Reconnect</Button>
                    )}
                    {i.status === "available" && (
                      <Button size="sm">Connect</Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-base">Notification preferences</CardTitle>
              <CardDescription>
                Choose which Intelligent Alerts reach you and how.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { t: "Leadership changes", d: "New CXO appointments at your accounts", on: true },
                { t: "Funding & capex", d: "Board-approved capital plans, RFPs", on: true },
                { t: "Opportunity stagnation", d: "No activity in 30+ days", on: true },
                { t: "Forecast risk", d: "Opportunities slipping out of the quarter", on: true },
                { t: "Competitive signals", d: "Competitor wins, pilots, or losses", on: false },
              ].map((n) => (
                <div key={n.t} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{n.t}</div>
                    <div className="text-xs text-muted-foreground">{n.d}</div>
                  </div>
                  <Switch defaultChecked={n.on} />
                </div>
              ))}
              <Separator />
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">Voice assistant in header</div>
                  <div className="text-xs text-muted-foreground">Always-on conversational helper</div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
