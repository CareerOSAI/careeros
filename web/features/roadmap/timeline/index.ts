/**
 * features/roadmap/timeline/index.ts
 *
 * Afișarea cronologică a progresului pe roadmap, folosind
 * RoadmapTimelineEvent (types/roadmap.ts).
 *
 * TODO: componentă RoadmapTimelineView, similară conceptual cu
 * JobTimeline.tsx existent, dar pentru evenimente de roadmap
 * (item completat, item început) în loc de evenimente de job.
 */

export type { RoadmapTimelineEvent } from "@/types/roadmap";

// TODO: <RoadmapTimelineView events={RoadmapTimelineEvent[]} />