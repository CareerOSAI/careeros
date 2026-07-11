/**
 * types/user.ts
 *
 * Tipuri complementare pentru entitatea User — NU înlocuiesc și
 * NU modifică AuthContext-ul existent. Sunt tipuri de domeniu,
 * folosite de servicii (career.ts, interview.ts, roadmap.ts etc.)
 * ori de câte ori e nevoie de un `userId` sau de un profil extins.
 *
 * Dacă AuthContext are deja propriul tip de User (ex: din auth
 * provider), acest fișier NU îl duplică — oferă doar tipurile de
 * domeniu suplimentare, necesare altor module.
 */

// ────────────────────────────────────────────────────────────
// Preferințe utilizator
// ────────────────────────────────────────────────────────────

export type ThemePreference = "light" | "dark" | "system";

/**
 * Preferințe generale ale userului, folosite de Settings și de
 * personalizarea Search Engine-ului / Ranking-ului.
 */
export interface UserPreferences {
  theme: ThemePreference;
  preferredCurrency: string; // ISO 4217, ex: "EUR"
  preferredLocations: string[];
  remoteOnly: boolean;
  emailNotificationsEnabled: boolean;
  weeklyReportEnabled: boolean;
}

// ────────────────────────────────────────────────────────────
// Profil extins (domeniu, nu auth)
// ────────────────────────────────────────────────────────────

/**
 * Profilul de domeniu al userului — folosit de module precum
 * CareerContext, RoadmapContext, Ranking Engine (favoriteCompanyScore),
 * fără să depindă de structura internă a AuthContext.
 *
 * `id` trebuie să corespundă cu identificatorul folosit de AuthContext,
 * astfel încât cele două să rămână sincronizate prin acel câmp.
 */
export interface UserProfile {
  id: string;
  displayName: string | null;
  email: string;
  avatarUrl: string | null;
  preferences: UserPreferences;
  createdAt: string; // ISO date
}

// ────────────────────────────────────────────────────────────
// Statistici agregate ale userului (Dashboard)
// ────────────────────────────────────────────────────────────

/**
 * Statistici agregate folosite de features/dashboard/stats
 * și features/dashboard/widgets.
 */
export interface UserStats {
  totalJobsSaved: number;
  totalJobsApplied: number;
  totalInterviews: number;
  roadmapCompletionPercent: number;
  averageMatchScore: number | null;
  lastActiveAt: string | null; // ISO date
}