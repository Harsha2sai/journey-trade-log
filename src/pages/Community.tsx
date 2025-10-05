import { Header } from "@/components/layout/Header";
import { Users, MessageSquare, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Community = () => {
  const topTraders = [
    { name: "Alex Chen", winRate: 78, trades: 342, avatar: "AC" },
    { name: "Sarah Miller", winRate: 74, trades: 289, avatar: "SM" },
    { name: "Mike Johnson", winRate: 71, trades: 256, avatar: "MJ" },
  ];

  const recentDiscussions = [
    { title: "Best strategy for EUR/USD?", author: "John Doe", replies: 23 },
    { title: "Managing risk in volatile markets", author: "Jane Smith", replies: 18 },
    { title: "Technical analysis tips", author: "Bob Wilson", replies: 15 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Community</h1>
          <p className="text-muted-foreground">Connect with fellow traders and share insights</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Traders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Top Traders
              </CardTitle>
              <CardDescription>Highest performing traders this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTraders.map((trader, index) => (
                  <div key={trader.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{index + 1}</Badge>
                      <Avatar>
                        <AvatarFallback>{trader.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{trader.name}</p>
                        <p className="text-sm text-muted-foreground">{trader.trades} trades</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{trader.winRate}%</p>
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Discussions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Recent Discussions
              </CardTitle>
              <CardDescription>Latest community conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDiscussions.map((discussion) => (
                  <div key={discussion.title} className="p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer">
                    <h3 className="font-medium text-foreground mb-1">{discussion.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>by {discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.replies} replies</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Community Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p className="text-3xl font-bold text-primary">1,247</p>
                  <p className="text-sm text-muted-foreground mt-1">Active Traders</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p className="text-3xl font-bold text-primary">8,432</p>
                  <p className="text-sm text-muted-foreground mt-1">Total Trades</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p className="text-3xl font-bold text-primary">234</p>
                  <p className="text-sm text-muted-foreground mt-1">Discussions</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p className="text-3xl font-bold text-primary">67%</p>
                  <p className="text-sm text-muted-foreground mt-1">Avg Win Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Community;
