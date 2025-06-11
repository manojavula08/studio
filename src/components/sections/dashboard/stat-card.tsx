"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative';
  chartData?: { name: string; value: number }[];
  chartType?: 'line' | 'bar';
}

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
} satisfies Parameters<typeof ChartContainer>[0]["config"];


export function StatCard({ title, value, icon: Icon, change, changeType, chartData, chartType = 'line' }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-headline">{value}</div>
        {change && (
          <p className={`text-xs ${changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
            {change} from last month
          </p>
        )}
        {chartData && chartData.length > 0 && (
          <div className="h-[60px] mt-2 -ml-4">
            <ChartContainer config={chartConfig} className="h-full w-full">
              {chartType === 'line' ? (
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 5,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="name" hide />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide/>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel hideIndicator />}
                  />
                  <Line
                    dataKey="value"
                    type="monotone"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              ) : (
                <BarChart 
                  accessibilityLayer 
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 5,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="name" hide />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide/>
                   <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel hideIndicator />}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={2} />
                </BarChart>
              )}
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
