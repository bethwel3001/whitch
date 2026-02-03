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
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
  SidebarInset,
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
  PanelLeft,
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
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';

function Header() {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    const tooltipShown = localStorage.getItem('witch-tooltip-shown');
    if (!tooltipShown) {
      const timer = setTimeout(() => setShowTooltip(true), 1000); // Show after 1s
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
        localStorage.setItem('witch-tooltip-shown', 'true');
      }, 6000); // Hide for 5s, then mark as shown
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  const showHeaderLogo = isMobile || state === 'collapsed';

  return (
    <header className="flex h-14 items-center border-b bg-background px-4">
      <div className="relative flex items-center gap-2 md:gap-4">
        {/* Mobile-only hamburger trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="transition-transform duration-200 hover:scale-110 active:scale-95 md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <PanelLeft className="h-7 w-7" />
        </Button>

        {/* Desktop sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden h-10 w-10 transition-transform duration-200 hover:scale-110 active:scale-95 md:flex"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          {state === 'expanded' ? (
            <GoSidebarExpand className="h-7 w-7" />
          ) : (
            <GoSidebarCollapse className="h-7 w-7" />
          )}
        </Button>

        {/* Tooltip for first-time users */}
        {showTooltip && !isMobile && (
          <div className="absolute left-12 top-full z-10 mt-2 w-max animate-in fade-in-50 slide-in-from-top-2">
            <div className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background shadow-lg">
              <p>Toggle features!</p>
            </div>
          </div>
        )}

        {/* Logo that appears in the header on mobile or when sidebar is collapsed */}
        <Link
          href="/"
          className={cn(
            'flex items-center gap-2 text-foreground no-underline',
            !showHeaderLogo && 'hidden'
          )}
        >
          <IoHardwareChip className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline font-semibold">w!tch</h1>
        </Link>
      </div>
    </header>
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
            <div className="flex w-full items-center p-2">
              <Link
                href="/"
                className="flex items-center gap-2 text-foreground no-underline"
              >
                <IoHardwareChip className="h-8 w-8 text-primary" />
                <div className="duration-200 group-data-[collapsible=icon]:-ml-8 group-data-[collapsible=icon]:opacity-0">
                  <h1 className="text-2xl font-headline font-semibold">
                    w!tch
                  </h1>
                </div>
              </Link>
            </div>
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
        <SidebarInset className="flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <div className="space-y-12 px-4 pb-12 pt-8 md:px-6 md:pb-16 md:pt-10">
              {children}
            </div>
          </main>
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
