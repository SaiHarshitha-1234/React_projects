
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/hooks/use-app-store';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { isAuthenticated, addNotification, register } = useAppStore();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    const handleRegister = () => {
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if(!trimmedName || !trimmedEmail || !trimmedPassword) {
            toast({
                title: 'Sign-up Failed',
                description: 'Please fill in all fields.',
                variant: 'destructive',
            })
            return;
        }

        if (/\s/.test(trimmedPassword)) {
             toast({
                title: 'Sign-up Failed',
                description: 'Password cannot contain spaces.',
                variant: 'destructive',
            })
            return;
        }
        
        const result = register(trimmedName, trimmedEmail, trimmedPassword);

        if (result.success) {
            addNotification({
                id: Date.now().toString(),
                message: `Welcome! Your account is ready. Please log in.`,
                read: false,
            });
            toast({
                title: 'Sign-up Successful!',
                description: 'Please log in to continue.',
            });
            router.push('/login');
        } else {
             toast({
                title: 'Sign-up Failed',
                description: result.message,
                variant: 'destructive',
            });
        }
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <Link href="/" className="flex items-center justify-center gap-2 font-bold text-2xl text-primary mb-2">
                <IndianRupee className="h-8 w-8 text-accent" />
                BudgetZen
            </Link>
          <CardTitle className="text-3xl font-bold font-headline">Create an Account</CardTitle>
          <CardDescription>Join BudgetZen to start managing your finances.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} />
                <Button variant="ghost" size="icon" type="button" className="absolute top-0 right-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleRegister}>Sign Up</Button>
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
