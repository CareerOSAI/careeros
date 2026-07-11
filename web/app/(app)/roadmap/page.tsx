import { roadmap } from "@/data/roadmap";
import OverallProgress from "@/components/roadmap/OverallProgress";
import RoadmapCard from "@/components/roadmap/RoadmapCard";
import RoadmapStats from "@/components/roadmap/RoadmapStats";
export default function RoadmapPage() {
  return (
    <main className="p-8">

      <h1 className="text-4xl font-bold">
        Learning Roadmap
      </h1>

      <p className="mt-2 text-muted-foreground">
        Track your progress and continue your learning journey.
      </p>

      <div className="mt-8">
        <RoadmapStats roadmap={roadmap} />
      </div>

      <div className="mt-8 space-y-6">

        {roadmap.map((item) => (
          <RoadmapCard
            key={item.id}
            title={item.title}
            description={item.description}
            progress={item.progress}
            status={item.status}
            icon={item.icon}
            lessons={item.lessons}
          />
        ))}

      </div>

    </main>
  );
}