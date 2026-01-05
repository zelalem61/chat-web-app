import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Archive, CheckCheck, Edit3, Filter, MessageCircle, Search } from "lucide-react";
import { useState } from "react";

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isRead: boolean;
  isOnline?: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNewMessage: () => void;
  onArchive?: (id: string) => void;
  onMarkUnread?: (id: string) => void;
  onContactInfo?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  onNewMessage,
  onArchive,
  onMarkUnread,
  onContactInfo,
  onDelete,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [swipedId, setSwipedId] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSwipeStart = (id: string, direction: "left" | "right") => {
    setSwipedId(id);
    setSwipeDirection(direction);
  };

  const handleSwipeAction = (id: string) => {
    if (swipeDirection === "left" && onArchive) {
      onArchive(id);
    } else if (swipeDirection === "right" && onMarkUnread) {
      onMarkUnread(id);
    }
    setSwipedId(null);
    setSwipeDirection(null);
  };

  return (
    <div className="flex h-[932px] w-[400px] flex-col rounded-[24px] border-r border-border bg-card p-6 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">All Message</h1>
        <Button
          onClick={onNewMessage}
          className="h-8 w-[134px] p-2 gap-1.5 rounded-lg border border-border bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Edit3 className="h-4 w-4" />
          New Message
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-[10px] top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search in message"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-[296px] rounded-[10px] border border-border bg-secondary py-[10px] pr-[5px] pl-[34px] text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 shrink-0 rounded-[10px] border border-border p-[10px]"
        >
          <Filter className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredConversations.map((conversation) => (
          <ContextMenu key={conversation.id}>
            <ContextMenuTrigger asChild>
              <div className="relative">
                {/* Swipe Actions Background */}
                {swipedId === conversation.id && (
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center px-4",
                      swipeDirection === "left" ? "justify-end bg-swipe-archive" : "justify-start bg-swipe-unread"
                    )}
                  >
                    <div className="flex flex-col items-center text-primary-foreground">
                      {swipeDirection === "left" ? (
                        <>
                          <Archive className="h-5 w-5" />
                          <span className="text-xs font-medium">Archive</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle className="h-5 w-5" />
                          <span className="text-xs font-medium">Unread</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Conversation Item */}
                <button
                  onClick={() => onSelect(conversation.id)}
                  className={cn(
                    "relative flex w-full items-start gap-3 px-4 py-3 text-left transition-all hover:bg-secondary/70",
                    selectedId === conversation.id && "bg-accent/50",
                    swipedId === conversation.id && "translate-x-0"
                  )}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="h-11 w-11 overflow-hidden rounded-full">
                      <img
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-online" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="truncate font-medium text-foreground">
                        {conversation.name}
                      </h3>
                      <span className="ml-2 shrink-0 text-xs text-muted-foreground">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1">
                      <p className="truncate text-sm text-muted-foreground">
                        {conversation.lastMessage}
                      </p>
                      <CheckCheck className="h-4 w-4 shrink-0 text-primary" />
                    </div>
                  </div>
                </button>
              </div>
            </ContextMenuTrigger>

            <ContextMenuContent className="w-52">
              <ContextMenuItem
                onClick={() => onMarkUnread?.(conversation.id)}
                className="gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Mark as unread
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => onArchive?.(conversation.id)}
                className="gap-2"
              >
                <Archive className="h-4 w-4" />
                Archive
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger className="gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
                  </svg>
                  Mute
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem>1 hour</ContextMenuItem>
                  <ContextMenuItem>8 hours</ContextMenuItem>
                  <ContextMenuItem>1 week</ContextMenuItem>
                  <ContextMenuItem>Always</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuItem
                onClick={() => onContactInfo?.(conversation.id)}
                className="gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Contact info
              </ContextMenuItem>
              <ContextMenuItem className="gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Export chat
              </ContextMenuItem>
              <ContextMenuItem className="gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear chat
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem
                onClick={() => onDelete?.(conversation.id)}
                className="gap-2 text-destructive focus:text-destructive"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete chat
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    </div>
  );
}
