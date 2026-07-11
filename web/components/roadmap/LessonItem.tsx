import {
  CheckCircle2,
  Circle,
  Lock,
} from "lucide-react";

type Props = {
  title: string;
  completed: boolean;
};

export default function LessonItem({
  title,
  completed,
}: Props) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-border
        bg-muted/20
        px-4
        py-3
        transition-all
        duration-300
        hover:border-primary/40
        hover:bg-primary/5
      "
    >
      <div className="flex items-center gap-3">

        {completed ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground" />
        )}

        <span
          className={
            completed
              ? "font-medium text-green-500 line-through"
              : "font-medium text-foreground"
          }
        >
          {title}
        </span>

      </div>

      {completed ? (
        <span
          className="
            rounded-full
            bg-green-500/10
            px-3
            py-1
            text-xs
            font-medium
            text-green-500
          "
        >
          Completed
        </span>
      ) : (
        <Lock className="h-4 w-4 text-muted-foreground" />
      )}

    </div>
  );
}