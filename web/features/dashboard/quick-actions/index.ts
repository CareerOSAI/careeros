/**
 * features/dashboard/quick-actions/index.ts
 *
 * Acțiuni rapide afișate pe Dashboard (ex: "Add Job", "Search Jobs",
 * "Update Resume") — link-uri directe către alte secțiuni ale
 * aplicației, fără logică proprie de business.
 *
 * TODO: componentă QuickActionsBar cu butoane/linkuri către
 * /jobs, /job-search, /cv-analyzer, /roadmap.
 */

export interface QuickAction {
  label: string;
  href: string;
  icon?: string;
}

// TODO: QUICK_ACTIONS: QuickAction[] — listă statică de acțiuni