/**
 * features/dashboard/recent-activity/index.ts
 *
 * Feed de activitate recentă pe Dashboard — probabil se bazează pe
 * ActivityContext existent (neatins), nu pe un serviciu nou.
 *
 * TODO: componentă RecentActivityFeed care consumă ActivityContext
 * și afișează ultimele N evenimente (job adăugat, status schimbat,
 * notă adăugată etc.).
 */

export interface RecentActivityItem {
  id: string;
  message: string;
  timestamp: string;
}

// TODO: <RecentActivityFeed limit={5} />