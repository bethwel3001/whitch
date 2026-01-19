'use client';

import React from 'react';
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Home,
  Settings,
  Wand2,
  Sun,
  Moon,
  Laptop,
  Bell,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isThemeOpen, setIsThemeOpen] = React.useState(false);

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
        <SidebarContent className="flex flex-col justify-between">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <Home />
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <SidebarMenu>
            <Collapsible open={isThemeOpen} onOpenChange={setIsThemeOpen}>
              <SidebarMenuItem>
                <CollapsibleTrigger className="w-full">
                  <SidebarMenuButton>
                    <Sun />
                    <span>Theme</span>
                    <ChevronRight
                      className={cn(
                        'ml-auto h-4 w-4 transition-transform',
                        isThemeOpen && 'rotate-90'
                      )}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <Sun className="mr-2" />
                      <span>Light</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <Moon className="mr-2" />
                      <span>Dark</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <Laptop className="mr-2" />
                      <span>System</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <Bell />
                Notifications
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                <span>More Settings</span>
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
