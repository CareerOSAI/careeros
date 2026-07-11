/**
 * constants/skills.ts
 *
 * Skill-uri și categorii de skill-uri folosite pentru evaluare
 * generală (nu doar tehnologii concrete din technologies.ts).
 *
 * Diferența față de constants/technologies.ts:
 * - technologies.ts   -> tech stack concret (React, Docker, PostgreSQL)
 * - skills.ts          -> categorii mai largi de competențe, folosite de
 *                         RoadmapSkill.category, skill-gap.ts și
 *                         Career Coach AI (inclusiv soft skills)
 */

/**
 * Categoriile de skill-uri folosite în roadmap și în analiza
 * skill gap-ului, la un nivel mai general decât tehnologiile concrete.
 */
export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "cloud"
  | "architecture"
  | "testing"
  | "ai_ml"
  | "soft_skills"
  | "leadership"
  | "communication"
  | "other";

export interface SkillCategoryDefinition {
  id: SkillCategory;
  label: string;
  description: string;
}

/**
 * Definițiile categoriilor, folosite pentru afișare organizată
 * în UI (RoadmapSkill grouping, SkillGapCard).
 */
export const SKILL_CATEGORIES: SkillCategoryDefinition[] = [
  { id: "frontend", label: "Frontend", description: "UI development, client-side logic" },
  { id: "backend", label: "Backend", description: "Server-side logic, APIs" },
  { id: "database", label: "Database", description: "Data modeling, querying, optimization" },
  { id: "devops", label: "DevOps", description: "CI/CD, infrastructure automation" },
  { id: "cloud", label: "Cloud", description: "Cloud platforms and services" },
  { id: "architecture", label: "Architecture", description: "System design, scalability" },
  { id: "testing", label: "Testing", description: "Quality assurance, automated testing" },
  { id: "ai_ml", label: "AI / ML", description: "Machine learning, AI integrations" },
  { id: "soft_skills", label: "Soft Skills", description: "Communication, collaboration, adaptability" },
  { id: "leadership", label: "Leadership", description: "Mentoring, decision-making, ownership" },
  { id: "communication", label: "Communication", description: "Written and verbal communication" },
  { id: "other", label: "Other", description: "Uncategorized skills" },
];

/**
 * Soft skills predefinite — folosite ca opțiuni sugerate în
 * CV Builder și Career Coach AI (ex: pentru CareerProfile.strengths).
 *
 * TODO: extinsă pe măsură ce apar nevoi noi în UI.
 */
export const SOFT_SKILLS: string[] = [
  "Communication",
  "Teamwork",
  "Problem Solving",
  "Critical Thinking",
  "Time Management",
  "Adaptability",
  "Leadership",
  "Mentoring",
  "Ownership",
  "Conflict Resolution",
  "Stakeholder Management",
  "Public Speaking",
];

/**
 * Map rapid id -> definiție categorie, pentru lookup eficient
 * în componente (RoadmapSkill grouping, SkillGapCard).
 */
export const SKILL_CATEGORY_BY_ID: Record<SkillCategory, SkillCategoryDefinition> =
  SKILL_CATEGORIES.reduce((acc, category) => {
    acc[category.id] = category;
    return acc;
  }, {} as Record<SkillCategory, SkillCategoryDefinition>);