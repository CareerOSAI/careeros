type Props = {
  size?: number;
  showWordmark?: boolean;
};

export default function Logo({ size = 40, showWordmark = true }: Props) {
  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        className="text-primary"
      >
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="76 37"
          transform="rotate(-90 24 24)"
        />
        <path
          d="M22 8 L31 17"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="31" cy="17" r="3.5" fill="currentColor" />
      </svg>

      {showWordmark && (
        <span className="text-2xl font-bold tracking-tight">CareerOS</span>
      )}
    </div>
  );
}