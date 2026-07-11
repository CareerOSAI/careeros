type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search company or position..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full
        rounded-2xl
        border
        border-border
        bg-card
        px-5
        py-3
        outline-none
        transition
        focus:border-primary
      "
    />
  );
}