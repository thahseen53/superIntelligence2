import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Swords, TrendingUp, AlertTriangle, Sparkles, Globe } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const Route = createFileRoute("/competitive")({
  head: () => ({ meta: [{ title: "Competitive Analysis · Sales Intelligence" }] }),
  component: Competitive,
});

const winRateData = [
  { name: "GE Healthcare", win: 42, loss: 58 },
  { name: "Siemens", win: 38, loss: 62 },
  { name: "Canon", win: 55, loss: 45 },
  { name: "Masimo", win: 61, loss: 39 },
  { name: "Mindray", win: 70, loss: 30 },
];

const signalsTrend = [
  { week: "W1", GE: 4, Siemens: 2, Canon: 1 },
  { week: "W2", GE: 6, Siemens: 3, Canon: 2 },
  { week: "W3", GE: 5, Siemens: 5, Canon: 2 },
  { week: "W4", GE: 8, Siemens: 4, Canon: 3 },
  { week: "W5", GE: 7, Siemens: 6, Canon: 4 },
  { week: "W6", GE: 9, Siemens: 7, Canon: 3 },
];

const shareData = [
  { name: "Philips", value: 42 },
  { name: "GE Healthcare", value: 24 },
  { name: "Siemens", value: 18 },
  { name: "Canon", value: 9 },
  { name: "Others", value: 7 },
];
const shareColors = ["hsl(var(--primary))", "#60a5fa", "#94a3b8", "#cbd5e1", "#e2e8f0"];


const competitors = [
  {
    v: "GE Healthcare",
    area: "Imaging",
    momentum: "up",
    note: "20 new hospitals in the Bay Area",
    time: "1 week ago",
    winRate: "42%",
    deals: 6,
  },
  {
    v: "Siemens Healthineers",
    area: "Human Monitoring System",
    momentum: "up",
    note: "Planning a research centre at their headquarters, New York",
    time: "1 month ago",
    winRate: "38%",
    deals: 4,
  },
  {
    v: "Canon Medical",
    area: "IGT",
    momentum: "flat",
    note: "Announced new cath lab partnership with Trinity Health",
    time: "2 weeks ago",
    winRate: "55%",
    deals: 2,
  },
  {
    v: "Masimo",
    area: "Patient Monitoring",
    momentum: "down",
    note: "Lost pilot at Northwell after 6 months",
    time: "3 weeks ago",
    winRate: "61%",
    deals: 3,
  },
];

const battlecards = [
  { title: "Azurion vs. Siemens Artis Q", area: "IGT", updated: "Updated 2d ago" },
  { title: "IntelliVue MX vs. GE CARESCAPE", area: "Monitoring", updated: "Updated 1w ago" },
  { title: "EPIQ vs. GE Vivid E95", area: "Ultrasound", updated: "Updated 3w ago" },
];

function Competitive() {
  return (
    <AppShell
      title="Competitive Analysis"
      subtitle="Live competitor signals across your territory"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active competitive deals", value: "15", icon: Swords, tone: "text-primary" },
          { label: "Win rate (90d)", value: "48%", icon: TrendingUp, tone: "text-success" },
          { label: "At-risk deals", value: "4", icon: AlertTriangle, tone: "text-destructive" },
          { label: "New signals (7d)", value: "12", icon: Sparkles, tone: "text-primary" },
        ].map((k) => (
          <Card key={k.label} className="border-border/60 shadow-[var(--shadow-card)]">
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`h-9 w-9 rounded-md bg-secondary flex items-center justify-center ${k.tone}`}>
                <k.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</div>
                <div className="text-xl font-semibold text-foreground">{k.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="border-border/60 shadow-[var(--shadow-card)] lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Win / loss rate vs. competitors (90d)</CardTitle>
            <CardDescription>Head-to-head outcomes across closed opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={winRateData} barCategoryGap={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis unit="%" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="win" name="Win %" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="loss" name="Loss %" stackId="a" fill="#cbd5e1" radius={[0, 0, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Territory share of wallet</CardTitle>
            <CardDescription>Estimated, last 4 quarters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={shareData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                    {shareData.map((_, i) => (
                      <Cell key={i} fill={shareColors[i]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60 shadow-[var(--shadow-card)] mb-6">
        <CardHeader>
          <CardTitle className="text-base">Competitor signal volume (6 weeks)</CardTitle>
          <CardDescription>News, hiring moves, and product launches detected by AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={signalsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="GE" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Siemens" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Canon" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <Card className="border-border/60 shadow-[var(--shadow-card)] lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Competitor landscape</CardTitle>
            <CardDescription>Activity across your accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {competitors.map((c) => (
              <div key={c.v} className="p-4 rounded-lg border bg-card">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{c.v}</span>
                  <Badge variant="secondary" className="text-[10px]">{c.area}</Badge>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${
                      c.momentum === "up"
                        ? "text-destructive border-destructive/30 bg-destructive/10"
                        : c.momentum === "down"
                          ? "text-success border-success/30 bg-success/10"
                          : ""
                    }`}
                  >
                    {c.momentum === "up" ? "Gaining momentum" : c.momentum === "down" ? "Losing ground" : "Stable"}
                  </Badge>
                  <span className="ml-auto text-xs text-muted-foreground">{c.time}</span>
                </div>
                <div className="text-sm text-foreground flex items-start gap-2">
                  <Globe className="h-3.5 w-3.5 mt-0.5 text-muted-foreground shrink-0" />
                  <span>{c.note}</span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Win rate vs. them: <span className="font-semibold text-foreground">{c.winRate}</span></span>
                  <span>{c.deals} active deals</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Battle cards</CardTitle>
            <CardDescription>AI-maintained, ready to use</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {battlecards.map((b) => (
              <Button key={b.title} variant="outline" className="w-full justify-start h-auto py-3 text-left">
                <div>
                  <div className="text-sm font-medium text-foreground">{b.title}</div>
                  <div className="text-xs text-muted-foreground">{b.area} · {b.updated}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
