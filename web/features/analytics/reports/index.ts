/**
 * features/analytics/reports/index.ts
 *
 * Rapoarte agregate complete, folosind AnalyticsReport
 * (types/analytics.ts) — combină applications + responseRate +
 * salary într-un singur document, cu opțiune de export.
 *
 * TODO: componentă AnalyticsReportView + funcție de export
 * (PDF/CSV), similar conceptual cu features/cv/export/.
 */

export type { AnalyticsReport, AnalyticsQueryParams } from "@/types/analytics";

// TODO: <AnalyticsReportView report={AnalyticsReport} />
// TODO: async function exportReport(report: AnalyticsReport): Promise<Blob>