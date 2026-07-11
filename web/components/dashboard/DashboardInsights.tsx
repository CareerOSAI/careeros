"use client";

import { Job } from "@/types/job";

type Props = {
  jobs: Job[];
};

export default function DashboardInsights({ jobs }: Props) {
  const applied = jobs.filter(j => j.status === "Applied").length;
  const wishlist = jobs.filter(j => j.status === "Wishlist").length;

  return (
    <div className="p-4 rounded-xl border border-border bg-card space-y-2">
      <h2 className="font-semibold">Insights</h2>

      <p className="text-sm opacity-70">
        You have {wishlist} jobs in Wishlist and {applied} already Applied.
      </p>

      {wishlist > applied && (
        <p className="text-sm text-yellow-500">
          ⚡ Tip: You should apply more and reduce Wishlist backlog.
        </p>
      )}
    </div>
  );
}