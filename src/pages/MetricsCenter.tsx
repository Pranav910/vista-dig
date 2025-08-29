import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Target, 
  Shield, 
  Zap,
  BarChart3,
  TrendingUp
} from "lucide-react";

const MetricsCenter = () => {
  const dataQualityMetrics = [
    {
      name: "Data Accuracy",
      score: 98.5,
      status: "excellent",
      description: "Field value precision and error tracking",
      icon: CheckCircle,
      details: "2,847 successful validations out of 2,890 total checks"
    },
    {
      name: "Data Completeness",
      score: 94.2,
      status: "good",
      description: "Missing data identification and reporting",
      icon: Target,
      details: "5.8% missing fields detected and flagged for review"
    },
    {
      name: "Data Validity",
      score: 96.8,
      status: "excellent",
      description: "Format compliance and range verification",
      icon: Shield,
      details: "Format validation passed on 96.8% of extracted fields"
    },
    {
      name: "Data Timeliness",
      score: 91.3,
      status: "good",
      description: "Extraction speed and relevance metrics",
      icon: Clock,
      details: "Average extraction time: 2.3 seconds per page"
    },
    {
      name: "Data Uniqueness",
      score: 99.1,
      status: "excellent",
      description: "Duplicate detection and prevention",
      icon: Zap,
      details: "0.9% duplicate records identified and removed"
    },
    {
      name: "Data Integrity",
      score: 97.6,
      status: "excellent",
      description: "Consistency and relationship preservation",
      icon: BarChart3,
      details: "Relational integrity maintained across 97.6% of datasets"
    },
    {
      name: "Data Consistency",
      score: 89.4,
      status: "warning",
      description: "Standardization across systems",
      icon: TrendingUp,
      details: "10.6% variance in data formatting detected"
    },
    {
      name: "Data Accessibility",
      score: 95.7,
      status: "excellent",
      description: "Storage organization and security",
      icon: Shield,
      details: "API response time averaging 125ms with 99.9% uptime"
    },
    {
      name: "Data Traceability",
      score: 92.8,
      status: "good",
      description: "Source tracking and transformation logs",
      icon: AlertCircle,
      details: "Complete audit trail maintained for 92.8% of operations"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'good':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 95) return 'bg-accent';
    if (score >= 90) return 'bg-primary';
    return 'bg-warning';
  };

  const overallScore = dataQualityMetrics.reduce((acc, metric) => acc + metric.score, 0) / dataQualityMetrics.length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight gradient-text">
            Data Quality Metrics
          </h1>
          <p className="text-muted-foreground">
            Comprehensive feedback system for AI agent performance evaluation
          </p>
        </div>

        {/* Overall Score */}
        <Card className="p-6 bg-surface border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Overall Data Quality Score</h2>
              <p className="text-muted-foreground">Aggregate performance across all metrics</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold gradient-text">
                {overallScore.toFixed(1)}%
              </div>
              <Badge className={getStatusColor('excellent')}>Excellent</Badge>
            </div>
          </div>
          <Progress value={overallScore} className="h-3" />
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataQualityMetrics.map((metric, index) => (
            <Card key={index} className="p-6 bg-surface border-border hover:bg-surface-hover transition-colors glow-effect">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <metric.icon className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">{metric.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`mt-1 ${getStatusColor(metric.status)}`}
                      >
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{metric.score}%</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress 
                    value={metric.score} 
                    className="h-2"
                    style={{
                      '--progress-background': getProgressColor(metric.score)
                    } as React.CSSProperties}
                  />
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    {metric.details}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trend Analysis */}
        <Card className="p-6 bg-surface border-border">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Performance Trends</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-chat-input rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">7-Day Average</span>
                  <TrendingUp className="h-4 w-4 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent">+2.3%</div>
                <p className="text-xs text-muted-foreground">Improvement over last week</p>
              </div>
              <div className="p-4 bg-chat-input rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Peak Performance</span>
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">99.2%</div>
                <p className="text-xs text-muted-foreground">Best single-day score</p>
              </div>
              <div className="p-4 bg-chat-input rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Consistency</span>
                  <Shield className="h-4 w-4 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent">94.8%</div>
                <p className="text-xs text-muted-foreground">Score stability index</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MetricsCenter;