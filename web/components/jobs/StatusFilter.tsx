import { JobStatus } from "@/types/job";

type Props = {
  value: JobStatus | "All";
  onChange: (value: JobStatus | "All") => void;
};

const statuses: (JobStatus | "All")[] = [
  "All",
  "Wishlist",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

export default function StatusFilter({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value as JobStatus | "All")
      }
      className="
        rounded-2xl
        border
        border-border
        bg-card
        px-5
        py-3
      "
    >
      {statuses.map((status) => (
        <option
          key={status}
          value={status}
        >
          {status}
        </option>
      ))}
    </select>
  );
}