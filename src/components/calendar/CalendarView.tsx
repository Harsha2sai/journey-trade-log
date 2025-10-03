import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Mock data - will be replaced with real data
  const tradingDays = {
    "2025-01-15": { pnl: 250, trades: 3 },
    "2025-01-16": { pnl: -120, trades: 2 },
    "2025-01-17": { pnl: 180, trades: 4 },
    "2025-01-18": { pnl: 320, trades: 5 },
    "2025-01-19": { pnl: -80, trades: 2 },
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getDayData = (day: number | null) => {
    if (!day) return null;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tradingDays[dateStr as keyof typeof tradingDays];
  };

  const getDayColor = (day: number | null) => {
    const data = getDayData(day);
    if (!data) return 'bg-secondary/30';
    
    const pnl = data.pnl;
    if (pnl > 200) return 'bg-profit';
    if (pnl > 0) return 'bg-profit/60';
    if (pnl > -100) return 'bg-loss/60';
    return 'bg-loss';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + (direction === 'next' ? 1 : -1),
      1
    ));
  };

  const days = getDaysInMonth();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const data = getDayData(day);
              const isToday = day === new Date().getDate() && 
                             currentMonth.getMonth() === new Date().getMonth() &&
                             currentMonth.getFullYear() === new Date().getFullYear();
              
              return (
                <button
                  key={index}
                  className={`
                    aspect-square rounded-lg flex flex-col items-center justify-center p-2
                    transition-all duration-200 hover:scale-105
                    ${day ? getDayColor(day) : 'bg-transparent'}
                    ${isToday ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
                    ${data ? 'cursor-pointer' : day ? 'opacity-50' : ''}
                  `}
                  disabled={!day}
                >
                  {day && (
                    <>
                      <span className={`text-sm font-semibold ${data ? 'text-background' : 'text-foreground/50'}`}>
                        {day}
                      </span>
                      {data && (
                        <span className={`text-xs font-bold mt-1 ${data.pnl >= 0 ? 'text-background' : 'text-background'}`}>
                          {data.pnl >= 0 ? '+' : ''}{data.pnl}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-profit" />
              <span className="text-xs text-muted-foreground">Profit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-loss" />
              <span className="text-xs text-muted-foreground">Loss</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-secondary/30" />
              <span className="text-xs text-muted-foreground">No Trades</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
