import { useState, useEffect } from "react";
import { Globe, Clock, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Source {
  id: string;
  url: string;
  domain: string;
  status: 'loading' | 'success' | 'error' | 'idle';
  extractedData?: number;
  responseTime?: number;
  timestamp: Date;
}

export const SourcesPanel = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [isActive, setIsActive] = useState(true);

  // Simulate real-time scraping activity
  useEffect(() => {
    if (!isActive) return;

    const mockSources = [
      { domain: 'amazon.com', url: 'https://amazon.com/products/laptops' },
      { domain: 'flipkart.com', url: 'https://flipkart.com/electronics/computers' },
      { domain: 'bestbuy.com', url: 'https://bestbuy.com/laptops' },
      { domain: 'newegg.com', url: 'https://newegg.com/computers' },
      { domain: 'ebay.com', url: 'https://ebay.com/tech/laptops' }
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex >= mockSources.length) {
        setIsActive(false);
        return;
      }

      const mockSource = mockSources[currentIndex];
      const newSource: Source = {
        id: `source-${Date.now()}`,
        domain: mockSource.domain,
        url: mockSource.url,
        status: 'loading',
        timestamp: new Date()
      };

      setSources(prev => [...prev, newSource]);

      // Simulate completion after 2-4 seconds
      setTimeout(() => {
        setSources(prev => prev.map(source => 
          source.id === newSource.id 
            ? {
                ...source,
                status: Math.random() > 0.1 ? 'success' : 'error',
                extractedData: Math.floor(Math.random() * 500) + 50,
                responseTime: Math.floor(Math.random() * 2000) + 500
              }
            : source
        ));
      }, Math.random() * 2000 + 1000);

      currentIndex++;
    }, 1500);

    return () => clearInterval(interval);
  }, [isActive]);

  const getStatusIcon = (status: Source['status']) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin text-source-loading" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-source-active" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Globe className="h-4 w-4 text-source-idle" />;
    }
  };

  const getStatusBadge = (status: Source['status']) => {
    switch (status) {
      case 'loading':
        return <Badge variant="outline" className="text-source-loading border-source-loading/20">Scraping</Badge>;
      case 'success':
        return <Badge variant="outline" className="text-source-active border-source-active/20">Complete</Badge>;
      case 'error':
        return <Badge variant="outline" className="text-destructive border-destructive/20">Error</Badge>;
      default:
        return <Badge variant="outline" className="text-source-idle border-source-idle/20">Pending</Badge>;
    }
  };

  const completedSources = sources.filter(s => s.status === 'success').length;
  const totalSources = sources.length;
  const progressPercentage = totalSources > 0 ? (completedSources / totalSources) * 100 : 0;

  return (
    <div className="h-full flex flex-col bg-gradient-surface">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Live Sources</h3>
          </div>
          
          {totalSources > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{completedSources}/{totalSources}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
        </div>
      </div>

      {/* Sources List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
        {sources.length === 0 && (
          <div className="text-center py-8">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Sources will appear here when scraping begins
            </p>
          </div>
        )}

        {sources.map((source) => (
          <Card key={source.id} className="p-4 bg-surface border-border hover:bg-surface-hover transition-colors">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {getStatusIcon(source.status)}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-sm truncate">{source.domain}</h4>
                    <p className="text-xs text-muted-foreground truncate">{source.url}</p>
                  </div>
                </div>
                {getStatusBadge(source.status)}
              </div>

              {source.status === 'success' && source.extractedData && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Data Points</span>
                    <span className="font-medium">{source.extractedData}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium">{source.responseTime}ms</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {source.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer Stats */}
      {sources.length > 0 && (
        <div className="p-4 border-t border-border bg-surface">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Success Rate</p>
              <p className="font-medium text-source-active">
                {totalSources > 0 ? Math.round((completedSources / totalSources) * 100) : 0}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Data</p>
              <p className="font-medium">
                {sources.reduce((acc, s) => acc + (s.extractedData || 0), 0)} points
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};