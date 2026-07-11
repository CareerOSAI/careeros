/**
 * constants/employment-types.ts
 *
 * Valorile posibile pentru EmploymentType (types/job.ts), plus
 * label-uri pentru afișare în UI (JobFilters, JobCard, JobToolbar).
 */

import type { EmploymentType } from "@/types/jobSearch";

export const EMPLOYMENT_TYPES: EmploymentType[] = [
  "full_time",
  "part_time",
  "contract",
  "internship",
  "freelance",
  "temporary",
  "unknown",
];

/**
 * Label-uri prietenoase pentru afișare în UI, mapate 1:1 cu
 * EmploymentType. Folosite de JobFilters, JobCard etc.
 */
export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  internship: "Internship",
  freelance: "Freelance",
  temporary: "Temporary",
  unknown: "Unknown",
};