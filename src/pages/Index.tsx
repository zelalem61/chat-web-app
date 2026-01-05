import { useState } from "react";
import { IconSidebar } from "@/components/messaging/IconSidebar";
import { ConversationList, Conversation } from "@/components/messaging/ConversationList";
import { ChatView, Message } from "@/components/messaging/ChatView";
import { TopHeader } from "@/components/messaging/TopHeader";
import { ContactInfoPanel } from "@/components/messaging/ContactInfoPanel";
import { NewMessageModal } from "@/components/messaging/NewMessageModal";
import { UserMenu } from "@/components/messaging/UserMenu";

// Sample data
const sampleConversations: Conversation[] = [
  {
    id: "1",
    name: "Adrian Kurt",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Thanks for the explanation!",
    timestamp: "3 mins ago",
    isRead: true,
    isOnline: false,
  },
  {
    id: "2",
    name: "Yomi Immanuel",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Let's do a quick call after lunch, I'll explai...",
    timestamp: "12 mins ago",
    isRead: true,
    isOnline: true,
  },
  {
    id: "3",
    name: "Bianca Nubia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    lastMessage: "anytime! my pleasure~",
    timestamp: "32 mins ago",
    isRead: true,
    isOnline: false,
  },
  {
    id: "4",
    name: "Zender Lowre",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Okay cool, that make sense 👍",
    timestamp: "1 hour ago",
    isRead: true,
    isOnline: false,
  },
  {
    id: "5",
    name: "Palmer Dian",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Thanks, Jonas! That helps 😊",
    timestamp: "5 hour ago",
    isRead: true,
    isOnline: true,
  },
  {
    id: "6",
    name: "Yuki Tanaka",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Have you watch the new season of Danm...",
    timestamp: "12 hour ago",
    isRead: true,
    isOnline: false,
  },
];

