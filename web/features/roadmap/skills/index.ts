/**
 * features/roadmap/skills/index.ts
 *
 * Afișarea skill-urilor urmărite prin roadmap, folosind RoadmapSkill
 * (types/roadmap.ts) și constants/skills.ts (SKILL_CATEGORIES).
 *
 * TODO: componentă SkillsGrid care grupează RoadmapSkill[] pe
 * SkillCategory, afișând proficiency ca progress bar.
 */

export type { RoadmapSkill } from "@/types/roadmap";
export { SKILL_CATEGORIES } from "@/constants/skills";

// TODO: <SkillsGrid skills={RoadmapSkill[]} />