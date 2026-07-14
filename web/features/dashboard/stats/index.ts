/**
 * features/dashboard/stats/index.ts
 *
 * Statistici agregate afișate pe Dashboard (ex: total joburi,
 * rata de conversie). Reutilizează utils/jobStats.ts existent ca
 * sursă de adevăr pentru calculul propriu-zis — acest modul e
 * responsabil doar de prezentarea/formatarea lor pentru widget-uri.
 *
 * TODO: componente StatCard/StatsGrid care consumă getJobStats()
 * din utils/jobStats.ts și le afișează ca grid de carduri.
 */

export interface DashboardStat {
  label: string;
  value: number | string;
  icon?: string;
  trend?: "up" | "down" | "neutral";
}

// TODO: buildDashboardStats(jobs: Job[]): DashboardStat[]