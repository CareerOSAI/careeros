/**
 * features/analytics/salary/index.ts
 *
 * Analiza distribuției salariale a joburilor văzute/aplicate,
 * folosind SalaryAnalyticsStats (types/analytics.ts).
 *
 * TODO: buildSalaryAnalyticsStats(jobs: Job[]): SalaryAnalyticsStats
 * — funcție determinstă care extrage salariile din Job.salary
 * (string, necesită parsare cu utils/parsers.ts) și construiește
 * distribuția pe bucket-uri.
 */

export type { SalaryAnalyticsStats } from "@/types/analytics";

// TODO: buildSalaryAnalyticsStats(jobs: Job[]): SalaryAnalyticsStats
// TODO: <SalaryDistributionChart stats={SalaryAnalyticsStats} />