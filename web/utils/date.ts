/**
 * utils/date.ts
 *
 * Utilitare pentru lucrul cu date, folosite de:
 * - services/jobs/mapping (parsare publishedAt/expiresAt din formate
 *   diferite, per provider)
 * - services/jobs/ranking (calcul freshnessScore)
 * - components/jobs/JobTimeline, JobOverview (afișare relativă)
 */

/**
 * Parsează o valoare de dată venită de la un provider extern
 * (poate fi ISO string, timestamp Unix în secunde/milisecunde, sau
 * un format necunoscut) și o normalizează la ISO string.
 *
 * Întoarce `null` dacă valoarea nu poate fi parsată — mapper-ul
 * decide cum tratează acest caz (de obicei fallback la data curentă
 * pentru publishedAt, sau null pentru expiresAt).
 */
export function parseToIsoDate(
  value: string | number | null | undefined
): string | null {
  if (value === null || value === undefined) return null;

  // Timestamp Unix (secunde) — heuristică: valori sub anul ~2286 în ms
  if (typeof value === "number") {
    const ms = value < 10_000_000_000 ? value * 1000 : value;
    const date = new Date(ms);
    return isNaN(date.getTime()) ? null : date.toISOString();
  }

  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date.toISOString();
}

/**
 * Calculează numărul de zile scurse de la o dată ISO până acum.
 * Folosit de services/jobs/ranking pentru freshnessScore.
 */
export function daysSince(isoDate: string): number {
  const then = new Date(isoDate).getTime();
  const now = Date.now();
  const diffMs = now - then;
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

/**
 * Verifică dacă o dată de expirare a trecut deja.
 * Folosit de Search Engine pentru a filtra joburile expirate
 * (dacă providerul oferă expiresAt).
 */
export function isExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt).getTime() < Date.now();
}

/**
 * Formatează o dată ISO într-un text relativ, prietenos pentru UI
 * (ex: "2 days ago", "Today", "3 weeks ago").
 * Folosit de JobCard, JobOverview, JobTimeline.
 */
export function formatRelativeDate(isoDate: string): string {
  const days = daysSince(isoDate);

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;

  const years = Math.floor(days / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

/**
 * Întoarce începutul și sfârșitul săptămânii curente (ISO), folosit
 * de services/ai/weekly-report.ts pentru WeeklyReportInput.
 */
export function getCurrentWeekRange(): { weekStart: string; weekEnd: string } {
  const now = new Date();
  const day = now.getDay(); // 0 = duminică
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return {
    weekStart: monday.toISOString(),
    weekEnd: sunday.toISOString(),
  };
}