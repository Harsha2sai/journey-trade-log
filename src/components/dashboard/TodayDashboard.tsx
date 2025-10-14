import { Plus, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MOCK_DASHBOARD_STATS, MOCK_TODAY_TRADES } from "@/constants/mockData";

interface TodayDashboardProps {
  onNewTrade: () => void;
}

export const TodayDashboard = ({ onNewTrade }: TodayDashboardProps) => {
  const { todayPnL, todayTrades, winRate, weeklyGoal } = MOCK_DASHBOARD_STATS;
  const weeklyProgress = (todayPnL / weeklyGoal) * 100;
  const recentTrades = MOCK_TODAY_TRADES;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Date Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h2>
        <p className="text-muted-foreground mt-1">Your trading journey today</p>
      </div>

      {/* P&L Card */}
      <Card className="relative overflow-hidden shadow-card border-border/50">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <CardContent className="relative pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Today's P&L</p>
              <h3 className={`text-4xl font-bold ${todayPnL >= 0 ? 'text-profit' : 'text-loss'}`}>
                ${todayPnL >= 0 ? '+' : ''}{todayPnL.toFixed(2)}
              </h3>
            </div>
            <div className={`p-4 rounded-2xl ${todayPnL >= 0 ? 'bg-profit/10' : 'bg-loss/10'}`}>
              {todayPnL >= 0 ? (
                <TrendingUp className="h-10 w-10 text-profit" />
              ) : (
                <TrendingDown className="h-10 w-10 text-loss" />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground">Trades</p>
              <p className="text-lg font-semibold">{todayTrades}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Win Rate</p>
              <p className="text-lg font-semibold text-profit">{winRate}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goal Progress */}
      <Card className="shadow-card border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Weekly Goal</CardTitle>
            <Badge variant="outline" className="text-xs">
              ${todayPnL.toFixed(0)} / ${weeklyGoal}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={weeklyProgress} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">
            {weeklyProgress.toFixed(0)}% of weekly target reached
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button 
          onClick={onNewTrade}
          className="flex-1 h-14 bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Trade
        </Button>
      </div>

      {/* Recent Trades */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Today's Trades</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentTrades.length > 0 ? (
            recentTrades.map((trade) => (
              <div 
                key={trade.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${trade.win ? 'bg-profit' : 'bg-loss'}`} />
                  <div>
                    <p className="font-semibold text-sm">{trade.symbol}</p>
                    <p className="text-xs text-muted-foreground">{trade.time}</p>
                  </div>
                </div>
                <div className={`font-bold ${trade.win ? 'text-profit' : 'text-loss'}`}>
                  {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <DollarSign className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No trades yet today</p>
              <p className="text-xs mt-1">Start by logging your first trade</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
