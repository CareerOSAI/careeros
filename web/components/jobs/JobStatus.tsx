type Props = {
  status:
    | "Wishlist"
    | "Applied"
    | "Interview"
    | "Offer"
    | "Rejected";
};

export default function JobStatus({
  status,
}: Props) {
  const styles = {
    Wishlist:
      "bg-slate-500/15 text-slate-300 border-slate-500/30",

    Applied:
      "bg-blue-500/15 text-blue-400 border-blue-500/30",

    Interview:
      "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",

    Offer:
      "bg-green-500/15 text-green-400 border-green-500/30",

    Rejected:
      "bg-red-500/15 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={`
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-semibold
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}