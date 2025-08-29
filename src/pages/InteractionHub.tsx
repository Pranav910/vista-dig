import { useState } from "react";
import { Send, Paperclip, Globe, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChatSidebar } from "@/components/ChatSidebar";
import { SourcesPanel } from "@/components/SourcesPanel";
import { MessageBubble } from "@/components/MessageBubble";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const InteractionHub = () => {
  const [message, setMessage] = useState("");
  const [isSourcesVisible, setIsSourcesVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI web scraping assistant. You can ask me to extract data from any website. Just provide a URL or describe what information you need.",
      role: "assistant",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      role: "user" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    // Simulate AI response with sources
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: "I'll help you scrape that data. Let me access the website and extract the information you need.",
        role: "assistant" as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsSourcesVisible(true);
    }, 1000);
  };

  return (
    <div className="chat-container">
      {/* Left Sidebar - Chat History */}
      <ChatSidebar />

      {/* Main Chat Area */}
      <div className="chat-main">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-primary" />
            <div>
              <h2 className="font-semibold">Web Scraping Assistant</h2>
              <p className="text-sm text-muted-foreground">AI-powered data extraction</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glow-effect">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-surface">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe what data you want to scrape or paste a URL..."
                  className="pr-12 bg-chat-input border-border"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="shrink-0 glow-effect"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Tip: Be specific about the data you need and mention the target website
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Sources (Dynamic) */}
      <div className={`sources-panel ${isSourcesVisible ? 'visible' : ''}`}>
        <SourcesPanel />
      </div>
    </div>
  );
};

export default InteractionHub;