import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodayDashboard } from "@/components/dashboard/TodayDashboard";
import { CalendarView } from "@/components/calendar/CalendarView";
import { AnalyticsView } from "@/components/analytics/AnalyticsView";
import { NewTradeDialog } from "@/components/trade/NewTradeDialog";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Calendar, BarChart3, Home, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

type View = "today" | "calendar" | "analytics";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("today");
  const [isNewTradeOpen, setIsNewTradeOpen] = useState(false);
  const navigate = useNavigate();

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

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
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
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/community")}
                  className="flex flex-col items-center gap-1"
                >
                  <Users className="h-5 w-5" />
                  <span className="text-xs">Community</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/challenges")}
                  className="flex flex-col items-center gap-1"
                >
                  <Trophy className="h-5 w-5" />
                  <span className="text-xs">Challenges</span>
                </Button>
              </div>
            </div>
          </nav>

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
