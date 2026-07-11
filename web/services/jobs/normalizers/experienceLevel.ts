/**
 * services/jobs/normalizers/experienceLevel.ts
 *
 * Detectează ExperienceLevel (Junior/Mid/Senior/Lead/Unclear) din
 * titlul și descrierea jobului.
 *
 * Extras identic din app/api/job-search/route.ts
 * (detectExperienceLevel), fără nicio modificare de comportament.
 */

import type { ExperienceLevel } from "@/types/jobSearch";

export function detectExperienceLevel(title: string, description: string): ExperienceLevel {
  const text = `${title} ${description}`.toLowerCase();

  if (/\b(lead|principal|staff|head of)\b/.test(text)) return "Lead";
  if (/\b(senior|sr\.?)\b/.test(text)) return "Senior";
  if (/\b(mid[\s-]?level|mid[\s-]?senior)\b/.test(text)) return "Mid";
  if (/\b(junior|jr\.?|entry[\s-]?level|graduate|intern(ship)?)\b/.test(text)) return "Junior";

  return "Unclear";
}