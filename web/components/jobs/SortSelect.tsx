export type SortOption =
  | "newest"
  | "oldest"
  | "company-asc"
  | "company-desc"
  | "status"
  | "salary-desc"
  | "salary-asc";

type Props = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "company-asc", label: "Company (A-Z)" },
  { value: "company-desc", label: "Company (Z-A)" },
  { value: "status", label: "Status" },
  { value: "salary-desc", label: "Salary (High to Low)" },
  { value: "salary-asc", label: "Salary (Low to High)" },
];

export default function SortSelect({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="
        rounded-2xl
        border
        border-border
        bg-card
        px-5
        py-3
      "
    >
      {OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}