import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, TrendingUp, Target, Calendar, Users } from "lucide-react";

export type ChallengeType = "compounding" | "risk-reward" | "winrate" | "streak" | "drawdown";
export type ChallengeDifficulty = "beginner" | "intermediate" | "advanced" | "expert";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: ChallengeDifficulty;
  duration: number; // days
  goal: string;
  reward: string;
  participants?: number;
  isActive?: boolean;
  progress?: number;
  startDate?: string;
  endDate?: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
  onStart?: (challenge: Challenge) => void;
  onView?: (challenge: Challenge) => void;
}

const typeIcons: Record<ChallengeType, typeof Trophy> = {
  compounding: TrendingUp,
  "risk-reward": Target,
  winrate: Trophy,
  streak: Calendar,
  drawdown: Target,
};

const difficultyColors: Record<ChallengeDifficulty, string> = {
  beginner: "bg-success/20 text-success border-success/30",
  intermediate: "bg-primary/20 text-primary border-primary/30",
  advanced: "bg-accent/20 text-accent border-accent/30",
  expert: "bg-loss/20 text-loss border-loss/30",
};

export const ChallengeCard = ({ challenge, onStart, onView }: ChallengeCardProps) => {
  const Icon = typeIcons[challenge.type];
  const isActive = challenge.isActive;

  return (
    <Card className="p-6 hover:shadow-glow transition-all duration-300 bg-gradient-card border-border/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">{challenge.title}</h3>
            <p className="text-sm text-muted-foreground">{challenge.duration} days</p>
          </div>
        </div>
        <Badge className={`${difficultyColors[challenge.difficulty]} border`}>
          {challenge.difficulty}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {challenge.description}
      </p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Goal: {challenge.goal}</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-foreground">Reward: {challenge.reward}</span>
        </div>
        {challenge.participants && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {challenge.participants} participants
            </span>
          </div>
        )}
      </div>

      {isActive && challenge.progress !== undefined ? (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-primary">{challenge.progress}%</span>
          </div>
          <Progress value={challenge.progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Started {challenge.startDate}</span>
            <span>Ends {challenge.endDate}</span>
          </div>
        </div>
      ) : null}

      <Button
        onClick={() => (isActive ? onView?.(challenge) : onStart?.(challenge))}
        className="w-full"
        variant={isActive ? "outline" : "default"}
      >
        {isActive ? "View Progress" : "Start Challenge"}
      </Button>
    </Card>
  );
};
