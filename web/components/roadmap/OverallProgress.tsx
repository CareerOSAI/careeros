import ProgressBar from "@/components/dashboard/ProgressBar";

type Lesson = {
  id: number;
  title: string;
  completed: boolean;
};

type RoadmapItem = {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: string;
  icon: string;
  lessons: Lesson[];
};

type Props = {
  roadmap: RoadmapItem[];
};

export default function OverallProgress({ roadmap }: Props) {
  const total = roadmap.reduce((sum, item) => sum + item.progress, 0);
  const average = Math.round(total / roadmap.length);

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Overall Progress</h2>
          <p className="text-muted-foreground">
            Your complete learning progress
          </p>
        </div>

        <span className="text-3xl font-bold">
          {average}%
        </span>
      </div>

      <div className="mt-6">
        <ProgressBar value={average} />
      </div>
    </div>
  );
}