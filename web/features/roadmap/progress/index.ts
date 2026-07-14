/**
 * features/roadmap/progress/index.ts
 *
 * Calculul și afișarea progresului agregat pe roadmap, folosind
 * RoadmapProgress (types/roadmap.ts, deja definit).
 *
 * TODO: buildRoadmapProgress(items: RoadmapItem[]): RoadmapProgress
 * — funcție determinstă, similară cu getJobStats din utils/jobStats.ts,
 * care numără completed/inProgress/locked din RoadmapItem[].
 */

export type { RoadmapProgress } from "@/types/roadmap";

// TODO: buildRoadmapProgress(items: RoadmapItem[]): RoadmapProgress
// TODO: <RoadmapProgressBar progress={RoadmapProgress} />