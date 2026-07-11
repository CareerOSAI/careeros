/**
 * utils/skills.ts
 *
 * Utilitare pentru normalizarea și compararea listelor de
 * tehnologii/skill-uri, folosind constants/technologies.ts ca sursă
 * de adevăr pentru id-uri canonice.
 *
 * Folosit de:
 * - services/jobs/normalizers (normalizarea Job.technologies primit
 *   de la fiecare provider, care raportează tech stack-ul liber, ca text)
 * - services/ai/skill-gap.ts
 * - services/ai/match-score.ts
 * - RoadmapSkill matching (types/roadmap.ts)
 */

import {
  TECHNOLOGY_ALIAS_MAP,
  TECHNOLOGY_BY_ID,
} from "@/constants/technologies";
import { normalizeForComparison } from "./strings";

/**
 * Normalizează un singur string de tehnologie (poate veni ca alias,
 * variantă de capitalizare etc.) către id-ul canonic din
 * constants/technologies.ts.
 *
 * Dacă tehnologia nu e recunoscută, întoarce string-ul normalizat
 * ca atare (slugified), astfel încât să nu pierdem informație chiar
 * dacă nu avem încă o intrare canonică pentru ea.
 */
export function normalizeTechnology(raw: string): string {
  const key = normalizeForComparison(raw);
  const canonicalId = TECHNOLOGY_ALIAS_MAP[key];
  if (canonicalId) return canonicalId;

  // Fallback: tehnologie necunoscută în constants/technologies.ts —
  // păstrăm o versiune normalizată, fără să aruncăm eroare.
  return key.replace(/\s+/g, "_");
}

/**
 * Normalizează o listă întreagă de tehnologii primite de la un
 * provider (ex: din câmpuri libere de text) și elimină duplicatele.
 * Folosit direct de mapper-ele din services/jobs/mapping.
 */
export function normalizeTechnologyList(raw: string[]): string[] {
  const normalized = raw
    .filter((t) => t && t.trim().length > 0)
    .map((t) => normalizeTechnology(t));

  return Array.from(new Set(normalized));
}

/**
 * Întoarce label-ul de afișare (ex: "TypeScript") pentru un id
 * canonic de tehnologie. Dacă nu e cunoscut în constants/technologies.ts,
 * întoarce id-ul cu prima literă majusculă, ca fallback rezonabil.
 */
export function getTechnologyLabel(id: string): string {
  const known = TECHNOLOGY_BY_ID[id];
  if (known) return known.label;

  return id
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/**
 * Calculează procentul de suprapunere între două liste de tehnologii
 * (ex: skill-urile candidatului vs. tehnologiile cerute de un job).
 * Folosit de services/ai/match-score.ts pentru skillsMatch.
 *
 * Întoarce un număr 0-100.
 */
export function calculateTechnologyOverlap(
  candidateSkills: string[],
  jobTechnologies: string[]
): number {
  if (jobTechnologies.length === 0) return 100; // fără cerințe -> match complet

  const candidateSet = new Set(
    candidateSkills.map((s) => normalizeTechnology(s))
  );
  const jobSet = normalizeTechnologyList(jobTechnologies);

  const matched = jobSet.filter((tech) => candidateSet.has(tech));
  return Math.round((matched.length / jobSet.length) * 100);
}

/**
 * Întoarce lista de tehnologii cerute de un job care LIPSESC din
 * skill-urile candidatului. Folosit de services/ai/skill-gap.ts ca
 * input de bază înainte de a trece prin AI pentru recomandări.
 */
export function findMissingTechnologies(
  candidateSkills: string[],
  jobTechnologies: string[]
): string[] {
  const candidateSet = new Set(
    candidateSkills.map((s) => normalizeTechnology(s))
  );
  const jobSet = normalizeTechnologyList(jobTechnologies);

  return jobSet.filter((tech) => !candidateSet.has(tech));
}