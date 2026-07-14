/**
 * features/dashboard/charts/index.ts
 *
 * Grafice pentru Dashboard (ex: aplicări în timp, distribuție status).
 * Reutilizează ChartDataPoint/ChartSeries din types/analytics.ts.
 *
 * TODO: componente de grafic (folosind recharts, deja disponibil în
 * artifacts — de evaluat dacă se instalează și în proiectul real)
 * care consumă ApplicationStats.timeline din types/analytics.ts.
 */

export type { ChartDataPoint, ChartSeries } from "@/types/analytics";

// TODO: <ApplicationsOverTimeChart data={ChartSeries} />
// TODO: <StatusDistributionChart data={ChartDataPoint[]} />