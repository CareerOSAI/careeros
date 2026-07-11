"use client";

import { Job } from "@/types/job";
import { getJobStats } from "@/utils/jobStats";

type Props = {
  jobs: Job[];
};

export default function JobStats({ jobs }: Props) {
  const stats = getJobStats(jobs);

  const cards = [
    { label: "Total", value: stats.total },
    { label: "Wishlist", value: stats.wishlist },
    { label: "Applied", value: stats.applied },
    { label: "Interview", value: stats.interview },
    { label: "Offer", value: stats.offer },
    { label: "Rejected", value: stats.rejected },
    { label: "Conversion", value: `${stats.conversionRate}%` },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-border bg-card p-4"
        >
          <p className="text-sm text-muted-foreground">
            {card.label}
          </p>

          <p className="mt-2 text-2xl font-bold">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}