import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Mic, MoreHorizontal, Paperclip, Phone, Search, Send, Smile, Video } from "lucide-react";
import { useState } from "react";

export interface Message {
  id: string;
  content: string;
  timestamp?: string;
  isSent: boolean;
  isRead?: boolean;
  reactions?: string[];
}

interface ChatViewProps {
  contact: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    email?: string;
  } | null;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onOpenContactInfo: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
}

export function ChatView({
  contact,
  messages,
  onSendMessage,
  onOpenContactInfo,
  onCall,
  onVideoCall,
}: ChatViewProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!contact) {
    return (
      <div className="flex h-full flex-1 items-center justify-center bg-background">
        <p className="text-muted-foreground">Select a conversation to start messaging</p>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = "Today"; // Simplified for demo
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className="flex h-full flex-1 flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-11 w-11">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {contact.isOnline && (
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-online" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{contact.name}</h2>
            <p className="text-sm text-online">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
            onClick={onCall}
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
            onClick={onVideoCall}
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
            onClick={onOpenContactInfo}
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            {/* Date Separator */}
            <div className="mb-6 flex justify-center">
              <span className="rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground">
                {date}
              </span>
            </div>

            {/* Messages */}
            <div>
              {msgs.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex message-appear",
                    message.isSent ? "justify-end" : "justify-start"
                  )}
                >
                  <div className="max-w-[65%] relative">
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm relative",
                        message.isSent
                          ? "rounded-br-sm bg-message-sent text-message-sent-foreground"
                          : "rounded-bl-sm bg-message-received text-message-received-foreground shadow-sm"
                      )}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="absolute -bottom-2 left-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs">
                          {message.reactions[0]}
                        </div>
                      )}
                    </div>
                    <div
                      className={cn(
                        "mt-1 flex items-center gap-1 text-xs text-muted-foreground",
                        message.isSent && "justify-end"
                      )}
                    >
                      <span>{message.timestamp}</span>
                      {message.isSent && (
                        <svg
                          className={cn(
                            "h-4 w-4",
                            message.isRead ? "text-primary" : "text-muted-foreground"
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Input
              placeholder="Type any message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-12 rounded-full border-border bg-secondary pl-4 pr-12 text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
            />
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
            >
              <Smile className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSend}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
