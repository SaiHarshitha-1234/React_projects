
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IndianRupee, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/hooks/use-app-store';
import { useEffect } from 'react';

export default function LogoutPage() {
  const logout = useAppStore((state) => state.logout);
  const router = useRouter();

  // Log the user out when they land on this page
  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <Card className="w-full max-w-md animate-fade-in-up rounded-2xl border-2 border-primary/20 bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur-md">
        <CardHeader className="items-center text-center p-8">
          <div className="mb-4 flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-accent/20">
            <IndianRupee className="h-12 w-12 text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-primary font-headline">Thank You!</h1>
          <p className="text-muted-foreground">You have been successfully logged out.</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-8 pt-0">
            <p className="text-center text-sm text-muted-foreground">
                We hope to see you again soon at BudgetZen.
            </p>
          <Link href="/" className="w-full">
            <Button className="w-full" size="lg">
                <LogOut className="mr-2 h-4 w-4"/>
                Go to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
