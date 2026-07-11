"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LogOut, Mail, Shield } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const supabase = createClient();

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password updated successfully!");
    setNewPassword("");
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account preferences.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Mail size={18} className="text-primary" />
          <h2 className="text-lg font-semibold">Account</h2>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">Email</p>
        <p className="font-medium">{user?.email}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-primary" />
          <h2 className="text-lg font-semibold">Change Password</h2>
        </div>

        <div className="mt-4 flex gap-3">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password (min. 6 characters)"
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3"
          />
          <button
            onClick={handlePasswordChange}
            disabled={loading}
            className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
        <h2 className="text-lg font-semibold text-red-500">Danger Zone</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign out of your account on this device.
        </p>
        <button
          onClick={signOut}
          className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 px-5 py-3 text-sm font-medium text-red-500 transition hover:bg-red-500/10"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </div>
  );
}