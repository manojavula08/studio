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
} from '@/components/ui/sidebar'; // Assuming this is the path to the advanced sidebar
import {
  LayoutDashboard,
  Megaphone,
  Package,
  SettingsIcon,
  TrendingUp,
  LogOut,
  UserCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/ads', label: 'Ads', icon: Megaphone },
  { href: '/dashboard/products', label: 'Products', icon: Package },
];

const settingsNavItem: NavItem = { href: '/dashboard/settings', label: 'Settings', icon: SettingsIcon };

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r" style={{ width: '240px' }}>
      <SidebarHeader className="p-4 border-b">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <TrendingUp className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-headline">MarketScout</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-grow p-2">
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                className="w-full justify-start"
                size="default"
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t">
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(settingsNavItem.href)}
                className="w-full justify-start"
                size="default"
              >
                <Link href={settingsNavItem.href}>
                  <settingsNavItem.icon className="mr-2 h-5 w-5" />
                  {settingsNavItem.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-destructive"
                size="default"
                onClick={() => alert("Logout clicked")} // Replace with actual logout logic
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-2 p-2 flex items-center space-x-2 border-t pt-4">
            <Avatar className="h-9 w-9">
                <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" data-ai-hint="user avatar" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-medium">User Name</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
