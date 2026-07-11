type Props = {
  value: string;
  onChange: (value: string) => void;
  locations: string[];
};

export default function LocationFilter({
  value,
  onChange,
  locations,
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
      <option value="All">All Locations</option>
      {locations.map((location) => (
        <option key={location} value={location}>
          {location}
        </option>
      ))}
    </select>
  );
}