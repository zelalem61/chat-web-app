import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  email?: string;
}

interface NewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export function NewMessageModal({
  isOpen,
  onClose,
  contacts,
  onSelectContact,
}: NewMessageModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (contact: Contact) => {
    onSelectContact(contact);
    onClose();
    setSearchQuery("");
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div 
        className="absolute w-[273px] max-h-[440px] flex flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-lg pointer-events-auto p-3"
        style={{
          left: 'calc(76px + (400px - 273px) / 2)',
          top: 'calc(64px + 120px)',
        }}
      >
        {/* Header */}
        <div className="pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">New Message</h2>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="py-3">
          <div className="relative">
            <Search className="absolute left-[10px] top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-[249px] rounded-[10px] border border-border bg-secondary py-[10px] pr-1 pl-[34px] text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              autoFocus
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin -mx-3">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => handleSelect(contact)}
              className="flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-secondary/70 cursor-pointer"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">{contact.name}</span>
            </button>
          ))}

          {filteredContacts.length === 0 && searchQuery && (
            <div className="px-3 py-12 text-center text-sm text-muted-foreground">
              No contacts found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
