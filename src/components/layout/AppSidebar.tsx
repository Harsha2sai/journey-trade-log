import { Home, Calendar, BarChart3, Trophy, Users, TrendingUp, FileText, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Today", url: "/", icon: Home, view: "today" },
  { title: "Calendar", url: "/", icon: Calendar, view: "calendar" },
  { title: "Analytics", url: "/", icon: BarChart3, view: "analytics" },
];

const featureItems = [
  { title: "Challenges", url: "/challenges", icon: Trophy },
  { title: "Community", url: "/community", icon: Users },
  { title: "Trade Journal", url: "/", icon: FileText, view: "today" },
];

interface AppSidebarProps {
  currentView?: string;
  onViewChange?: (view: "today" | "calendar" | "analytics") => void;
}

export function AppSidebar({ currentView, onViewChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const handleMainItemClick = (view: string) => {
    if (onViewChange && (view === "today" || view === "calendar" || view === "analytics")) {
      onViewChange(view as "today" | "calendar" | "analytics");
    }
  };

  const isActiveMainItem = (view?: string) => {
    return location.pathname === "/" && currentView === view;
  };

  const isActiveFeatureItem = (url: string) => {
    return location.pathname === url;
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            {!collapsed && <span>Main</span>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild={!item.view}
                    onClick={item.view ? () => handleMainItemClick(item.view) : undefined}
                    className={isActiveMainItem(item.view) ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                  >
                    {item.view ? (
                      <div className="flex items-center gap-2 cursor-pointer">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </div>
                    ) : (
                      <NavLink to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {!collapsed && <span>Features</span>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {featureItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild={!item.view}
                    onClick={item.view ? () => handleMainItemClick(item.view) : undefined}
                    className={isActiveFeatureItem(item.url) ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                  >
                    {item.view ? (
                      <div className="flex items-center gap-2 cursor-pointer">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </div>
                    ) : (
                      <NavLink to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
