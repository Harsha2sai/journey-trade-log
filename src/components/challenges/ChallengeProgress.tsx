import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Trophy, Flame, TrendingUp } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
  reward?: string;
}

interface ChallengeProgressProps {
  progress: number;
  currentStreak: number;
  milestones: Milestone[];
  nextMilestone?: Milestone;
}

export const ChallengeProgress = ({
  progress,
  currentStreak,
  milestones,
  nextMilestone,
}: ChallengeProgressProps) => {
  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="p-6 bg-gradient-primary border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white">{progress}%</h3>
            <p className="text-white/80 text-sm">Challenge Progress</p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Flame className="w-5 h-5 text-accent" />
            <div className="text-white">
              <div className="text-xl font-bold">{currentStreak}</div>
              <div className="text-xs text-white/80">day streak</div>
            </div>
          </div>
        </div>
        <Progress value={progress} className="h-3 bg-white/20" />
      </Card>

      {/* Next Milestone */}
      {nextMilestone && !nextMilestone.completed && (
        <Card className="p-6 bg-gradient-success border-success/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-1">Next Milestone</h4>
              <p className="text-white/90 font-medium mb-2">{nextMilestone.title}</p>
              <p className="text-sm text-white/70 mb-3">{nextMilestone.description}</p>
              <div className="flex items-center gap-2">
                <Progress value={nextMilestone.progress} className="h-2 flex-1 bg-white/20" />
                <span className="text-sm font-semibold text-white">
                  {nextMilestone.progress}%
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Milestones Roadmap */}
      <Card className="p-6">
        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Milestones Roadmap
        </h4>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                {milestone.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-success shrink-0" />
                ) : (
                  <Circle
                    className={`w-6 h-6 shrink-0 ${
                      milestone.progress > 0 ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                )}
                {index < milestones.length - 1 && (
                  <div
                    className={`w-0.5 h-12 mt-2 ${
                      milestone.completed ? "bg-success" : "bg-border"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-foreground">{milestone.title}</h5>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                  {milestone.completed && (
                    <Badge className="bg-success/20 text-success border-success/30 border">
                      Complete
                    </Badge>
                  )}
                </div>
                {!milestone.completed && milestone.progress > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={milestone.progress} className="h-1.5 flex-1" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {milestone.progress}%
                    </span>
                  </div>
                )}
                {milestone.reward && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-accent">
                    <Trophy className="w-3 h-3" />
                    {milestone.reward}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
