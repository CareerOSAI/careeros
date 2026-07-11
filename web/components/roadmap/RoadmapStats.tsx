import ProgressBar from "@/components/dashboard/ProgressBar";

type Lesson = {
  id: number;
  title: string;
  completed: boolean;
};

type Module = {
  progress: number;
  lessons: Lesson[];
};

type Props = {
  roadmap: Module[];
};

export default function RoadmapStats({
  roadmap,
}: Props) {
  const modules = roadmap.length;

  const totalLessons = roadmap.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );

  const completedLessons = roadmap.reduce(
    (sum, module) =>
      sum +
      module.lessons.filter((lesson) => lesson.completed).length,
    0
  );

  const overallProgress = Math.round(
    roadmap.reduce((sum, module) => sum + module.progress, 0) /
      modules
  );

  return (
    <div className="rounded-3xl border border-border bg-card p-8">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Overall Progress
          </h2>

          <p className="text-muted-foreground">
            Your complete learning journey
          </p>
        </div>

        <div className="text-5xl font-bold text-primary">
          {overallProgress}%
        </div>

      </div>

      <div className="mt-6">
        <ProgressBar value={overallProgress} />
      </div>

      <div className="mt-8 grid grid-cols-4 gap-6">

        <div>
          <p className="text-3xl font-bold">
            {modules}
          </p>
          <p className="text-muted-foreground">
            Modules
          </p>
        </div>

        <div>
          <p className="text-3xl font-bold">
            {totalLessons}
          </p>
          <p className="text-muted-foreground">
            Lessons
          </p>
        </div>

        <div>
          <p className="text-3xl font-bold text-green-500">
            {completedLessons}
          </p>
          <p className="text-muted-foreground">
            Completed
          </p>
        </div>

        <div>
          <p className="text-3xl font-bold text-yellow-500">
            {totalLessons - completedLessons}
          </p>
          <p className="text-muted-foreground">
            Remaining
          </p>
        </div>

      </div>

    </div>
  );
}