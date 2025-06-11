
"use client";

import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/sections/dashboard/stat-card';
import { AiRecommendationsSection } from '@/components/sections/dashboard/ai-recommendations-section';
import { QuickActionsSection } from '@/components/sections/dashboard/quick-actions-section';
import { TrendingUp, Heart, Target, CalendarDays, Zap } from 'lucide-react';

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8 p-1 md:p-0"> {/* Adjust padding for page level */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline text-foreground">
            Dashboard
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            AI-powered insights for San Francisco, CA 94102
          </p>
        </div>
        <Button variant="link" className="text-sm text-primary font-medium mt-2 sm:mt-0 px-0 hover:no-underline">
          <Zap className="h-4 w-4 mr-1.5" /> Beginner Mode
        </Button>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard 
          title="Trending Products" 
          value="3" 
          icon={TrendingUp}
          change="+12% from last week" 
          changeType="positive"
        />
        <StatCard 
          title="Watchlist Items" 
          value="0" 
          icon={Heart} 
          subtext="Items being tracked"
        />
        <StatCard 
          title="Avg Trend Score" 
          value="87.7" 
          icon={Target} 
          subtext="Excellent opportunity"
        />
        <StatCard 
          title="Next Occasion" 
          value="3d" 
          icon={CalendarDays}
          subtext="Back to School rush"
        />
      </div>
      
      <AiRecommendationsSection />
      
      <QuickActionsSection />

    </div>
  );
}
