"use client";

import { useActivity } from "@/context/ActivityContext";

export default function RecentActivity() {
  const { activities } = useActivity();

  return (
    <div className="rounded-3xl border border-border bg-card p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Recent Activity
      </h2>

      {activities.length === 0 && (
        <p className="text-muted-foreground">
          No activity yet.
        </p>
      )}

      <div className="space-y-4">

        {activities.map((activity) => (
          <div
            key={activity.id}
            className="rounded-xl border border-border p-4"
          >
            <p className="font-semibold">
              {activity.title}
            </p>

            <p className="text-sm text-muted-foreground">
              {activity.date}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}