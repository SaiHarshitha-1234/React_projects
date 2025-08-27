
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, BarChart, ShieldCheck, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <IndianRupee className="h-7 w-7 text-accent" />
            BudgetZen
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-4 font-headline">
              Split Expenses, Share Memories
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl mb-8">
              BudgetZen makes it easy to track your spending, manage group budgets, and settle up debts with friends and family. Real-time, collaborative, and hassle-free.
            </p>
            <Link href="/login">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-secondary/40">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12 font-headline">Why BudgetZen?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Collaborative Groups"
                description="Create groups for trips, households, or projects. Track shared expenses and see who owes who in real-time."
              />
              <FeatureCard
                icon={<BarChart className="h-10 w-10 text-primary" />}
                title="Insightful Reports"
                description="Visualize your spending with beautiful charts. Understand where your money goes and make smarter financial decisions."
              />
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-primary" />}
                title="Automatic Categorization"
                description="BudgetZen automatically suggests categories for your expenses, saving you time and effort."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title="Secure & Reliable"
                description="Your financial data is important. We use top-tier security to keep your information safe and private."
              />
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="py-24">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center text-foreground mb-12 font-headline">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <StepCard
                        step="1"
                        title="Create or Join a Group"
                        description="Start by creating a group for any purpose or join an existing one using an invite code."
                    />
                    <StepCard
                        step="2"
                        title="Add Expenses"
                        description="Log your personal or group expenses as they happen. Our app will help you categorize them instantly."
                    />
                    <StepCard
                        step="3"
                        title="Settle Up"
                        description="BudgetZen calculates who owes who. Settle debts with a click and keep your relationships balanced."
                    />
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-secondary/40 py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BudgetZen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center">
        {icon}
        <CardTitle className="mt-4 font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({ step, title, description }: { step: string; title: string; description: string }) {
    return (
        <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl">
                {step}
            </div>
            <h3 className="text-xl font-bold mb-2 font-headline">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}
