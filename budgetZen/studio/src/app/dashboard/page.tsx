
'use client'

import {
  Users,
  CreditCard,
  ArrowUpRight,
  PlusCircle,
  IndianRupee,
  HandCoins,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { ExpenseChart } from '@/components/dashboard/expense-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { AddTransactionDialog } from '@/components/dashboard/add-transaction-dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/hooks/use-app-store';
import { Progress } from '@/components/ui/progress';
import type { Group } from '@/hooks/use-app-store';

export default function DashboardPage() {
  const { groups, transactions, debts, user } = useAppStore();
  const totalExpenses = transactions.reduce((acc, tx) => acc + Math.abs(tx.amount), 0);
  const totalBudget = 350000; // Placeholder value
  
  const currentUserEmail = user?.email || 'user@example.com';

  const totalOwedByYou = debts
    .filter(d => d.from.id === currentUserEmail)
    .reduce((acc, debt) => acc + debt.amount, 0);
  const totalOwedToYou = debts
    .filter(d => d.to.id === currentUserEmail)
    .reduce((acc, debt) => acc + debt.amount, 0);

  const debtsOwedToYouCount = new Set(debts.filter(d => d.to.id === currentUserEmail).map(d => d.from.id)).size;
  const debtsOwedByYouCount = new Set(debts.filter(d => d.from.id === currentUserEmail).map(d => d.to.id)).size;


  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline tracking-tight">Dashboard</h1>
        <AddTransactionDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </AddTransactionDialog>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCard
          title="Total Budget"
          value={`₹${totalBudget.toLocaleString()}`}
          icon={IndianRupee}
          description="+20.1% from last month"
        />
        <StatCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString()}`}
          icon={CreditCard}
          description="+18.1% from last month"
        />
        <StatCard
          title="You're Owed"
          value={`₹${totalOwedToYou.toLocaleString()}`}
          icon={ArrowUpRight}
          description={`From ${debtsOwedToYouCount} people`}
        />
        <StatCard
          title="You Owe"
          value={`₹${totalOwedByYou.toLocaleString()}`}
          icon={ArrowUpRight}
          description={`To ${debtsOwedByYouCount} people`}
        />
      </div>

       <div className="flex flex-col gap-6">
          <ExpenseChart />
          <QuickActions />
          <RecentTransactions transactions={transactions.slice(0, 5)} />
          <GroupsOverview groups={groups.slice(0, 4)} />
       </div>

    </div>
  );
}

function QuickActions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/dashboard/settle">
                    <Button variant="outline" className="w-full">
                        <HandCoins className="mr-2 h-4 w-4" /> Settle Debt
                    </Button>
                </Link>
                <Link href="/dashboard/groups">
                     <Button variant="outline" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Group
                    </Button>
                </Link>
                <Link href="/dashboard/groups">
                     <Button variant="outline" className="w-full">
                        <UserPlus className="mr-2 h-4 w-4" /> Join Group
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}


function GroupsOverview({ groups }: { groups: Group[] }) {
    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Active Groups</CardTitle>
                    <CardDescription>An overview of your groups' spending and progress.</CardDescription>
                </div>
                <Link href="/dashboard/groups">
                    <Button variant="outline" size="sm">View All Groups</Button>
                </Link>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
                {groups.map(group => (
                    <GroupItem key={group.name} group={group} />
                ))}
            </CardContent>
        </Card>
    )
}

function GroupItem({ group }: { group: Group }) {
    const { name, members, image, expenses } = group;
    // Dummy data for budget and progress
    const budget = expenses * 1.5 + 50000;
    const expenseAmount = expenses;
    const progress = Math.min((expenseAmount / budget) * 100, 100);

    return (
        <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Image
                src={image}
                alt={name}
                width={48}
                height={48}
                className="rounded-lg"
                data-ai-hint={group['data-ai-hint']}
            />
            <div className="grid gap-1 flex-1">
                <div className='flex justify-between items-start'>
                    <div>
                        <p className="text-sm font-semibold leading-none">{name}</p>
                        <p className="text-xs text-muted-foreground">{members.length} members</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold">₹{expenseAmount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Budget: ₹{budget.toLocaleString()}</p>
                    </div>
                </div>
                <Progress value={progress} className="h-2 mt-1" />
            </div>
        </div>
    )
}
