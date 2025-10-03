import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChallengeCard, Challenge } from "./ChallengeCard";
import { ChallengeProgress } from "./ChallengeProgress";
import { ChallengeSummary } from "./ChallengeSummary";
import { Trophy, Target, TrendingUp, Zap, Users, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - will be replaced with real data
const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "10% Growth Sprint",
    description: "Grow your account by 10% in 30 days through consistent, disciplined trading",
    type: "compounding",
    difficulty: "intermediate",
    duration: 30,
    goal: "Achieve 10% account growth",
    reward: "Growth Master Badge + Analytics Unlock",
    participants: 156,
  },
  {
    id: "2",
    title: "R:R Excellence",
    description: "Improve your risk-to-reward ratio from 1.0 to 1.5+ over 100 trades",
    type: "risk-reward",
    difficulty: "advanced",
    duration: 60,
    goal: "Average R:R of 1.5+",
    reward: "Precision Trader Badge",
    participants: 89,
  },
  {
    id: "3",
    title: "Perfect Week",
    description: "Achieve 7 consecutive days with at least 60% win rate",
    type: "winrate",
    difficulty: "beginner",
    duration: 7,
    goal: "60%+ win rate for 7 days",
    reward: "Consistency Badge",
    participants: 234,
  },
  {
    id: "4",
    title: "Drawdown Guardian",
    description: "Keep maximum drawdown under 5% for an entire month",
    type: "drawdown",
    difficulty: "expert",
    duration: 30,
    goal: "Max 5% drawdown",
    reward: "Risk Master Badge + Premium Insights",
    participants: 45,
  },
];

const activeChallenges: Challenge[] = [
  {
    id: "active1",
    title: "10% Growth Sprint",
    description: "Grow your account by 10% in 30 days",
    type: "compounding",
    difficulty: "intermediate",
    duration: 30,
    goal: "Achieve 10% account growth",
    reward: "Growth Master Badge",
    isActive: true,
    progress: 67,
    startDate: "Dec 5",
    endDate: "Jan 4",
  },
];

const mockMilestones = [
  {
    id: "m1",
    title: "First 3% Gained",
    description: "Reach 3% account growth",
    progress: 100,
    completed: true,
    reward: "50 XP",
  },
  {
    id: "m2",
    title: "Halfway There",
    description: "Reach 5% account growth",
    progress: 100,
    completed: true,
    reward: "100 XP + Early Badge",
  },
  {
    id: "m3",
    title: "Final Push",
    description: "Reach 8% account growth",
    progress: 75,
    completed: false,
    reward: "150 XP",
  },
  {
    id: "m4",
    title: "Challenge Complete",
    description: "Reach 10% account growth",
    progress: 0,
    completed: false,
    reward: "Growth Master Badge + 500 XP",
  },
];

export const ChallengesView = () => {
  const [selectedTab, setSelectedTab] = useState("active");
  const [showSummary, setShowSummary] = useState(false);
  const { toast } = useToast();

  const handleStartChallenge = (challenge: Challenge) => {
    toast({
      title: "Challenge Started!",
      description: `"${challenge.title}" has been added to your active challenges.`,
    });
  };

  const handleViewChallenge = (challenge: Challenge) => {
    // Navigate to challenge details
    toast({
      title: "View Challenge",
      description: `Opening "${challenge.title}"...`,
    });
  };

  if (showSummary) {
    return (
      <ChallengeSummary
        challenge={activeChallenges[0]}
        finalProgress={67}
        achieved={false}
        stats={{
          totalTrades: 45,
          winRate: 62,
          avgRR: 1.8,
          totalProfit: 670,
        }}
        onClose={() => setShowSummary(false)}
      />
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-success">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-white" />
            <div>
              <p className="text-sm text-white/80">Completed</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-primary">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-white" />
            <div>
              <p className="text-sm text-white/80">Active</p>
              <p className="text-2xl font-bold text-white">1</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-card">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total XP</p>
              <p className="text-2xl font-bold text-foreground">2,450</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-card">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Rank</p>
              <p className="text-2xl font-bold text-foreground">#47</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">
            Active <Badge className="ml-2 bg-primary/20 text-primary">1</Badge>
          </TabsTrigger>
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6 mt-6">
          {activeChallenges.length > 0 ? (
            <>
              <ChallengeProgress
                progress={67}
                currentStreak={12}
                milestones={mockMilestones}
                nextMilestone={mockMilestones.find((m) => !m.completed)}
              />
              <div className="grid gap-4">
                {activeChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onView={handleViewChallenge}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowSummary(true)}
              >
                View Sample Challenge Summary
              </Button>
            </>
          ) : (
            <Card className="p-12 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Active Challenges</h3>
              <p className="text-muted-foreground mb-4">
                Start a challenge to track your progress and earn rewards
              </p>
              <Button onClick={() => setSelectedTab("browse")}>
                <Plus className="w-4 h-4 mr-2" />
                Browse Challenges
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="browse" className="mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Featured Challenges
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {mockChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onStart={handleStartChallenge}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Community Challenges
              </h3>
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  Community challenges coming soon! Create and share your own challenges with other
                  traders.
                </p>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <Card className="p-12 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-success" />
            <h3 className="text-lg font-semibold mb-2">No Completed Challenges Yet</h3>
            <p className="text-muted-foreground">
              Complete your first challenge to see it here and earn badges!
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
