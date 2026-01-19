'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  Home,
  Settings,
  Wand2,
  Sun,
  Moon,
  Laptop,
  Bell,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Wand2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-headline font-semibold">w!tch</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <Home />
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>G</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate font-semibold text-sm">Guest</span>
              <span className="truncate text-xs text-muted-foreground">
                Log in to save history
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Settings />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Sun className="mr-2" />
                    <span>Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Sun className="mr-2" />
                        <span>Light</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Moon className="mr-2" />
                        <span>Dark</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Laptop className="mr-2" />
                        <span>System</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Bell className="mr-2" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2" />
                  <span>More Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 p-4 backdrop-blur-sm md:justify-end">
          <SidebarTrigger className="md:hidden" />
          {/* Header content like search or notifications can go here */}
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
