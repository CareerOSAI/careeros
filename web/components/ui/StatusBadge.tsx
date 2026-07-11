type Props = {
  status: string;
};

const colors = {
  Completed: "bg-green-500/20 text-green-400",
  "In Progress": "bg-yellow-500/20 text-yellow-400",
  Started: "bg-blue-500/20 text-blue-400",
  Locked: "bg-muted text-muted-foreground",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        colors[status as keyof typeof colors]
      }`}
    >
      {status}
    </span>
  );
}