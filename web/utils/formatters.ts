/**
 * utils/formatters.ts
 *
 * Formatori generici pentru afișare în UI, folosiți de componentele
 * din components/job-search/ pentru rezultatele din search
 * multi-provider (SearchedJob).
 *
 * Formatarea salariului e deja acoperită separat în utils/salary.ts
 * (formatSalaryRange) — nu o duplicăm aici.
 */

import type { EmploymentType, ExperienceLevel, WorkType } from "@/types/jobSearch";
import { EMPLOYMENT_TYPE_LABELS } from "@/constants/employment-types";
import { getTechnologyLabel } from "./skills";

export function formatEmploymentType(type: EmploymentType): string {
  return EMPLOYMENT_TYPE_LABELS[type] ?? "Unknown";
}

export function formatExperienceLevel(level: ExperienceLevel): string {
  const labels: Record<ExperienceLevel, string> = {
    Junior: "Junior",
    Mid: "Mid-level",
    Senior: "Senior",
    Lead: "Lead",
    Unclear: "Unclear",
  };
  return labels[level] ?? "Unclear";
}

export function formatWorkType(workType: WorkType): string {
  const labels: Record<WorkType, string> = {
    Remote: "Remote",
    Hybrid: "Hybrid",
    "On-site": "On-site",
  };
  return labels[workType] ?? "Unknown";
}

export function formatTechnologyList(
  technologies: string[],
  maxVisible?: number
): { visible: string[]; remainingCount: number } {
  const labels = technologies.map((id) => getTechnologyLabel(id));

  if (!maxVisible || labels.length <= maxVisible) {
    return { visible: labels, remainingCount: 0 };
  }

  return {
    visible: labels.slice(0, maxVisible),
    remainingCount: labels.length - maxVisible,
  };
}

export function formatScorePercent(score: number): string {
  return `${Math.round(Math.max(0, Math.min(100, score)))}%`;
}

export function getScoreQualityLabel(
  score: number
): "excellent" | "good" | "fair" | "poor" {
  if (score >= 85) return "excellent";
  if (score >= 65) return "good";
  if (score >= 40) return "fair";
  return "poor";
}

export function formatCompanyDisplayName(name: string): string {
  return name
    .replace(/\s+(Inc\.?|Ltd\.?|LLC|GmbH|S\.?R\.?L\.?|S\.?A\.?)$/i, "")
    .trim();
}