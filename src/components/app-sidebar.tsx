import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Building2,
  MessagesSquare,
  CalendarClock,
  Settings,
  LogOut,
  FileText,
  Swords,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PhilipsShield } from "@/components/philips-logo";

const primary = [
  { title: "Home", url: "/", icon: LayoutDashboard },
  { title: "Accounts", url: "/accounts", icon: Building2 },
  { title: "Meetings", url: "/meetings", icon: CalendarClock },
  // { title: "Documents", url: "/documents", icon: FileText },
  { title: "Competitive Analysis", url: "/competitive", icon: Swords },
  { title: "Ask AI", url: "/ask", icon: MessagesSquare },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) => (url === "/" ? path === "/" : path.startsWith(url));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/60">
        <div className="flex items-center gap-2.5 px-2 py-3">
          <div className="text-primary-foreground">
            <PhilipsShield className="h-9 w-9" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-sidebar-foreground/70">
              Philips
            </span>
            <span className="text-sm font-semibold text-sidebar-foreground">
              Sales Intelligence
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/settings")}>
              <Link to="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-2 px-2 py-2 group-data-[collapsible=icon]:hidden">
          <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-semibold">
            SR
          </div>
          <div className="text-xs leading-tight">
            <div className="font-medium text-sidebar-foreground">Sara Reyes</div>
            <div className="text-sidebar-foreground/60">Enterprise CE · DI</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
