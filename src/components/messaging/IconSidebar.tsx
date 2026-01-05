import { Home, MessageCircle, Link, FileText, CheckSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconSidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "messages", icon: MessageCircle, label: "Messages" },
  { id: "links", icon: Link, label: "Links" },
  { id: "files", icon: FileText, label: "Files" },
  { id: "tasks", icon: CheckSquare, label: "Tasks" },
];

export function IconSidebar({ activeItem, onItemClick }: IconSidebarProps) {
  return (
    <div className="flex h-full w-16 flex-col items-center border-r border-border bg-card py-4">
      {/* Logo */}
      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary">
        <div className="h-5 w-5 rounded-full border-2 border-primary-foreground" />
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-1 flex-col items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200",
                isActive
                  ? "bg-accent text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              title={item.label}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto flex flex-col items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Sparkles className="h-5 w-5" />
        </button>
        
        {/* User Avatar */}
        <div className="h-9 w-9 overflow-hidden rounded-full">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
            alt="User"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
