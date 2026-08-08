import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

import ThemeToggle from "@/components/theme/ThemeToggle";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/dashboard": "Dashboard",
    "/projects": "Projects",
    "/tasks": "Tasks",
    "/sprint": "Sprint",
    "/teammanagement": "Team Management",
    "/users": "Users",
    "/reports": "Reports",
    "/settings": "Settings",
  };

  const title = pageTitles[location.pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:px-6 lg:px-8">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile Menu */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="shrink-0 rounded-xl lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-foreground sm:text-xl md:text-2xl lg:text-3xl">
            {title}
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="hidden flex-1 px-4 md:block">
        <div className="relative mx-auto max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search..."
            className="rounded-full border-border bg-card pl-11 shadow-sm"
          />
        </div>
      </div>

      {/* Right */}
      <div className="ml-2 flex shrink-0 items-center gap-2">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-card shadow-sm"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-foreground" />
        </Button>

        {/* User */}
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 shadow-sm md:px-3 md:py-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://i.pravatar.cc/100?img=12" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-foreground">Alex Meian</p>

            <p className="text-xs text-muted-foreground">Product Manager</p>
          </div>

          <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
        </div>
      </div>
    </header>
  );
}
