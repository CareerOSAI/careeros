import { BriefcaseBusiness } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center">
      <BriefcaseBusiness className="mx-auto h-14 w-14 text-muted-foreground" />

      <h2 className="mt-6 text-2xl font-bold">
        No jobs yet
      </h2>

      <p className="mt-2 text-muted-foreground">
        Add your first application to start tracking your career.
      </p>
    </div>
  );
}