import { JobPriority } from "@/types/job";

type Props = {
  value: JobPriority | "All";
  onChange: (value: JobPriority | "All") => void;
};

const priorities: (JobPriority | "All")[] = ["All", "High", "Medium", "Low"];

export default function PriorityFilter({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as JobPriority | "All")}
      className="rounded-2xl border border-border bg-card px-5 py-3"
    >
      {priorities.map((priority) => (
        <option key={priority} value={priority}>
          {priority === "All" ? "All Priorities" : `${priority} Priority`}
        </option>
      ))}
    </select>
  );
}