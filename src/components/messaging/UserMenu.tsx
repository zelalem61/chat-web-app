import { ChevronLeft, Edit3, Gift, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    credits: number;
    maxCredits: number;
    usedToday: number;
    renewsIn: string;
    tomorrowCredits: number;
  };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onLogout?: () => void;
}

export function UserMenu({ user, isOpen, onOpenChange, onLogout }: UserMenuProps) {
  const creditPercentage = ((user.maxCredits - user.credits) / user.maxCredits) * 100;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 p-0 bg-card">
        <div className="flex flex-col h-full">
          {/* Header Actions */}
          <div className="p-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 rounded-xl bg-secondary hover:bg-muted"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background">
                <ChevronLeft className="h-4 w-4" />
              </div>
              <span className="font-medium">Go back to dashboard</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 rounded-xl bg-secondary hover:bg-muted"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background">
                <Edit3 className="h-4 w-4" />
              </div>
              <span className="font-medium">Rename file</span>
            </Button>
          </div>

          <Separator />

          {/* User Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>

            {/* Credits Card */}
            <div className="mt-4 rounded-xl bg-secondary p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs text-muted-foreground">Credits</p>
                  <p className="text-xl font-semibold text-foreground">{user.credits} left</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Renews in</p>
                  <p className="text-xl font-semibold text-foreground">{user.renewsIn}</p>
                </div>
              </div>

              <Progress 
                value={creditPercentage} 
                className="h-2 bg-muted"
              />

              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {user.usedToday} of {user.maxCredits} used today
                </span>
                <span className="text-primary font-medium">+{user.tomorrowCredits} tomorrow</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Menu Items */}
          <div className="p-4 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 rounded-xl hover:bg-secondary"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                <Gift className="h-4 w-4" />
              </div>
              <span className="font-medium">Win free credits</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 rounded-xl hover:bg-secondary"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                <Sun className="h-4 w-4" />
              </div>
              <span className="font-medium">Theme Style</span>
            </Button>
          </div>

          <Separator />

          {/* Logout */}
          <div className="p-4 mt-auto">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 rounded-xl hover:bg-secondary"
              onClick={onLogout}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                <LogOut className="h-4 w-4" />
              </div>
              <span className="font-medium">Log out</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
