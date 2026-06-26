import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/meetings/")({
  head: () => ({ meta: [{ title: "Meetings · Sales Intelligence" }] }),
  component: Meetings,
});

type Meeting = {
  id: string;
  account: string;
  title: string;
  when: string;
  time: string;
  location: string;
  attendees: number;
  status: "upcoming" | "today" | "completed";
  prepReady: boolean;
};

const meetings: Meeting[] = [
  { id: "mercy-qbr", account: "Mercy Health", title: "Quarterly Business Review", when: "Today", time: "2:00 – 3:00 PM ET", location: "Microsoft Teams", attendees: 4, status: "today", prepReady: true },
  { id: "hca-igt", account: "HCA Houston", title: "IGT new-tower discovery", when: "Tomorrow", time: "10:00 AM CT", location: "Onsite — Houston", attendees: 5, status: "upcoming", prepReady: true },
  { id: "northwell-recover", account: "Northwell Health", title: "Ultrasound deal recovery", when: "Thu, Jun 26", time: "11:30 AM ET", location: "Microsoft Teams", attendees: 3, status: "upcoming", prepReady: false },
  { id: "banner-exec", account: "Banner Health", title: "Executive intro · new CIO", when: "Fri, Jun 27", time: "9:00 AM MT", location: "Phoenix HQ", attendees: 6, status: "upcoming", prepReady: true },
  { id: "ascension-qbr-prev", account: "Ascension", title: "QBR — May review", when: "Jun 18", time: "2:00 PM ET", location: "Microsoft Teams", attendees: 7, status: "completed", prepReady: true },
  { id: "intermountain-eol", account: "Intermountain", title: "HPM EOL refresh briefing", when: "Jun 16", time: "1:00 PM MT", location: "Salt Lake City", attendees: 4, status: "completed", prepReady: true },
];

function statusBadge(s: Meeting["status"]) {
  if (s === "today") return <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">Today</Badge>;
  if (s === "upcoming") return <Badge variant="secondary">Upcoming</Badge>;
  return <Badge variant="outline" className="text-success border-success/30 bg-success/10 gap-1"><CheckCircle2 className="h-3 w-3" />Completed</Badge>;
}

function Meetings() {
  const upcoming = meetings.filter((m) => m.status !== "completed");
  const completed = meetings.filter((m) => m.status === "completed");

  return (
    <AppShell
      title="Meetings"
      subtitle="Schedule, prep notes, and post-meeting summaries"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Upcoming
          </h2>
          <div className="space-y-3">
            {upcoming.map((m) => (
              <MeetingRow key={m.id} m={m} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Completed
          </h2>
          <div className="space-y-3">
            {completed.map((m) => (
              <MeetingRow key={m.id} m={m} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function MeetingRow({ m }: { m: Meeting }) {
  return (
    <Card className="border-border/60 shadow-[var(--shadow-card)] hover:border-primary/30 transition-colors">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Calendar className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {statusBadge(m.status)}
            <span className="text-xs font-semibold text-primary-deep">{m.account}</span>
          </div>
          <div className="text-sm font-semibold text-foreground">{m.title}</div>
          <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{m.when}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{m.time}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{m.location}</span>
            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{m.attendees} attendees</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          {m.status === "completed" ? (
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link to="/meetings/$id" params={{ id: m.id }} search={{ view: "summary" } as never}>
                View summary <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm" className="gap-1.5">
              <Link to="/meetings/$id" params={{ id: m.id }}>
                <Sparkles className="h-3.5 w-3.5" />
                {m.prepReady ? "Open meeting prep" : "Generate prep"}
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
