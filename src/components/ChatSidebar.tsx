import { useState } from "react";
import { Plus, MessageSquare, ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatRoom {
  id: string;
  name: string;
  created_at: string;
  user_id: string;
}

interface ChatSidebarProps {
  chatRooms: ChatRoom[];
  currentRoom: ChatRoom | null;
  onNewChat: () => void;
  onRoomSelect: (room: ChatRoom) => void;
}

export const ChatSidebar = ({ chatRooms, currentRoom, onNewChat, onRoomSelect }: ChatSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn(
      "chat-sidebar transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="font-semibold text-sidebar-foreground">Chat History</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed && "rotate-180"
            )} />
          </Button>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button 
          onClick={onNewChat}
          className={cn(
            "w-full glow-effect bg-primary hover:bg-primary/90",
            isCollapsed && "p-2"
          )}
        >
          <Plus className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
            />
          </div>
        </div>
      )}

      {/* Chat Sessions */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-1 p-2">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => onRoomSelect(room)}
              className={cn(
                "p-3 rounded-lg cursor-pointer transition-colors group",
                currentRoom?.id === room.id 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                  : "hover:bg-sidebar-accent text-sidebar-foreground"
              )}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="h-4 w-4 mt-1 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {room.name}
                    </h3>
                    <p className="text-xs opacity-50 mt-1">
                      {formatTime(room.created_at)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground text-center">
            <p>AI Web Scraper v2.0</p>
            <p className="mt-1">Professional Data Extraction</p>
          </div>
        </div>
      )}
    </div>
  );
};