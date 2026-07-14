/**
 * features/analytics/charts/index.ts
 *
 * Grafice generale pentru secțiunea Analytics, folosind
 * ChartDataPoint/ChartSeries (types/analytics.ts) — distinct de
 * features/dashboard/charts/, care afișează doar un subset rapid
 * pe Dashboard; acesta e ecranul complet, dedicat.
 *
 * TODO: componente de grafic reutilizabile (LineChart, BarChart)
 * care consumă ChartSeries/ChartDataPoint din types/analytics.ts.
 */

export type { ChartDataPoint, ChartSeries } from "@/types/analytics";

// TODO: <AnalyticsLineChart series={ChartSeries[]} />
// TODO: <AnalyticsBarChart data={ChartDataPoint[]} />