import { useNavigate } from "react-router-dom";
import { Home, Calendar, BarChart3, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { View } from "@/types";

interface BottomNavProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const BottomNav = ({ currentView, onViewChange }: BottomNavProps) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          <Button
            variant={currentView === "today" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("today")}
            className="flex flex-col items-center gap-1"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Today</span>
          </Button>

          <Button
            variant={currentView === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("calendar")}
            className="flex flex-col items-center gap-1"
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Calendar</span>
          </Button>

          <Button
            variant={currentView === "analytics" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("analytics")}
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
  );
};
