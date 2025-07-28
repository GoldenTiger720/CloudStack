import { NavLink, useLocation } from "react-router-dom";
import {
  Cloud,
  Server,
  Network,
  HardDrive,
  Users,
  Activity,
  Settings,
  Home,
  AlertTriangle,
  Shield,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";


export function AppSidebar() {
  const { t } = useTranslation();
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const mainItems = [
    { title: t('navigation.dashboard'), url: "/", icon: Home },
    { title: t('navigation.instances'), url: "/instances", icon: Server },
    { title: t('navigation.networks'), url: "/networks", icon: Network },
    { title: t('navigation.storage'), url: "/storage", icon: HardDrive },
  ];

  const managementItems = [
    { title: t('navigation.users'), url: "/users", icon: Users },
    { title: t('navigation.security'), url: "/security", icon: Shield },
    { title: t('navigation.monitoring'), url: "/monitoring", icon: Activity },
    { title: t('navigation.auditLogs'), url: "/logs", icon: AlertTriangle },
  ];

  const systemItems = [
    { title: t('navigation.settings'), url: "/settings", icon: Settings }
  ];

  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary text-primary-foreground font-medium shadow-glow"
      : "hover:bg-secondary/60 transition-all duration-200";

  return (
    <Sidebar
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } border-r bg-gradient-secondary backdrop-blur-sm`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Logo/Header */}
        <div className="mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-lg text-foreground">
                  {t('navigation.cloudstack')}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {t('navigation.openstackManager')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation.infrastructure')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation.management')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('navigation.system')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
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
