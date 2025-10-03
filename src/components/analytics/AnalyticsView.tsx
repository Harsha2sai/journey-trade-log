import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Award, Zap } from "lucide-react";

export const AnalyticsView = () => {
  // Mock data - will be replaced with real data
  const stats = {
    totalPnL: 1245.50,
    winRate: 64.2,
    avgWin: 185.30,
    avgLoss: -95.50,
    totalTrades: 28,
    winningDays: 12,
    losingDays: 4,
    bestDay: 420.00,
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    subtitle, 
    color = "default" 
  }: { 
    title: string; 
    value: string; 
    icon: any; 
    subtitle?: string;
    color?: "profit" | "loss" | "default";
  }) => {
    const colorClasses = {
      profit: "text-profit bg-profit/10",
      loss: "text-loss bg-loss/10",
      default: "text-primary bg-primary/10"
    };

    return (
      <Card className="shadow-card border-border/50">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">{title}</p>
              <h3 className={`text-2xl font-bold ${color === 'profit' ? 'text-profit' : color === 'loss' ? 'text-loss' : 'text-foreground'}`}>
                {value}
              </h3>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
            <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Performance Analytics</h2>
        <p className="text-muted-foreground mt-1">Track your trading journey</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Total P&L"
          value={`$${stats.totalPnL >= 0 ? '+' : ''}${stats.totalPnL.toFixed(2)}`}
          icon={TrendingUp}
          subtitle="Last 30 days"
          color={stats.totalPnL >= 0 ? "profit" : "loss"}
        />
        
        <StatCard
          title="Win Rate"
          value={`${stats.winRate.toFixed(1)}%`}
          icon={Target}
          subtitle={`${stats.totalTrades} total trades`}
          color="default"
        />
        
        <StatCard
          title="Average Win"
          value={`$${stats.avgWin.toFixed(2)}`}
          icon={Award}
          subtitle="Per winning trade"
          color="profit"
        />
        
        <StatCard
          title="Average Loss"
          value={`$${stats.avgLoss.toFixed(2)}`}
          icon={Zap}
          subtitle="Per losing trade"
          color="loss"
        />
      </div>

      {/* Additional Stats */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Trading Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Winning Days</span>
            <span className="text-sm font-semibold text-profit">{stats.winningDays} days</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Losing Days</span>
            <span className="text-sm font-semibold text-loss">{stats.losingDays} days</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">Best Day</span>
            <span className="text-sm font-semibold text-profit">${stats.bestDay.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Total Trades</span>
            <span className="text-sm font-semibold">{stats.totalTrades}</span>
          </div>
        </CardContent>
      </Card>

      {/* Risk Metrics */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Risk Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Risk:Reward Ratio</span>
                <span className="text-sm font-semibold">1:1.94</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-success" style={{ width: '66%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Expectancy</span>
                <span className="text-sm font-semibold text-profit">$44.48</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Expected value per trade
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
