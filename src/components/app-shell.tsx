import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhilipsShield } from "@/components/philips-logo";

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-card/80 px-4 backdrop-blur">
            <SidebarTrigger />
            <div className="hidden md:flex items-center gap-2 text-primary">
              <PhilipsShield className="h-6 w-6" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80">
                Sales Intelligence
              </span>
            </div>
            <div className="relative hidden lg:block w-72 ml-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search accounts, contacts, opportunities…"
                className="pl-9 bg-secondary border-transparent focus-visible:bg-card"
              />
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 px-1 text-[10px] bg-destructive text-destructive-foreground">
                  7
                </Badge>
              </Button>
              {actions}
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8 max-w-[1500px] w-full mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
