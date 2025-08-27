
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BarChart2, CreditCard, HandCoins, HelpCircle, Home, Users } from "lucide-react"

export default function HelpPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <HelpCircle className="h-10 w-10 text-primary" />
                <div>
                    <h1 className="text-3xl font-bold font-headline">Help & Support</h1>
                    <p className="text-muted-foreground">Find answers to your questions about using BudgetZen.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Here’s a guide to the core features of the app.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <div className="flex items-center gap-3">
                                    <Home className="h-5 w-5 text-primary" />
                                    <span>The Dashboard</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-10 text-muted-foreground space-y-2">
                                <p>The dashboard gives you a bird's-eye view of your finances.</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li><strong>Stat Cards:</strong> At the top, you'll find quick summaries of your total budget, expenses, and how much you owe versus how much you're owed.</li>
                                    <li><strong>Expense Trends:</strong> A chart that visualizes your spending over time, helping you identify patterns.</li>
                                    <li><strong>Quick Actions:</strong> Buttons to quickly add a transaction, create a group, or settle a debt.</li>
                                    <li><strong>Recent Transactions:</strong> A list of your 5 most recent expenses for easy reference.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <div className="flex items-center gap-3">
                                    <CreditCard className="h-5 w-5 text-primary" />
                                    <span>Managing Expenses</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-10 text-muted-foreground space-y-2">
                                <p>The Expenses page is where you can see a detailed list of all your transactions.</p>
                                 <ul className="list-disc list-inside space-y-1">
                                    <li><strong>Add Transaction:</strong> Click the "Add Transaction" button. When you type a description, our AI will automatically suggest a category for you!</li>
                                    <li><strong>Filter:</strong> Use the "Filter" dropdown to view transactions from a specific category.</li>
                                    <li><strong>Export:</strong> Click the "Export" button to get a copy of your transactions (feature coming soon).</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                <div className="flex items-center gap-3">
                                    <Users className="h-5 w-5 text-primary" />
                                    <span>Using Groups</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-10 text-muted-foreground space-y-2">
                                <p>Groups are perfect for managing shared expenses with friends, family, or colleagues.</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li><strong>Create Group:</strong> Click "Create Group", give it a name and description, and you're set.</li>
                                    <li><strong>Join Group:</strong> Use a unique invite code from a friend to join their group.</li>
                                    <li><strong>Group Details:</strong> Each group card shows you the total expenses, number of members, and the invite code to share.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4">
                            <AccordionTrigger>
                                <div className="flex items-center gap-3">
                                    <HandCoins className="h-5 w-5 text-primary" />
                                    <span>Settling Debts</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-10 text-muted-foreground space-y-2">
                                <p>The Settle Debts page makes it easy to clear up what you owe.</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li><strong>You Owe Tab:</strong> Shows a list of people you need to pay back. Click the "Settle" button next to a debt to mark it as paid.</li>
                                    <li><strong>Owes You Tab:</strong> Shows a list of people who need to pay you back. This list is for tracking purposes.</li>
                                    <li><strong>Dashboard Updates:</strong> Once you settle a debt, the "You Owe" card on your dashboard will update automatically.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="item-5">
                            <AccordionTrigger>
                                <div className="flex items-center gap-3">
                                    <BarChart2 className="h-5 w-5 text-primary" />
                                    <span>Reports & Analysis</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-10 text-muted-foreground space-y-2">
                                <p>The Reports page helps you visualize and understand your spending habits.</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li><strong>Spending by Category:</strong> A chart showing the percentage of your spending in each category.</li>
                                    <li><strong>Large Transactions:</strong> A table that highlights your recent transactions over a certain amount (e.g., ₹5,000).</li>
                                    <li><strong>Key Metrics:</strong> Cards that show your total expenses, average transaction amount, and highest spending category.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