const sampleContacts = [
  { id: "c1", name: "Adrian Kurt", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", email: "adrian@email.com" },
  { id: "c2", name: "Bianca Lofre", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", email: "bianca@email.com" },
  { id: "c3", name: "Diana Sayu", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", email: "diana@email.com" },
  { id: "c4", name: "Palmer Dian", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop&crop=face", email: "palmer@email.com" },
  { id: "c5", name: "Sam Kohler", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", email: "sam@email.com" },
  { id: "c6", name: "Yuki Tanaka", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", email: "yuki@email.com" },
  { id: "c7", name: "Zender Lowre", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", email: "zender@email.com" },
];

const sampleMessages: Message[] = [
  { id: "m1", content: "Hey, Jonjon", timestamp: "10:17 AM", isSent: false },
  { id: "m2", content: "Can you help with with the last task for Eventora, please?", timestamp: "10:17 AM", isSent: false },
  { id: "m3", content: "I'm little bit confused with the task.. 😅", timestamp: "10:17 AM", isSent: false },
  { id: "m4", content: "it's done already, no worries!", timestamp: "10:22 AM", isSent: true, isRead: true },
  { id: "m5", content: "what...", timestamp: "10:32 AM", isSent: false },
  { id: "m6", content: "Really?! Thank you so much! 😍", timestamp: "10:32 AM", isSent: false },
  { id: "m7", content: "anytime! my pleasure~\n🌹", timestamp: "11:01 AM", isSent: true, isRead: true },
];

const sampleMedia = [
  { id: "media1", type: "image" as const, thumbnail: "https://images.unsplash.com/photo-1557683316-973673baf926?w=200&h=200&fit=crop", month: "May" },
  { id: "media2", type: "image" as const, thumbnail: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=200&h=200&fit=crop", month: "May" },
  { id: "media3", type: "image" as const, thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop", month: "May" },
  { id: "media4", type: "image" as const, thumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=200&h=200&fit=crop", month: "May" },
  { id: "media5", type: "image" as const, thumbnail: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=200&h=200&fit=crop", month: "May" },
  { id: "media6", type: "image" as const, thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop", month: "May" },
  { id: "media7", type: "image" as const, thumbnail: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=200&h=200&fit=crop", month: "May" },
  { id: "media8", type: "image" as const, thumbnail: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=200&h=200&fit=crop", month: "April" },
  { id: "media9", type: "image" as const, thumbnail: "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=200&h=200&fit=crop", month: "April" },
  { id: "media10", type: "image" as const, thumbnail: "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=200&h=200&fit=crop", month: "April" },
  { id: "media11", type: "image" as const, thumbnail: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=200&h=200&fit=crop", month: "April" },
  { id: "link1", type: "link" as const, url: "https://basecamp.net/", description: "Discover thousands of premium UI kits, templates, and design resources tailored for designers, developers, and...", icon: "https://basecamp.com/favicon.ico" },
  { id: "link2", type: "link" as const, url: "https://notion.com/", description: "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team.", icon: "https://notion.so/favicon.ico" },
  { id: "link3", type: "link" as const, url: "https://asana.com/", description: "Work anytime, anywhere with Asana. Keep remote and distributed teams, and your entire organization, focused..." },
  { id: "link4", type: "link" as const, url: "https://trello.com/", description: "Make the impossible, possible with Trello. The ultimate teamwork project management tool. Start up board in se..." },
  { id: "doc1", type: "doc" as const, title: "Document Requirement.pdf", pages: 10, size: "16 MB", month: "May" },
  { id: "doc2", type: "doc" as const, title: "User Flow.pdf", pages: 7, size: "32 MB", month: "May" },
  { id: "doc3", type: "doc" as const, title: "Existing App.fig", size: "213 MB", month: "May" },
  { id: "doc4", type: "doc" as const, title: "Product Illustrations.ai", size: "72 MB", month: "May" },
  { id: "doc5", type: "doc" as const, title: "Quotation-Hikariworks-May.pdf", pages: 2, size: "329 KB", month: "May" },
];

const sampleUser = {
  name: "testing2",
  email: "testing2@gmail.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  credits: 20,
  maxCredits: 25,
  usedToday: 5,
  renewsIn: "6h 24m",
  tomorrowCredits: 25,
};

const Index = () => {
  const [activeNavItem, setActiveNavItem] = useState("messages");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("3");
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [conversations, setConversations] = useState(sampleConversations);
  const [messages, setMessages] = useState(sampleMessages);

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);

  const selectedContact = selectedConversation
    ? {
        id: selectedConversation.id,
        name: selectedConversation.name,
        avatar: selectedConversation.avatar,
        isOnline: selectedConversation.isOnline || false,
        email: `${selectedConversation.name.toLowerCase().replace(" ", "")}@shipz.com`,
      }
    : null;

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `m${Date.now()}`,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSent: true,
      isRead: false,
    };
    setMessages([...messages, newMessage]);
  };

  const handleArchive = (id: string) => {
    setConversations(conversations.filter((c) => c.id !== id));
  };

  const handleMarkUnread = (id: string) => {
    setConversations(
      conversations.map((c) =>
        c.id === id ? { ...c, isRead: false } : c
      )
    );
  };

  const handleSelectContact = (contact: { id: string; name: string; avatar: string }) => {
    // Check if conversation already exists
    const existingConv = conversations.find(
      (c) => c.name === contact.name
    );
    
    if (existingConv) {
      setSelectedConversationId(existingConv.id);
    } else {
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        name: contact.name,
        avatar: contact.avatar,
        lastMessage: "",
        timestamp: "Just now",
        isRead: true,
        isOnline: true,
      };
      setConversations([newConv, ...conversations]);
      setSelectedConversationId(newConv.id);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Top Header */}
      <TopHeader userAvatar={sampleUser.avatar} userName={sampleUser.name} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Icon Sidebar */}
        <IconSidebar
          activeItem={activeNavItem}
          onItemClick={setActiveNavItem}
        />

        {/* Conversation List */}
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversationId}
          onSelect={setSelectedConversationId}
          onNewMessage={() => setShowNewMessage(true)}
          onArchive={handleArchive}
          onMarkUnread={handleMarkUnread}
          onContactInfo={() => setShowContactInfo(true)}
          onDelete={handleArchive}
        />

        {/* Chat View */}
        <ChatView
          contact={selectedContact}
          messages={messages}
          onSendMessage={handleSendMessage}
          onOpenContactInfo={() => setShowContactInfo(true)}
        />

        {/* Contact Info Panel */}
        {showContactInfo && selectedContact && (
          <ContactInfoPanel
            contact={{
              name: selectedContact.name,
              email: selectedContact.email || "",
              avatar: selectedContact.avatar,
            }}
            media={sampleMedia}
            onClose={() => setShowContactInfo(false)}
          />
        )}
      </div>

      {/* New Message Modal */}
      <NewMessageModal
        isOpen={showNewMessage}
        onClose={() => setShowNewMessage(false)}
        contacts={sampleContacts}
        onSelectContact={handleSelectContact}
      />

      {/* User Menu */}
      <UserMenu
        user={sampleUser}
        isOpen={showUserMenu}
        onOpenChange={setShowUserMenu}
      />
    </div>
  );
};

export default Index;
