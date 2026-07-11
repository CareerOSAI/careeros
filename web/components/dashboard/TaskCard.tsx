type Props = {
  title: string;
  completed: boolean;
};

export default function TaskCard({
  title,
  completed,
}: Props) {
  return (
    <div
      className="
        flex items-center justify-between
        rounded-xl
        border border-border
        bg-card
        p-5
        hover:bg-accent/40
        transition-all
      "
    >
      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {completed ? "Completed" : "In Progress"}
        </p>
      </div>

      <div
        className={`h-3 w-3 rounded-full ${
          completed ? "bg-green-500" : "bg-zinc-500"
        }`}
      />
    </div>
  );
}