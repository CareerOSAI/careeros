type Props = {
  value: string;
  onChange: (value: string) => void;
  companies: string[];
};

export default function CompanyFilter({
  value,
  onChange,
  companies,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        rounded-2xl
        border
        border-border
        bg-card
        px-5
        py-3
      "
    >
      <option value="All">All Companies</option>
      {companies.map((company) => (
        <option key={company} value={company}>
          {company}
        </option>
      ))}
    </select>
  );
}