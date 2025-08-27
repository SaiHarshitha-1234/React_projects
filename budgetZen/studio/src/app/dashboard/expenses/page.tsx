
'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AddTransactionDialog } from "@/components/dashboard/add-transaction-dialog"
import { PlusCircle, File, ListFilter } from "lucide-react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAppStore } from "@/hooks/use-app-store"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export default function ExpensesPage() {
    const { transactions } = useAppStore();
    const { toast } = useToast()
    const [filter, setFilter] = useState<string>("All");

    const filteredTransactions = transactions.filter(t => filter === 'All' || t.category === filter);
    const allCategories = ["All", ...Array.from(new Set(transactions.map(t => t.category)))];


    const handleExport = () => {
        const headers = ["ID", "Description", "Category", "Group", "Date", "Amount"];
        const csvContent = [
            headers.join(","),
            ...transactions.map(t => [t.id, `"${t.description}"`, t.category, t.group, t.date, t.amount].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.href) {
            URL.revokeObjectURL(link.href);
        }
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "Exporting transactions...",
            description: "Your transactions have been exported successfully as a CSV file.",
        });
    }

    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <CardTitle>Expenses</CardTitle>
                    <CardDescription>Manage and track all your transactions.</CardDescription>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                            </span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {allCategories.map(cat => (
                           <DropdownMenuCheckboxItem key={cat} checked={filter === cat} onCheckedChange={() => setFilter(cat)}>
                                {cat}
                           </DropdownMenuCheckboxItem>
                        ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Export
                        </span>
                    </Button>
                    <AddTransactionDialog>
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Transaction
                            </span>
                        </Button>
                    </AddTransactionDialog>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead className="hidden lg:table-cell">Category</TableHead>
                            <TableHead className="hidden md:table-cell">Group</TableHead>
                            <TableHead className="hidden sm:table-cell">Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTransactions.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell>
                                    <div className="font-medium">{tx.description}</div>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">
                                    <Badge variant="secondary">{tx.category}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Badge variant="outline">{tx.group}</Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{tx.date}</TableCell>
                                <TableCell className="text-right font-medium">{`₹${Math.abs(tx.amount).toFixed(2)}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>{filteredTransactions.length}</strong> of <strong>{transactions.length}</strong> transactions
                </div>
            </CardFooter>
        </Card>
    );
}
