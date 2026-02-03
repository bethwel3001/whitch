'use client';

import React from 'react';
import Link from 'next/link';
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
  useSidebar,
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
  Sun,
  Moon,
  Laptop,
  Bell,
  ChevronRight,
  LogIn,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { IoHardwareChip } from 'react-icons/io5';
import { RecommendationsProvider } from '@/context/recommendations-context';

function PageHeader() {
  const { state, isMobile } = useSidebar();

  // On desktop, hide header if sidebar is expanded.
  // On mobile, the sidebar is an overlay, so the header should always be visible.
  const isHeaderHidden = !isMobile && state === 'expanded';

  return (
    <div
      className={cn(
        'flex h-auto items-center gap-4',
        isHeaderHidden ? 'hidden' : ''
      )}
    >
      <SidebarTrigger />
      <Link
        href="/"
        className="flex items-center gap-2 text-foreground no-underline"
      >
        <IoHardwareChip className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-headline font-semibold">w!tch</h1>
      </Link>
    </div>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isThemeOpen, setIsThemeOpen] = React.useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = React.useState(false);

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    localStorage.setItem('witch-theme', theme);
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  };

  React.useEffect(() => {
    const storedTheme = (localStorage.getItem('witch-theme') as
      | 'light'
      | 'dark'
      | 'system') || 'dark';
    handleThemeChange(storedTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const stored = localStorage.getItem('witch-theme');
      if (stored === 'system') {
        handleThemeChange('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <SidebarProvider>
      <RecommendationsProvider>
        <Sidebar>
          <SidebarHeader>
            <Link
              href="/"
              className="flex items-center gap-2 p-2 text-foreground no-underline"
            >
              <IoHardwareChip className="h-8 w-8 text-primary" />
              <div className="duration-200 group-data-[collapsible=icon]:-ml-8 group-data-[collapsible=icon]:opacity-0">
                <h1 className="text-2xl font-headline font-semibold">w!tch</h1>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="flex flex-col justify-between overflow-x-hidden">
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
                  <CollapsibleTrigger asChild>
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
                      <SidebarMenuSubButton
                        onClick={() => handleThemeChange('light')}
                        className="cursor-pointer"
                      >
                        <Sun className="mr-2" />
                        <span>Light</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        onClick={() => handleThemeChange('dark')}
                        className="cursor-pointer"
                      >
                        <Moon className="mr-2" />
                        <span>Dark</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        onClick={() => handleThemeChange('system')}
                        className="cursor-pointer"
                      >
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
            <Button
              variant="outline"
              className="h-auto w-full justify-start p-2 text-left"
              onClick={() => setIsAuthDialogOpen(true)}
            >
              <div className="flex w-full items-center gap-3">
                <Avatar>
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-semibold">Guest</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Log in to save history
                  </span>
                </div>
                <LogIn className="ml-auto h-4 w-4" />
              </div>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="space-y-12 px-4 pb-12 pt-8 md:px-6 md:pb-16 md:pt-10">
            <PageHeader />
            {children}
          </div>
        </SidebarInset>

        <AlertDialog
          open={isAuthDialogOpen}
          onOpenChange={setIsAuthDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Authentication</AlertDialogTitle>
              <AlertDialogDescription>
                User authentication is coming soon! This feature will allow you
                to save your viewing history and get even more personalized
                recommendations.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsAuthDialogOpen(false)}>
                Got it!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </RecommendationsProvider>
    </SidebarProvider>
  );
}
