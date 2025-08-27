
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { FileDown, ArrowDown, ArrowUp, TrendingUp } from "lucide-react"
import { useAppStore } from "@/hooks/use-app-store"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function ReportsPage() {
    const { transactions } = useAppStore();

    // Calculate category totals
    const categoryTotals = transactions.reduce((acc, tx) => {
        const amount = Math.abs(tx.amount);
        if (acc[tx.category]) {
            acc[tx.category] += amount;
        } else {
            acc[tx.category] = amount;
        }
        return acc;
    }, {} as Record<string, number>);

    const categoryData = Object.entries(categoryTotals).map(([name, value], index) => ({
        name,
        value,
        fill: `hsl(${index * 60}, 70%, 50%)`
    }));
    
    const chartConfig = categoryData.reduce((acc, category) => {
        acc[category.name] = {
            label: category.name,
            color: category.fill
        }
        return acc;
    }, {} as any)

    const totalExpenses = transactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const avgTransaction = totalExpenses / transactions.length;
    const highestCategory = categoryData.reduce((max, cat) => cat.value > max.value ? cat : max, categoryData[0] || { name: 'N/A', value: 0});
    const recentLargeTransactions = transactions.filter(tx => Math.abs(tx.amount) > 5000).slice(0, 5);

    const handleExport = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(22);
        doc.text("BudgetZen Expense Report", 14, 22);

        // Summary Cards
        doc.setFontSize(12);
        doc.text(`Total Expenses: ₹${totalExpenses.toLocaleString()}`, 14, 40);
        doc.text(`Average Transaction: ₹${avgTransaction.toLocaleString(undefined, {maximumFractionDigits: 2})}`, 14, 48);
        doc.text(`Highest Spending Category: ${highestCategory.name} (₹${highestCategory.value.toLocaleString()})`, 14, 56);

        // Transactions Table
        autoTable(doc, {
            startY: 70,
            head: [['Date', 'Description', 'Category', 'Group', 'Amount (₹)']],
            body: transactions.map(tx => [
                tx.date,
                tx.description,
                tx.category,
                tx.group,
                Math.abs(tx.amount).toFixed(2)
            ]),
            headStyles: { fillColor: [22, 163, 74] },
            styles: { fontSize: 8 },
        });

        doc.save("BudgetZen_Report.pdf");
    };


    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Reports & Analysis</h1>
                    <p className="text-muted-foreground">Visualize your spending habits and financial health.</p>
                </div>
                <Button variant="outline" onClick={handleExport}>
                    <FileDown className="mr-2 h-4 w-4" /> Export Report
                </Button>
            </div>
            
             <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <ArrowDown className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">for all time</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{avgTransaction.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
                        <p className="text-xs text-muted-foreground">based on {transactions.length} transactions</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Highest Spending</CardTitle>
                        <ArrowUp className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{highestCategory.name}</div>
                        <p className="text-xs text-muted-foreground">at ₹{highestCategory.value.toLocaleString()}</p>
                    </CardContent>
                </Card>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Spending by Category</CardTitle>
                        <CardDescription>A breakdown of your expenses for the current month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[400px] w-full">
                            <RadialBarChart 
                                data={categoryData} 
                                innerRadius="30%" 
                                outerRadius="80%" 
                                startAngle={180}
                                endAngle={0}
                            >
                                <Tooltip 
                                    cursor={{ strokeDasharray: '6 6' }}
                                    content={({ payload }) => {
                                        if(payload && payload.length > 0) {
                                            const { name, value, fill } = payload[0].payload;
                                            return (
                                                <div className="p-2 bg-background border rounded-lg shadow-lg">
                                                    <p style={{ color: fill }}>{name}</p>
                                                    <p className="font-bold">₹{value.toLocaleString()}</p>
                                                </div>
                                            )
                                        }
                                        return null;
                                    }}
                                />
                                <RadialBar
                                    minAngle={15}
                                    dataKey='value'
                                    background
                                    cornerRadius={10}
                                />
                                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                            </RadialBarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Large Transactions</CardTitle>
                        <CardDescription>Transactions over ₹5,000.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentLargeTransactions.map(tx => (
                                    <TableRow key={tx.id}>
                                        <TableCell className="font-medium">{tx.description}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{tx.category}</Badge>
                                        </TableCell>
                                        <TableCell>{tx.date}</TableCell>
                                        <TableCell className="text-right font-medium">₹{Math.abs(tx.amount).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
           
        </div>
    )
}
