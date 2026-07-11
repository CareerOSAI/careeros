import { LucideIcon } from "lucide-react";
import ProgressBar from "./ProgressBar";

type StatsCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  progress?: number;
};

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  progress,
}: StatsCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <div className="rounded-xl bg-primary/15 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>

      <h2 className="mt-6 text-5xl font-bold tracking-tight">
        {value}
      </h2>

      <p className="mt-3 text-sm text-muted-foreground">
        {description}
      </p>

      {progress !== undefined && (
        <div className="mt-5">
          <ProgressBar value={progress} />
        </div>
      )}
    </div>
  );
}