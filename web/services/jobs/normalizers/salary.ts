/**
 * services/jobs/normalizers/salary.ts
 *
 * Normalizează datele de salariu primite de la un provider extern
 * într-un SearchedJobSalary (types/jobSearch.ts).
 */

import type { SearchedJobSalary } from "@/types/jobSearch";
import {
  parseSalaryFromText,
  parseCurrencyFromText,
  parseSalaryPeriodFromText,
} from "@/utils/parsers";
import { buildSalaryRange } from "@/utils/salary";

export interface RawSalaryInput {
  min?: number | null;
  max?: number | null;
  currency?: string | null;
  period?: SearchedJobSalary["period"];
  freeText?: string | null;
  isEstimated?: boolean;
}

export function normalizeSalary(input: RawSalaryInput): SearchedJobSalary {
  const hasStructuredData = input.min != null || input.max != null;

  if (hasStructuredData) {
    return buildSalaryRange({
      min: input.min ?? null,
      max: input.max ?? null,
      currency: input.currency ?? null,
      period: input.period ?? "unknown",
      isEstimated: input.isEstimated ?? false,
    });
  }

  if (input.freeText) {
    const { min, max } = parseSalaryFromText(input.freeText);
    const currency = input.currency ?? parseCurrencyFromText(input.freeText);
    const period = input.period ?? parseSalaryPeriodFromText(input.freeText);

    return buildSalaryRange({ min, max, currency, period, isEstimated: true });
  }

  return buildSalaryRange({ min: null, max: null, currency: null, period: "unknown", isEstimated: false });
}