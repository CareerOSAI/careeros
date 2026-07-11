import { ReactNode } from "react";

type Props = {
  title: string;
  value: number;
  icon: ReactNode;
};

export default function StatsCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 transition hover:border-primary/40">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {value}
          </h2>

        </div>

        <div className="rounded-2xl bg-primary/10 p-4">
          {icon}
        </div>

      </div>

    </div>
  );
}