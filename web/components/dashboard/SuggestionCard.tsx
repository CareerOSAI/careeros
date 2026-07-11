import { LucideIcon } from "lucide-react";

type SuggestionCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function SuggestionCard({
  icon: Icon,
  title,
  description,
}: SuggestionCardProps) {
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
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-primary" />

        <h3 className="text-xl font-semibold">
          {title}
        </h3>
      </div>

      <p className="mt-6 text-muted-foreground leading-7">
        {description}
      </p>
    </div>
  );
}