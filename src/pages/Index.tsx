import { useState } from "react";
import { TodayDashboard } from "@/components/dashboard/TodayDashboard";
import { CalendarView } from "@/components/calendar/CalendarView";
import { AnalyticsView } from "@/components/analytics/AnalyticsView";
import { NewTradeDialog } from "@/components/trade/NewTradeDialog";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/navigation/BottomNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { View } from "@/types";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("today");
  const [isNewTradeOpen, setIsNewTradeOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case "today":
        return <TodayDashboard onNewTrade={() => setIsNewTradeOpen(true)} />;
      case "calendar":
        return <CalendarView />;
      case "analytics":
        return <AnalyticsView />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar currentView={currentView} onViewChange={setCurrentView} />
        
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex items-center px-4 py-2 border-b border-border">
            <SidebarTrigger />
          </div>
          
          <main className="flex-1 container mx-auto px-4 py-6 pb-24">
            {renderView()}
          </main>

          <BottomNav currentView={currentView} onViewChange={setCurrentView} />

          <NewTradeDialog 
            open={isNewTradeOpen} 
            onOpenChange={setIsNewTradeOpen}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
