/**
 * features/dashboard/widgets/index.ts
 *
 * Widget-uri individuale, compacte, pentru Dashboard (diferite de
 * stats/ — acestea sunt blocuri mai complexe, nu doar un număr).
 *
 * TODO: widget-uri candidate:
 * - UpcomingInterviewsWidget (joburi cu status "Interview")
 * - FavoriteJobsWidget (jobs.filter(j => j.favorite))
 * - RoadmapProgressWidget (folosind RoadmapProgress din types/roadmap.ts)
 */

export interface DashboardWidgetProps {
  title: string;
}

// TODO: componente widget individuale, fiecare într-un fișier propriu
// când sunt implementate (ex: UpcomingInterviewsWidget.tsx)