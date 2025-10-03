import { useState } from "react";
import { TodayDashboard } from "@/components/dashboard/TodayDashboard";
import { CalendarView } from "@/components/calendar/CalendarView";
import { AnalyticsView } from "@/components/analytics/AnalyticsView";
import { NewTradeDialog } from "@/components/trade/NewTradeDialog";
import { Header } from "@/components/layout/Header";
import { Calendar, BarChart3, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

type View = "today" | "calendar" | "analytics";

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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-24">
        {renderView()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <Button
              variant={currentView === "today" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("today")}
              className="flex flex-col items-center gap-1"
            >
              <Home className="h-5 w-5" />
              <span className="text-xs">Today</span>
            </Button>
            
            <Button
              variant={currentView === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("calendar")}
              className="flex flex-col items-center gap-1"
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Calendar</span>
            </Button>
            
            <Button
              variant={currentView === "analytics" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("analytics")}
              className="flex flex-col items-center gap-1"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs">Analytics</span>
            </Button>
          </div>
        </div>
      </nav>

      <NewTradeDialog 
        open={isNewTradeOpen} 
        onOpenChange={setIsNewTradeOpen}
      />
    </div>
  );
};

export default Index;
