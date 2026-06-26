import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Presentation,
  FileSpreadsheet,
  Download,
  Search,
  Sparkles,
  Upload,
  Share2,
  Mail,
} from "lucide-react";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents · Sales Intelligence" }] }),
  component: Documents,
});

type Doc = {
  id: string;
  name: string;
  type: "pdf" | "pptx" | "docx" | "xlsx";
  account: string;
  source: "AI generated" | "Uploaded" | "Shared";
  size: string;
  updated: string;
};

const recent: Doc[] = [
  { id: "1", name: "Mercy Health — QBR Executive Brief.pdf", type: "pdf", account: "Mercy Health", source: "AI generated", size: "1.4 MB", updated: "12 min ago" },
  { id: "2", name: "Azurion Cath Lab — Pitch Deck.pptx", type: "pptx", account: "Mercy Health", source: "AI generated", size: "8.2 MB", updated: "1h ago" },
  { id: "3", name: "HPM Bundle Proposal v3.docx", type: "docx", account: "Intermountain", source: "Uploaded", size: "640 KB", updated: "Yesterday" },
  { id: "4", name: "Q3 Forecast — Territory Roll-up.xlsx", type: "xlsx", account: "All accounts", source: "AI generated", size: "212 KB", updated: "Yesterday" },
  { id: "5", name: "Northwell — Competitive Battle Card.pdf", type: "pdf", account: "Northwell Health", source: "AI generated", size: "980 KB", updated: "2d ago" },
  { id: "6", name: "HCA Houston — Tower Capex Brief.pdf", type: "pdf", account: "HCA Houston", source: "AI generated", size: "1.1 MB", updated: "3d ago" },
];

const generators = [
  { id: "brief", title: "Executive Brief", desc: "1-page summary of an account or meeting", icon: FileText, accent: "bg-primary/10 text-primary" },
  { id: "deck", title: "Pitch Deck (PPTX)", desc: "Tailored slides for upcoming meetings", icon: Presentation, accent: "bg-success/10 text-success" },
  { id: "proposal", title: "Proposal Doc", desc: "Editable .docx with pricing & scope", icon: FileText, accent: "bg-warning/15 text-warning-foreground" },
  { id: "forecast", title: "Forecast Roll-up", desc: "Live spreadsheet from Salesforce data", icon: FileSpreadsheet, accent: "bg-primary/10 text-primary" },
];

const typeMeta: Record<Doc["type"], { icon: typeof FileText; tone: string }> = {
  pdf: { icon: FileText, tone: "bg-destructive/10 text-destructive" },
  pptx: { icon: Presentation, tone: "bg-success/10 text-success" },
  docx: { icon: FileText, tone: "bg-primary/10 text-primary" },
  xlsx: { icon: FileSpreadsheet, tone: "bg-warning/15 text-warning-foreground" },
};

function Documents() {
  return (
    <AppShell
      title="Documents"
      subtitle="AI-generated and uploaded materials across your territory"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" /> Upload
          </Button>
          <Button className="gap-2">
            <Sparkles className="h-4 w-4" /> Generate
          </Button>
        </div>
      }
    >
      {/* Generators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {generators.map((g) => (
          <Card key={g.id} className="border-border/60 shadow-[var(--shadow-card)] hover:border-primary/40 cursor-pointer transition-colors">
            <CardContent className="p-5">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center mb-3 ${g.accent}`}>
                <g.icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold text-foreground">{g.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{g.desc}</div>
              <Button variant="ghost" size="sm" className="mt-3 -ml-2 text-primary gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Generate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search documents…" className="pl-9 bg-card" />
        </div>
        <div className="ml-auto flex gap-2 text-xs">
          <Badge variant="secondary">All accounts</Badge>
          <Badge variant="secondary">All types</Badge>
        </div>
      </div>

      <Card className="border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base">Recent documents</CardTitle>
          <CardDescription>Auto-saved from briefs, decks, and proposals you generate</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-12 px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide bg-secondary border-y">
            <div className="col-span-5">Name</div>
            <div className="col-span-2">Account</div>
            <div className="col-span-2">Source</div>
            <div className="col-span-1">Size</div>
            <div className="col-span-2 text-right">Updated</div>
          </div>
          {recent.map((d) => {
            const M = typeMeta[d.type];
            return (
              <div key={d.id} className="grid grid-cols-12 items-center px-5 py-3 border-b last:border-0 text-sm hover:bg-secondary/40 group">
                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  <div className={`h-8 w-8 rounded-md flex items-center justify-center shrink-0 ${M.tone}`}>
                    <M.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-foreground truncate">{d.name}</span>
                </div>
                <div className="col-span-2 text-muted-foreground truncate">{d.account}</div>
                <div className="col-span-2">
                  <Badge variant={d.source === "AI generated" ? "outline" : "secondary"} className="text-[10px] gap-1">
                    {d.source === "AI generated" && <Sparkles className="h-2.5 w-2.5 text-primary" />}
                    {d.source}
                  </Badge>
                </div>
                <div className="col-span-1 text-muted-foreground text-xs">{d.size}</div>
                <div className="col-span-2 flex items-center justify-end gap-1 text-muted-foreground text-xs">
                  <span>{d.updated}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                    <Mail className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </AppShell>
  );
}
