import { useState, useEffect } from "react";
import { Send, Paperclip, Globe, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatSidebar } from "@/components/ChatSidebar";
import { SourcesPanel } from "@/components/SourcesPanel";
import { MessageBubble } from "@/components/MessageBubble";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { useNavigate } from "react-router-dom";

const InteractionHub = () => {
  const [message, setMessage] = useState("");
  const [isSourcesVisible, setIsSourcesVisible] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { 
    chatRooms, 
    currentRoom, 
    messages, 
    loading: chatLoading,
    createNewChat, 
    sendMessage, 
    switchToRoom 
  } = useChat(user?.id);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Auto-create first chat if user has no rooms
    if (user && chatRooms.length === 0 && !chatLoading) {
      handleNewChat();
    }
  }, [user, chatRooms, chatLoading]);

  const handleNewChat = async () => {
    const newRoom = await createNewChat();
    if (newRoom) {
      await switchToRoom(newRoom);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !currentRoom) return;

    await sendMessage(message, currentRoom.id);
    setMessage("");
    setIsSourcesVisible(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="chat-container">
      {/* Left Sidebar - Chat History */}
      <ChatSidebar 
        chatRooms={chatRooms}
        currentRoom={currentRoom}
        onNewChat={handleNewChat}
        onRoomSelect={switchToRoom}
      />

      {/* Main Chat Area */}
      <div className="chat-main">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-primary" />
            <div>
              <h2 className="font-semibold">
                {currentRoom ? currentRoom.name : "Web Scraping Assistant"}
              </h2>
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
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
                <p>Ask me to scrape data from any website or analyze web content.</p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble 
                key={msg.id} 
                message={{
                  id: msg.id,
                  content: msg.content,
                  role: msg.role,
                  timestamp: new Date(msg.created_at)
                }} 
              />
            ))
          )}
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
                disabled={!message.trim() || !currentRoom}
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