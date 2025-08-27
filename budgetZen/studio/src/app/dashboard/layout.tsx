
'use client';

import Link from 'next/link';
import {
  Bell,
  Home,
  Users,
  CreditCard,
  BarChart2,
  LogOut,
  Settings,
  HandCoins,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAppStore } from '@/hooks/use-app-store';
import React, { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PanelLeft, IndianRupee } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, notifications, markAllAsRead, user } = useAppStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  
  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/expenses', label: 'Expenses', icon: CreditCard },
    { href: '/dashboard/groups', label: 'Groups', icon: Users },
    { href: '/dashboard/settle', label: 'Settle Debt', icon: HandCoins },
    { href: '/dashboard/reports', label: 'Reports', icon: BarChart2 },
    { href: '/dashboard/help', label: 'Help', icon: HelpCircle },
  ];

  const handleLogout = () => {
    router.push('/logout');
  }

  const NavLinks = ({className}: {className?: string}) => (
    <nav className={cn("grid items-start px-2 text-sm font-medium lg:px-4", className)}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            pathname === item.href && 'bg-muted text-primary'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
               <IndianRupee className="h-6 w-6 text-accent" />
              <span className='font-headline'>BudgetZen</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <NavLinks />
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                  Check our documentation or contact support.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Link href="/dashboard/help">
                  <Button size="sm" className="w-full">
                    Get Help
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
           <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
               <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                   <IndianRupee className="h-6 w-6 text-accent" />
                  <span className='font-headline'>BudgetZen</span>
                </Link>
              </div>
              <NavLinks className="mt-4" />
               <div className="mt-auto p-4">
                <Card>
                  <CardHeader className="p-2 pt-0 md:p-4">
                    <CardTitle>Need Help?</CardTitle>
                    <CardDescription>
                      Check our documentation or contact support.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                    <Link href="/dashboard/help">
                        <Button size="sm" className="w-full">
                          Get Help
                        </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can be a search bar */}
          </div>
          
          <DropdownMenu onOpenChange={(open) => { if (!open) markAllAsRead() }}>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0">{unreadNotifications}</Badge>}
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                    <DropdownMenuItem>No new notifications</DropdownMenuItem>
                ) : (
                    notifications.map(n => <DropdownMenuItem key={n.id} className={cn(!n.read && "font-bold")}>{n.message}</DropdownMenuItem>)
                )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Image
                  src="https://placehold.co/32x32.png"
                  width={32}
                  height={32}
                  alt="User Avatar"
                  className="rounded-full"
                  data-ai-hint="user avatar"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.name || 'My Account'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard/help">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
