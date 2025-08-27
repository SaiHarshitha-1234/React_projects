
"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--primary))",
  },
}

type TimeRange = '1m' | '6m' | '1y';

export function ExpenseChart() {
    const [timeRange, setTimeRange] = useState<TimeRange>('1y');
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const generateData = (range: TimeRange) => {
            const now = new Date();
            if (range === '1y') {
                return Array.from({ length: 12 }).map((_, i) => {
                    const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
                    return { name: d.toLocaleString('default', { month: 'short' }), total: Math.floor(Math.random() * 40000) + 10000 };
                }).slice(-12);
            }
            if (range === '6m') {
                return Array.from({ length: 6 }).map((_, i) => {
                    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
                    return { name: d.toLocaleString('default', { month: 'short' }), total: Math.floor(Math.random() * 40000) + 10000 };
                }).slice(-6);
            }
            if (range === '1m') {
                return Array.from({ length: 30 }).map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (29 - i));
                    return { name: `${d.getDate()}/${d.getMonth() + 1}`, total: Math.floor(Math.random() * 2000) + 500 };
                }).slice(-30);
            }
            return [];
        }
        // This avoids hydration errors by ensuring Math.random() is only called on the client
        setChartData(generateData(timeRange));
    }, [timeRange]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Expense Trends</CardTitle>
                    <CardDescription>Your spending overview.</CardDescription>
                </div>
                <div className="flex items-center gap-1 rounded-md bg-muted p-1">
                    <Button variant={timeRange === '1m' ? 'default' : 'ghost'} size="sm" className="h-7 px-3" onClick={() => setTimeRange('1m')}>1M</Button>
                    <Button variant={timeRange === '6m' ? 'default' : 'ghost'} size="sm" className="h-7 px-3" onClick={() => setTimeRange('6m')}>6M</Button>
                    <Button variant={timeRange === '1y' ? 'default' : 'ghost'} size="sm" className="h-7 px-3" onClick={() => setTimeRange('1y')}>1Y</Button>
                </div>
            </CardHeader>
            <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="h-[350px] w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `₹${value >= 1000 ? `${value / 1000}k` : value}`}
                        />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3' }}
                            content={<ChartTooltipContent
                                formatter={(value) => `₹${(value as number).toLocaleString()}`}
                            />}
                        />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            dot={{
                                r: 4,
                                fill: "hsl(var(--primary))",
                                stroke: "hsl(var(--background))",
                                strokeWidth: 2,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
