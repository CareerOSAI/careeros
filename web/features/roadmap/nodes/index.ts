/**
 * features/roadmap/nodes/index.ts
 *
 * Reprezentarea vizuală a nodurilor din roadmap — fiecare
 * RoadmapItem existent (types/roadmap.ts, neatins) devine un nod
 * pe o hartă/traseu vizual.
 *
 * TODO: componentă RoadmapNode (icon, title, status, progress bar)
 * care consumă RoadmapItem existent, + RoadmapCanvas care le
 * aranjează într-un traseu (linear sau ramificat).
 */

export type { RoadmapItem, Lesson } from "@/types/roadmap";

// TODO: <RoadmapNode item={RoadmapItem} onClick={...} />
// TODO: <RoadmapCanvas items={RoadmapItem[]} />