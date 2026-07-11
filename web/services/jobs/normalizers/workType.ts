/**
 * services/jobs/normalizers/workType.ts
 *
 * Detectează WorkType (Remote/Hybrid/On-site) dintr-o locație brută,
 * descrierea jobului și un flag boolean de remote, atunci când
 * providerul îl oferă.
 *
 * Extras identic din app/api/job-search/route.ts (detectWorkType),
 * fără nicio modificare de comportament — doar mutat aici pentru
 * a fi reutilizat de orice provider nou (Adzuna, Greenhouse etc.).
 */

import type { WorkType } from "@/types/jobSearch";

export function detectWorkType(
  location: string,
  description: string,
  remoteFlag: boolean
): WorkType {
  const text = `${location} ${description}`.toLowerCase();

  if (text.includes("hybrid")) return "Hybrid";
  if (remoteFlag || text.includes("fully remote") || text.includes("100% remote")) {
    return "Remote";
  }
  return "On-site";
}