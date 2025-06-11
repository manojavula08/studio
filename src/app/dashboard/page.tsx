"use client";

import { StatCard } from '@/components/sections/dashboard/stat-card';
import { DollarSign, MousePointerClick, TrendingUp, Star } from 'lucide-react';

// Mock data for sparklines
const spendData = [
  { name: 'Jan', value: 300 }, { name: 'Feb', value: 450 }, { name: 'Mar', value: 400 },
  { name: 'Apr', value: 600 }, { name: 'May', value: 550 }, { name: 'Jun', value: 700 },
];
const cpmData = [
  { name: 'Jan', value: 5 }, { name: 'Feb', value: 4.5 }, { name: 'Mar', value: 4.8 },
  { name: 'Apr', value: 4.2 }, { name: 'May', value: 4.6 }, { name: 'Jun', value: 4.1 },
];
const trendHitsData = [
  { name: 'Jan', value: 12 }, { name: 'Feb', value: 15 }, { name: 'Mar', value: 10 },
  { name: 'Apr', value: 18 }, { name: 'May', value: 22 }, { name: 'Jun', value: 20 },
];
const watchlistData = [
  { name: 'Jan', value: 5 }, { name: 'Feb', value: 8 }, { name: 'Mar', value: 7 },
  { name: 'Apr', value: 10 }, { name: 'May', value: 12 }, { name: 'Jun', value: 15 },
];

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Spend" 
          value="$12,345" 
          icon={DollarSign} 
          change="+5.2%" 
          changeType="positive"
          chartData={spendData}
          chartType="line"
        />
        <StatCard 
          title="Average CPM" 
          value="$4.50" 
          icon={MousePointerClick} 
          change="-0.8%" 
          changeType="negative"
          chartData={cpmData}
          chartType="line"
        />
        <StatCard 
          title="Trend Hits" 
          value="128" 
          icon={TrendingUp} 
          change="+15" 
          changeType="positive"
          chartData={trendHitsData}
          chartType="bar"
        />
        <StatCard 
          title="Watchlist Items" 
          value="42" 
          icon={Star} 
          change="+3" 
          changeType="positive"
          chartData={watchlistData}
          chartType="bar"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 font-headline">Recent Activity</h2>
          {/* Placeholder for recent activity feed or chart */}
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Activity Feed/Chart Placeholder
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 font-headline">Top Performing Products</h2>
          {/* Placeholder for top products list */}
          <ul className="space-y-3">
            {[1,2,3,4].map(i => (
              <li key={i} className="flex items-center justify-between p-2 rounded hover:bg-secondary">
                <span>Product Name {i}</span>
                <span className="text-sm text-primary font-medium">+{20-i*2}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
