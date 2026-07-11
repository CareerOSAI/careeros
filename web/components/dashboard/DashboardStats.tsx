"use client";

import { Job } from "@/types/job";
import { getJobStats } from "@/utils/jobStats";

type Props = {
  jobs: Job[];
};

export default function DashboardStats({ jobs }: Props) {
  const stats = getJobStats(jobs);

  const cards = [
    { label: "Total", value: stats.total },
    { label: "Wishlist", value: stats.wishlist },
    { label: "Applied", value: stats.applied },
    { label: "Interview", value: stats.interview },
    { label: "Offer", value: stats.offer },
    { label: "Rejected", value: stats.rejected },
    { label: "Conversion %", value: stats.conversionRate + "%" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="p-4 rounded-xl border border-border bg-card"
        >
          <p className="text-xs opacity-70">{c.label}</p>
          <p className="text-xl font-semibold">{c.value}</p>
        </div>
      ))}
    </div>
  );
}