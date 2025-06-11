"use client";

import { OverviewStatCard } from '@/components/sections/dashboard/overview-stat-card';
import { HotTrendsSection } from '@/components/sections/dashboard/hot-trends-section';
import { TrendQuestChallengesSection } from '@/components/sections/dashboard/trendquest-challenges-section';
import { TrendingUp, Eye, DollarSign, Zap, MapPin, Edit } from 'lucide-react'; // Zap for TrendQuest Level
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6 p-1"> {/* Reduced padding from p-6 if layout handles it */}
      {/* Welcome Message */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-6 rounded-lg bg-card shadow">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">
            Welcome back, Alex Dropshipper! <span role="img" aria-label="waving hand">👋</span>
          </h1>
          <p className="text-muted-foreground flex items-center mt-1">
            <MapPin className="h-4 w-4 mr-1.5 text-muted-foreground" />
            Scanning trends in San Francisco, CA
            <Button variant="ghost" size="icon" className="ml-2 h-6 w-6 text-muted-foreground hover:text-primary">
              <Edit className="h-3.5 w-3.5"/>
              <span className="sr-only">Edit location</span>
            </Button>
          </p>
        </div>
        <div className="mt-4 sm:mt-0 text-right">
            <p className="text-2xl font-bold text-primary">1250</p>
            <p className="text-xs text-muted-foreground">TrendQuest Points</p>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <OverviewStatCard 
          title="Active Trends" 
          value="127" 
          icon={TrendingUp}
          iconColor="text-green-500"
          change="+12% from last week" 
          changeType="positive"
        />
        <OverviewStatCard 
          title="Watchlist Items" 
          value="0" 
          icon={Eye} 
          iconColor="text-blue-500"
          subValue="2 alerts pending"
        />
        <OverviewStatCard 
          title="Profit Potential" 
          value="$8.2K" 
          icon={DollarSign} 
          iconColor="text-purple-500"
          subValue="Monthly forecast"
        />
        <OverviewStatCard 
          title="TrendQuest Level" 
          value="Level 3" 
          icon={Zap}
          iconColor="text-yellow-400"
          progress={75} // Example progress
          footerText="2500 / 3000 XP"
        />
      </div>
      
      {/* Main Content Grid: Hot Trends and Challenges */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <HotTrendsSection />
        </div>
        <div>
          <TrendQuestChallengesSection />
        </div>
      </div>
    </div>
  );
}
