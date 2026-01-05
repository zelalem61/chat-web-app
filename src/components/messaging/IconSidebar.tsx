import chat from "@/assets/ChatCircle.png";
import compass from "@/assets/Compass.png";
import folder from "@/assets/Folder.png";
import home from "@/assets/House.png";
import image from "@/assets/ImagesSquare.png";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface IconSidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const navItems = [
  { id: "home", icon: home, label: "Home" },
  { id: "messages", icon: chat, label: "Messages" },
  { id: "compass", icon: compass, label: "Compass" },
  { id: "folder", icon: folder, label: "Folder" },
  { id: "image", icon: image, label: "Image" },
];

export function IconSidebar({ activeItem, onItemClick }: IconSidebarProps) {
  return (
    <div className="flex h-[1024px] w-[76px] flex-col items-center justify-between border-r border-border bg-card pt-6 pr-4 pb-6 pl-4">
      {/* Top section */}
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <div className="h-5 w-5 rounded-full border-2 border-primary-foreground" />
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col items-center gap-2">
          {navItems.map((item) => {
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
                <img src={item.icon} alt={item.label} className="h-5 w-5" />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-4">
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
