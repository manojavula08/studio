"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Compass, // Changed from Megaphone
  Bookmark, // Changed from Package
  Users, // Changed from Package (placeholder for Suppliers)
  SettingsIcon,
  Zap, // For Dropspot logo
  LogOut,
  HelpCircle, // Placeholder for Beginner Mode description
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/discover', label: 'Discover', icon: Compass },
  { href: '/dashboard/watchlist', label: 'Watchlist', icon: Bookmark },
  { href: '/dashboard/suppliers', label: 'Suppliers', icon: Users },
  { href: '/dashboard/account', label: 'Account', icon: SettingsIcon }, // Assuming 'Account' leads to settings
];


export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground" style={{ width: '260px' }}>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Zap className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-headline text-sidebar-foreground">Dropspot</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-grow p-2 space-y-2">
        <SidebarMenu>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "w-full justify-start text-sm",
                    isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-sidebar-primary/10 text-sidebar-foreground/80 hover:text-sidebar-foreground"
                  )}
                  size="default"
                >
                  <Link href={item.href} className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                    {item.label === "Dashboard" && isActive && <span className="ml-auto h-2 w-2 rounded-full bg-primary-foreground"></span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
        
        <SidebarGroup className="mt-auto absolute bottom-[60px] w-[calc(100%-1rem)] px-2">
            <SidebarSeparator className="my-2 bg-sidebar-border/50"/>
            <div className="p-3 rounded-lg bg-secondary/30">
                 <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="beginner-mode-switch" className="text-sm font-medium text-sidebar-foreground">
                        Beginner Mode
                    </Label>
                    <Switch id="beginner-mode-switch" defaultChecked={true} />
                </div>
                <p className="text-xs text-sidebar-foreground/60 flex items-start">
                    <HelpCircle className="h-3 w-3 mr-1 mt-0.5 shrink-0"/>
                    Get extra guidance and simplified views.
                </p>
            </div>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <SidebarMenuButton
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/70 hover:text-destructive"
            size="default"
            onClick={() => alert("Logout functionality to be implemented")}
        >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
