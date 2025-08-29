import { Card } from "@/components/ui/card";
import { Activity, Database, Zap, Users, TrendingUp, Shield } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Scrapers",
      value: "12",
      change: "+2.5%",
      icon: Activity,
      color: "text-accent"
    },
    {
      title: "Data Processed",
      value: "1.2M",
      change: "+12.3%",
      icon: Database,
      color: "text-primary"
    },
    {
      title: "Success Rate",
      value: "98.7%",
      change: "+0.2%",
      icon: Shield,
      color: "text-accent"
    },
    {
      title: "Active Users",
      value: "2,847",
      change: "+5.1%",
      icon: Users,
      color: "text-secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight gradient-text">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Monitor your web scraping operations and AI agent performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-surface border-border hover:bg-surface-hover transition-colors glow-effect">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Activity Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-surface border-border">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: "Scraped", target: "amazon.com", time: "2 min ago", status: "success" },
                  { action: "Processed", target: "shopify.com", time: "5 min ago", status: "success" },
                  { action: "Analyzed", target: "ebay.com", time: "8 min ago", status: "warning" },
                  { action: "Extracted", target: "etsy.com", time: "12 min ago", status: "success" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-chat-input rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-accent' : 
                        activity.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                      }`} />
                      <span className="text-sm">
                        <span className="font-medium">{activity.action}</span> {activity.target}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-surface border-border">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                System Health
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response Time</span>
                    <span className="text-accent">125ms</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span className="text-accent">98.7%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '98.7%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Queue Status</span>
                    <span className="text-primary">Active</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full pulse-glow" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;