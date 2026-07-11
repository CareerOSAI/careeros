/**
 * constants/technologies.ts
 *
 * Lista de tehnologii/skill-uri cunoscute de aplicație, folosită de:
 * - normalizers/ (normalizarea listei `technologies` primite de la
 *   fiecare provider, care raportează tech stack-ul în formate diferite)
 * - JobFilters / JobTechnologies (UI)
 * - services/ai/match-score.ts și skill-gap.ts (comparație skill-uri)
 * - RoadmapSkill (types/roadmap.ts)
 */

/**
 * Categoriile în care sunt grupate tehnologiile, folosite pentru
 * afișare organizată în UI (ex: JobFilters, ResumeSkillGroup).
 */
export type TechnologyCategory =
  | "language"
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "cloud"
  | "mobile"
  | "testing"
  | "ai_ml"
  | "other";

export interface Technology {
  id: string; // slug normalizat, ex: "typescript"
  label: string; // afișat în UI, ex: "TypeScript"
  category: TechnologyCategory;
  /** Alias-uri/variante întâlnite la provideri, pentru normalizare */
  aliases?: string[];
}

/**
 * Listă de bază — cele mai comune tehnologii pentru joburi de
 * dezvoltare software. Extensibilă continuu.
 *
 * TODO: extinsă / posibil migrată către o sursă externă (DB sau JSON
 * separat) dacă lista crește foarte mult.
 */
export const TECHNOLOGIES: Technology[] = [
  // Languages
  { id: "javascript", label: "JavaScript", category: "language", aliases: ["js"] },
  { id: "typescript", label: "TypeScript", category: "language", aliases: ["ts"] },
  { id: "python", label: "Python", category: "language" },
  { id: "java", label: "Java", category: "language" },
  { id: "go", label: "Go", category: "language", aliases: ["golang"] },
  { id: "rust", label: "Rust", category: "language" },
  { id: "csharp", label: "C#", category: "language", aliases: ["c#", ".net"] },
  { id: "php", label: "PHP", category: "language" },
  { id: "ruby", label: "Ruby", category: "language" },
  { id: "kotlin", label: "Kotlin", category: "language" },
  { id: "swift", label: "Swift", category: "language" },
  { id: "cpp", label: "C++", category: "language", aliases: ["c++"] },

  // Frontend
  { id: "react", label: "React", category: "frontend" },
  { id: "nextjs", label: "Next.js", category: "frontend", aliases: ["next.js", "next"] },
  { id: "vue", label: "Vue.js", category: "frontend", aliases: ["vuejs"] },
  { id: "angular", label: "Angular", category: "frontend" },
  { id: "svelte", label: "Svelte", category: "frontend" },
  { id: "tailwindcss", label: "Tailwind CSS", category: "frontend", aliases: ["tailwind"] },

  // Backend
  { id: "nodejs", label: "Node.js", category: "backend", aliases: ["node"] },
  { id: "express", label: "Express", category: "backend" },
  { id: "nestjs", label: "NestJS", category: "backend" },
  { id: "django", label: "Django", category: "backend" },
  { id: "flask", label: "Flask", category: "backend" },
  { id: "spring", label: "Spring", category: "backend", aliases: ["spring boot"] },
  { id: "laravel", label: "Laravel", category: "backend" },
  { id: "graphql", label: "GraphQL", category: "backend" },

  // Database
  { id: "postgresql", label: "PostgreSQL", category: "database", aliases: ["postgres"] },
  { id: "mysql", label: "MySQL", category: "database" },
  { id: "mongodb", label: "MongoDB", category: "database", aliases: ["mongo"] },
  { id: "redis", label: "Redis", category: "database" },
  { id: "sqlite", label: "SQLite", category: "database" },

  // DevOps / Cloud
  { id: "docker", label: "Docker", category: "devops" },
  { id: "kubernetes", label: "Kubernetes", category: "devops", aliases: ["k8s"] },
  { id: "aws", label: "AWS", category: "cloud" },
  { id: "gcp", label: "Google Cloud", category: "cloud", aliases: ["google cloud platform"] },
  { id: "azure", label: "Azure", category: "cloud" },
  { id: "terraform", label: "Terraform", category: "devops" },
  { id: "ci_cd", label: "CI/CD", category: "devops", aliases: ["ci/cd"] },

  // Mobile
  { id: "react_native", label: "React Native", category: "mobile" },
  { id: "flutter", label: "Flutter", category: "mobile" },

  // Testing
  { id: "jest", label: "Jest", category: "testing" },
  { id: "cypress", label: "Cypress", category: "testing" },
  { id: "playwright", label: "Playwright", category: "testing" },

  // AI / ML
  { id: "tensorflow", label: "TensorFlow", category: "ai_ml" },
  { id: "pytorch", label: "PyTorch", category: "ai_ml" },
  { id: "openai_api", label: "OpenAI API", category: "ai_ml" },
];

/**
 * Map rapid id -> Technology, folosit de normalizers/ pentru lookup
 * eficient la mapare.
 */
export const TECHNOLOGY_BY_ID: Record<string, Technology> = TECHNOLOGIES.reduce(
  (acc, tech) => {
    acc[tech.id] = tech;
    return acc;
  },
  {} as Record<string, Technology>
);

/**
 * Map alias (lowercase) -> id canonic, folosit de
 * normalizers/ pentru a mapa variantele primite de la provideri
 * (ex: "js", "Node", "next.js") către id-ul canonic.
 */
export const TECHNOLOGY_ALIAS_MAP: Record<string, string> = TECHNOLOGIES.reduce(
  (acc, tech) => {
    acc[tech.label.toLowerCase()] = tech.id;
    acc[tech.id.toLowerCase()] = tech.id;
    tech.aliases?.forEach((alias) => {
      acc[alias.toLowerCase()] = tech.id;
    });
    return acc;
  },
  {} as Record<string, string>
);