/**
 * utils/salary.ts
 *
 * Utilitare pentru parsarea, normalizarea și compararea salariilor
 * primite de la provideri externi în formate diferite.
 *
 * Lucrează cu SearchedJobSalary (types/jobSearch.ts) — folosit de
 * rezultatele din Job Search, NU de Job Tracker (care ține salariul
 * ca simplu string).
 */

import type { SearchedJobSalary } from "@/types/jobSearch";
import { DEFAULT_CURRENCY } from "@/constants/currencies";
import { isValidSalaryRange, isValidCurrencyCode } from "./validators";

const WORK_HOURS_PER_YEAR = 2080;
const WORK_DAYS_PER_YEAR = 260;
const WORK_MONTHS_PER_YEAR = 12;

export function buildSalaryRange(params: {
  min?: number | null;
  max?: number | null;
  currency?: string | null;
  period?: SearchedJobSalary["period"];
  isEstimated?: boolean;
}): SearchedJobSalary {
  const min = params.min ?? null;
  const max = params.max ?? null;

  const validRange = isValidSalaryRange(min, max);

  const currency =
    params.currency && isValidCurrencyCode(params.currency.toUpperCase())
      ? params.currency.toUpperCase()
      : min !== null || max !== null
      ? DEFAULT_CURRENCY
      : null;

  return {
    min: validRange ? min : null,
    max: validRange ? max : null,
    currency,
    period: params.period ?? "unknown",
    isEstimated: params.isEstimated ?? false,
  };
}

export interface NormalizedAnnualSalary {
  minAnnual: number | null;
  maxAnnual: number | null;
  currency: string | null;
}

export function normalizeToAnnual(salary: SearchedJobSalary): NormalizedAnnualSalary {
  const multiplier = getAnnualMultiplier(salary.period);

  return {
    minAnnual: salary.min !== null ? Math.round(salary.min * multiplier) : null,
    maxAnnual: salary.max !== null ? Math.round(salary.max * multiplier) : null,
    currency: salary.currency,
  };
}

function getAnnualMultiplier(period: SearchedJobSalary["period"]): number {
  switch (period) {
    case "hour":
      return WORK_HOURS_PER_YEAR;
    case "day":
      return WORK_DAYS_PER_YEAR;
    case "month":
      return WORK_MONTHS_PER_YEAR;
    case "year":
      return 1;
    case "unknown":
    default:
      return 1;
  }
}

export function formatSalaryRange(salary: SearchedJobSalary): string {
  if (salary.min === null && salary.max === null) return "Not disclosed";

  const currency = salary.currency ?? DEFAULT_CURRENCY;
  const periodLabel = formatPeriodLabel(salary.period);

  const format = (value: number) =>
    `${currency} ${value.toLocaleString("en-US")}`;

  if (salary.min !== null && salary.max !== null) {
    return `${format(salary.min)} - ${format(salary.max)}${periodLabel}`;
  }

  const single = salary.min ?? salary.max;
  return `${format(single as number)}${periodLabel}`;
}

function formatPeriodLabel(period: SearchedJobSalary["period"]): string {
  switch (period) {
    case "hour":
      return " / hour";
    case "day":
      return " / day";
    case "month":
      return " / month";
    case "year":
      return " / year";
    default:
      return "";
  }
}

export function meetsMinimumAnnualSalary(
  salary: SearchedJobSalary,
  minimumAnnual: number
): boolean {
  const normalized = normalizeToAnnual(salary);
  if (normalized.maxAnnual !== null) return normalized.maxAnnual >= minimumAnnual;
  if (normalized.minAnnual !== null) return normalized.minAnnual >= minimumAnnual;
  return false;
}