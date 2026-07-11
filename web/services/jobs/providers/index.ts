/**
 * services/jobs/providers/index.ts
 *
 * Provider Registry — punctul central unde se înregistrează toți
 * providerii de joburi disponibili.
 *
 * PENTRU A ADĂUGA UN PROVIDER NOU (ex: Adzuna):
 * 1. Creează services/jobs/providers/adzuna.ts, cu o funcție
 *    fetchAdzuna(query: string): Promise<SearchedJob[]>
 * 2. Importă acea funcție mai jos.
 * 3. Adaug-o în array-ul ALL_PROVIDERS.
 * Nimic altceva (Search Engine, route.ts) nu trebuie modificat.
 */

import type { SearchedJob } from "@/types/jobSearch";
import { fetchArbeitnow } from "./arbeitnow";
import { fetchRemotive } from "./remotive";

/**
 * Un provider e, la acest nivel, pur și simplu o funcție care
 * primește un query și întoarce o listă de SearchedJob.
 * Simplu și suficient pentru nevoile actuale — dacă mai târziu
 * apare nevoia de config per-provider (API keys, rate limits),
 * extindem la un obiect { id, config, search }.
 */
export type ProviderSearchFn = (query: string) => Promise<SearchedJob[]>;

export interface RegisteredProvider {
  id: string;
  displayName: string;
  search: ProviderSearchFn;
  enabled: boolean;
}

/**
 * Lista tuturor providerilor disponibili. Adaugă aici orice
 * provider nou creat conform instrucțiunilor de mai sus.
 */
export const ALL_PROVIDERS: RegisteredProvider[] = [
  {
    id: "arbeitnow",
    displayName: "Arbeitnow",
    search: fetchArbeitnow,
    enabled: true,
  },
  {
    id: "remotive",
    displayName: "Remotive",
    search: fetchRemotive,
    enabled: true,
  },
];

/**
 * Întoarce doar providerii activi — folosit de Search Engine pentru
 * a decide pe cine să apeleze.
 */
export function getEnabledProviders(): RegisteredProvider[] {
  return ALL_PROVIDERS.filter((p) => p.enabled);
}

/**
 * Activează/dezactivează un provider după id.
 * TODO: persistare a stării (momentan doar in-memory, se resetează
 * la fiecare restart al serverului).
 */
export function setProviderEnabled(id: string, enabled: boolean): void {
  const provider = ALL_PROVIDERS.find((p) => p.id === id);
  if (provider) provider.enabled = enabled;
}