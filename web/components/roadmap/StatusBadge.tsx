type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles = {
    Completed:
      "bg-green-500/15 text-green-500",

    "In Progress":
      "bg-blue-500/15 text-blue-500",

    Locked:
      "bg-zinc-500/15 text-zinc-400",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-sm
        font-medium
        ${styles[status as keyof typeof styles]}
      `}
    >
      {status}
    </span>
  );
}