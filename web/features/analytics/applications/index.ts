/**
 * features/analytics/applications/index.ts
 *
 * Statistici despre aplicările userului în timp, folosind
 * ApplicationStats (types/analytics.ts) — extinde utils/jobStats.ts
 * existent cu o dimensiune temporală (timeline), pe care
 * getJobStats() nu o oferă.
 *
 * TODO: buildApplicationStats(jobs: Job[], period: AnalyticsPeriod):
 * ApplicationStats — folosește Job.createdAt pentru a construi
 * timeline-ul cerut de ApplicationStats.
 */

export type { ApplicationStats, AnalyticsPeriod } from "@/types/analytics";

// TODO: buildApplicationStats(jobs: Job[], period: AnalyticsPeriod): ApplicationStats