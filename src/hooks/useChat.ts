import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ChatRoom {
  id: string;
  name: string;
  created_at: string;
  user_id: string;
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
  room_id: string;
  user_id: string;
}

export const useChat = (userId: string | undefined) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load chat rooms
  const loadChatRooms = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChatRooms(data || []);
    } catch (error) {
      console.error('Error loading chat rooms:', error);
      toast({
        title: "Error",
        description: "Failed to load chat history",
        variant: "destructive"
      });
    }
  };

  // Load messages for a room
  const loadMessages = async (roomId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []).map(msg => ({
        ...msg,
        role: msg.role as 'user' | 'assistant'
      })));
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Create new chat room
  const createNewChat = async () => {
    if (!userId) return null;

    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .insert({
          user_id: userId,
          name: 'New Chat'
        })
        .select()
        .single();

      if (error) throw error;
      
      await loadChatRooms(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Error creating chat room:', error);
      toast({
        title: "Error",
        description: "Failed to create new chat",
        variant: "destructive"
      });
      return null;
    }
  };

  // Send message
  const sendMessage = async (content: string, roomId: string) => {
    if (!userId || !content.trim()) return;

    try {
      // Add user message
      const { data: userMessage, error: userError } = await supabase
        .from('messages')
        .insert({
          room_id: roomId,
          user_id: userId,
          content: content.trim(),
          role: 'user'
        })
        .select()
        .single();

      if (userError) throw userError;

      // Update local state immediately
      setMessages(prev => [...prev, {
        ...userMessage,
        role: userMessage.role as 'user' | 'assistant'
      }]);

      // Simulate AI response (replace with actual AI integration later)
      setTimeout(async () => {
        const aiResponse = "I'll help you with that web scraping request. Let me analyze the information you need and extract the data accordingly.";
        
        const { data: aiMessage, error: aiError } = await supabase
          .from('messages')
          .insert({
            room_id: roomId,
            user_id: userId,
            content: aiResponse,
            role: 'assistant'
          })
          .select()
          .single();

        if (aiError) {
          console.error('Error sending AI message:', aiError);
          return;
        }

        setMessages(prev => [...prev, {
          ...aiMessage,
          role: aiMessage.role as 'user' | 'assistant'
        }]);

        // Update room name based on first message
        if (content.trim()) {
          const roomName = content.length > 50 ? content.substring(0, 50) + '...' : content;
          await supabase
            .from('chat_rooms')
            .update({ name: roomName })
            .eq('id', roomId);
          
          await loadChatRooms(); // Refresh to show updated name
        }
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    }
  };

  // Switch to a different chat room
  const switchToRoom = async (room: ChatRoom) => {
    setCurrentRoom(room);
    await loadMessages(room.id);
  };

  useEffect(() => {
    if (userId) {
      loadChatRooms();
    }
  }, [userId]);

  return {
    chatRooms,
    currentRoom,
    messages,
    loading,
    loadChatRooms,
    createNewChat,
    sendMessage,
    switchToRoom,
  };
};