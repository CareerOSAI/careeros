"use client";

import { Bell, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  const initial = user?.email?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur-md">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          placeholder="Search..."
          className="h-11 w-full rounded-xl border border-border bg-card pl-11 pr-4 outline-none transition focus:border-primary"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-accent">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            {initial}
          </div>

          <div>
            <p className="max-w-[140px] truncate text-sm font-semibold">
              {user?.email ?? "Guest"}
            </p>
            <p className="text-xs text-muted-foreground">Free Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
}