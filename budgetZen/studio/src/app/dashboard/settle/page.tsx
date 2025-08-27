
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppStore } from "@/hooks/use-app-store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { HandCoins } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"


export default function SettleDebtPage() {
    const { debts, settleDebt, addNotification, user } = useAppStore();
    const { toast } = useToast();
    
    const currentUserEmail = user?.email || 'user@example.com';

    const debtsOwedByYou = debts.filter(d => d.from.id === currentUserEmail);
    const debtsOwedToYou = debts.filter(d => d.to.id === currentUserEmail);

    const handleSettle = (debtId: string) => {
        const debt = debts.find(d => d.id === debtId);
        if (!debt) return;

        settleDebt(debtId);
        const message = `You paid ₹${debt.amount.toLocaleString()} to ${debt.to.name}.`;
        addNotification({
            id: Date.now().toString(),
            message,
            read: false,
        });
        toast({
            title: "Debt Settled!",
            description: message,
        });
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Settle Debts</h1>
                <p className="text-muted-foreground">Manage your outstanding balances with group members.</p>
            </div>
            <Tabs defaultValue="you-owe" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="you-owe">You Owe</TabsTrigger>
                    <TabsTrigger value="owes-you">Owes You</TabsTrigger>
                </TabsList>
                <TabsContent value="you-owe">
                    <Card>
                        <CardHeader>
                            <CardTitle>Debts You Owe</CardTitle>
                            <CardDescription>These are the amounts you need to pay to others.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Who You Owe</TableHead>
                                        <TableHead>Group</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-center">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {debtsOwedByYou.length > 0 ? debtsOwedByYou.map(debt => (
                                        <TableRow key={debt.id}>
                                            <TableCell className="font-medium">{debt.to.name}</TableCell>
                                            <TableCell><Badge variant="outline">{debt.groupName}</Badge></TableCell>
                                            <TableCell className="text-right font-medium">₹{debt.amount.toLocaleString()}</TableCell>
                                            <TableCell className="text-center">
                                                <Button size="sm" onClick={() => handleSettle(debt.id)}>
                                                    <HandCoins className="mr-2 h-4 w-4"/> Settle
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center text-muted-foreground">You have no outstanding debts. Great job!</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="owes-you">
                    <Card>
                        <CardHeader>
                            <CardTitle>Debts Owed to You</CardTitle>
                            <CardDescription>These are the amounts others need to pay to you.</CardDescription>
                        </CardHeader>
                         <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Who Owes You</TableHead>
                                        <TableHead>Group</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                     {debtsOwedToYou.length > 0 ? debtsOwedToYou.map(debt => (
                                        <TableRow key={debt.id}>
                                            <TableCell className="font-medium">{debt.from.name}</TableCell>
                                            <TableCell><Badge variant="outline">{debt.groupName}</Badge></TableCell>
                                            <TableCell className="text-right font-medium">₹{debt.amount.toLocaleString()}</TableCell>
                                        </TableRow>
                                    )) : (
                                         <TableRow>
                                            <TableCell colSpan={3} className="text-center text-muted-foreground">No one owes you money right now.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
