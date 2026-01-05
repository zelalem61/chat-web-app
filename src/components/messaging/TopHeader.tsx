import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, ChevronDown, MessageCircle, Settings } from "lucide-react";

interface TopHeaderProps {
  userAvatar?: string;
  userName?: string;
}

export function TopHeader({ userAvatar, userName = "User" }: TopHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Left - Title */}
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-lg font-medium text-foreground">Message</h1>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="flex items-center w-[476px] gap-4">
          {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> */}
          <Input
            placeholder="Search"
            className="h-10 w-full rounded-lg border-border bg-secondary pl-9 pr-16 text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
          />
          {/* <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
            <span className="rounded border border-border bg-background px-1.5 py-0.5 font-medium">⌘</span>
            <span className="text-muted-foreground">+</span>
            <span className="rounded border border-border bg-background px-1.5 py-0.5 font-medium">K</span>
          </div> */}
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          className="h-10 gap-2 rounded-full pl-2 pr-3 hover:bg-secondary"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={userAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"} 
              alt={userName} 
            />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
}
