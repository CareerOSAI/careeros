type ProgressBarProps = {
  value: number;
};

export default function ProgressBar({
  value,
}: ProgressBarProps) {
  return (
    <div className="w-full">

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">

        <div
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-blue-500
            via-cyan-400
            to-primary
            transition-all
            duration-700
            ease-out
          "
          style={{
            width: `${value}%`,
          }}
        />

      </div>

      <div className="mt-2 flex justify-between text-xs text-muted-foreground">

        <span>0%</span>

        <span className="font-semibold text-primary">
          {value}%
        </span>

        <span>100%</span>

      </div>

    </div>
  );
}