"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LogOut } from "lucide-react";

import { sidebarItems } from "@/constants/sidebar";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
<aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-border bg-sidebar">      <div className="border-b border-border p-8">
        <h1 className="text-3xl font-bold">CareerOS</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          AI Career Operating System
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                <span>{item.label}</span>
              </div>

              {active && <ChevronRight size={18} />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-6">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="truncate font-semibold">
            {user?.email ?? "Guest User"}
          </p>

          <p className="text-sm text-muted-foreground">Free Plan</p>

          <button
            onClick={signOut}
            className="mt-3 flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}