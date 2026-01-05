import { useState } from "react";
import { X, Phone, Video, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface MediaItem {
  id: string;
  type: "image" | "link" | "doc";
  thumbnail?: string;
  title?: string;
  description?: string;
  icon?: string;
  url?: string;
  size?: string;
  pages?: number;
  month?: string;
}

interface ContactInfoPanelProps {
  contact: {
    name: string;
    email: string;
    avatar: string;
  };
  media: MediaItem[];
  onClose: () => void;
}

export function ContactInfoPanel({ contact, media, onClose }: ContactInfoPanelProps) {
  const [activeTab, setActiveTab] = useState("media");

  const mediaItems = media.filter((item) => item.type === "image");
  const linkItems = media.filter((item) => item.type === "link");
  const docItems = media.filter((item) => item.type === "doc");

  // Group items by month
  const groupByMonth = (items: MediaItem[]) => {
    return items.reduce((groups, item) => {
      const month = item.month || "May";
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(item);
      return groups;
    }, {} as Record<string, MediaItem[]>);
  };

  return (
    <div className="flex h-full w-80 flex-col border-l border-border bg-card animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">Contact Info</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center px-6 py-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback className="text-2xl">{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="mt-3 text-lg font-semibold text-foreground">{contact.name}</h3>
        <p className="text-sm text-muted-foreground">{contact.email}</p>
      </div>

      {/* Call Buttons */}
      <div className="flex gap-3 px-6 pb-4">
        <Button
          variant="outline"
          className="flex-1 h-11 gap-2 rounded-lg border-border text-foreground hover:bg-secondary"
        >
          <Phone className="h-4 w-4" />
          Audio
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-11 gap-2 rounded-lg border-border text-foreground hover:bg-secondary"
        >
          <Video className="h-4 w-4" />
          Video
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="mx-6 h-10 w-auto bg-secondary p-1 rounded-lg grid grid-cols-3">
          <TabsTrigger 
            value="media" 
            className="rounded-md text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            Media
          </TabsTrigger>
          <TabsTrigger 
            value="link"
            className="rounded-md text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            Link
          </TabsTrigger>
          <TabsTrigger 
            value="docs"
            className="rounded-md text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            Docs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="media" className="flex-1 overflow-y-auto scrollbar-thin mt-4 px-6">
          {Object.entries(groupByMonth(mediaItems)).map(([month, items]) => (
            <div key={month} className="mb-4">
              <h4 className="mb-3 text-sm font-medium text-muted-foreground">{month}</h4>
              <div className="grid grid-cols-4 gap-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="link" className="flex-1 overflow-y-auto scrollbar-thin mt-4 px-6">
          <div className="space-y-3">
            {linkItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary transition-colors"
              >
                <div className="h-10 w-10 shrink-0 rounded-lg bg-secondary overflow-hidden">
                  {item.icon ? (
                    <img src={item.icon} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      🔗
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{item.url}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="docs" className="flex-1 overflow-y-auto scrollbar-thin mt-4 px-6">
          <div className="space-y-2">
            {docItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg p-3 hover:bg-secondary transition-colors cursor-pointer"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <div className={cn(
                    "flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold",
                    item.title?.endsWith('.pdf') ? "bg-red-500 text-white" :
                    item.title?.endsWith('.fig') ? "bg-purple-500 text-white" :
                    item.title?.endsWith('.ai') ? "bg-orange-500 text-white" :
                    "bg-blue-500 text-white"
                  )}>
                    {item.title?.endsWith('.pdf') ? 'PDF' :
                     item.title?.endsWith('.fig') ? 'FIG' :
                     item.title?.endsWith('.ai') ? 'AI' : 'DOC'}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.pages && `${item.pages} pages • `}{item.size} • {item.title?.split('.').pop()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
