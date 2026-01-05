import { useState } from "react";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 gap-0 bg-card rounded-xl overflow-hidden">
        <DialogHeader className="px-4 pt-4 pb-3">
          <DialogTitle className="text-base font-semibold">New Message</DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-lg border-border bg-secondary pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
              autoFocus
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="max-h-80 overflow-y-auto scrollbar-thin">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => handleSelect(contact)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-secondary"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">{contact.name}</span>
            </button>
          ))}

          {filteredContacts.length === 0 && searchQuery && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No contacts found
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
