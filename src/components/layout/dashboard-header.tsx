"use client";

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Menu, Bell, UserCircle, Search, Mic, Zap, Settings, LogOutIcon, CreditCard } from 'lucide-react';
import { DashboardSidebar } from './dashboard-sidebar';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
       <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden text-foreground">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs p-0 bg-sidebar border-r-sidebar-border">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
      
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products, occasions, or trends..."
          className="w-full rounded-lg bg-input pl-10 pr-10 py-2 h-10 text-sm focus:ring-primary"
        />
        <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground">
            <Mic className="h-4 w-4" />
            <span className="sr-only">Search by voice</span>
        </Button>
      </div>

      <div className="ml-auto flex items-center space-x-3">
        <ModeToggle />
        <div className="relative">
            <Button variant="ghost" size="icon" aria-label="Notifications" className="text-foreground hover:bg-accent/10">
                <Bell className="h-5 w-5" />
            </Button>
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 min-w-4 p-0 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">3</Badge>
        </div>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-2 py-1 h-auto rounded-md hover:bg-accent/10">
                    <div className="flex items-center space-x-1 text-xs font-medium text-foreground">
                        <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400"/>
                        <span>Lv.3</span>
                        <span className="text-muted-foreground">|</span>
                        <span>1250 pts</span>
                    </div>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/40x40.png/D069E2/FFFFFF?text=AD" alt="Alex Dropshipper" data-ai-hint="user avatar"/>
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Alex Dropshipper</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            alex.dropshipper@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/account"> {/* Updated from /settings */}
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <Link href="/dashboard/account?tab=billing"> {/* Assuming billing is a tab in account page */}
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/account?tab=settings"> {/* Assuming general settings are also in account page */}
                         <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => alert("Logout functionality to be implemented")} className="text-destructive focus:text-destructive">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
