import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  TrendingUp,
  Target,
  X,
  Share2,
  Award,
  BarChart3,
  Calendar,
} from "lucide-react";
import { Challenge } from "./ChallengeCard";

interface ChallengeSummaryProps {
  challenge: Challenge;
  finalProgress: number;
  achieved: boolean;
  stats: {
    totalTrades: number;
    winRate: number;
    avgRR: number;
    totalProfit: number;
  };
  onClose: () => void;
}

export const ChallengeSummary = ({
  challenge,
  finalProgress,
  achieved,
  stats,
  onClose,
}: ChallengeSummaryProps) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Header with close button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Challenge Summary</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Result Card */}
      <Card
        className={`p-8 text-center ${
          achieved ? "bg-gradient-success" : "bg-gradient-card"
        } border-2 ${achieved ? "border-success" : "border-border"}`}
      >
        <div
          className={`w-20 h-20 rounded-full ${
            achieved ? "bg-white/20" : "bg-primary/10"
          } flex items-center justify-center mx-auto mb-4 animate-scale-in`}
        >
          {achieved ? (
            <Trophy className="w-10 h-10 text-white" />
          ) : (
            <Target className="w-10 h-10 text-primary" />
          )}
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${achieved ? "text-white" : "text-foreground"}`}>
          {achieved ? "Challenge Completed! 🎉" : "Challenge In Progress"}
        </h3>
        <p className={`text-lg mb-4 ${achieved ? "text-white/90" : "text-muted-foreground"}`}>
          {challenge.title}
        </p>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div>
            <div
              className={`text-4xl font-bold ${achieved ? "text-white" : "text-primary"}`}
            >
              {finalProgress}%
            </div>
            <div
              className={`text-sm ${achieved ? "text-white/80" : "text-muted-foreground"}`}
            >
              Progress
            </div>
          </div>
        </div>
        {achieved && (
          <Badge className="bg-white/20 text-white border-white/30 border text-base px-6 py-2">
            <Award className="w-4 h-4 mr-2" />
            {challenge.reward}
          </Badge>
        )}
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <BarChart3 className="w-5 h-5 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.totalTrades}</div>
          <div className="text-sm text-muted-foreground">Total Trades</div>
        </Card>
        <Card className="p-4">
          <TrendingUp className="w-5 h-5 text-success mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.winRate}%</div>
          <div className="text-sm text-muted-foreground">Win Rate</div>
        </Card>
        <Card className="p-4">
          <Target className="w-5 h-5 text-primary mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.avgRR.toFixed(1)}</div>
          <div className="text-sm text-muted-foreground">Avg R:R</div>
        </Card>
        <Card className="p-4">
          <Trophy className="w-5 h-5 text-accent mb-2" />
          <div className="text-2xl font-bold text-success">+${stats.totalProfit}</div>
          <div className="text-sm text-muted-foreground">Total Profit</div>
        </Card>
      </div>

      {/* Challenge Details */}
      <Card className="p-6">
        <h4 className="font-semibold text-lg mb-4">Challenge Details</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Duration</div>
              <div className="text-sm text-muted-foreground">
                {challenge.duration} days • {challenge.startDate} to {challenge.endDate}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Goal</div>
              <div className="text-sm text-muted-foreground">{challenge.goal}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Trophy className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-foreground">Reward</div>
              <div className="text-sm text-muted-foreground">{challenge.reward}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Insights */}
      <Card className="p-6 bg-gradient-primary border-primary/20">
        <h4 className="font-semibold text-lg text-white mb-3">🎯 Key Insights</h4>
        <ul className="space-y-2 text-sm text-white/90">
          <li>• Your win rate improved by 8% during this challenge</li>
          <li>• Best trading days: Monday & Wednesday</li>
          <li>• You maintained discipline with consistent position sizing</li>
          <li>• Consider extending this strategy to your next challenge</li>
        </ul>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1" onClick={onClose}>
          <Trophy className="w-4 h-4 mr-2" />
          View Badges
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="w-4 h-4 mr-2" />
          Share Result
        </Button>
      </div>

      {!achieved && (
        <div className="text-center">
          <Button variant="outline" onClick={onClose}>
            Continue Challenge
          </Button>
        </div>
      )}
    </div>
  );
};
