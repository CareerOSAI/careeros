/**
 * services/jobs/cache/index.ts
 *
 * Cache simplu, in-memory, pentru rezultatele de search.
 * Evită re-fetch la provideri externi pentru același query căutat
 * recent — reduce load-ul pe API-urile externe (unele cu rate
 * limits reale, ex: Adzuna) și îmbunătățește viteza percepută.
 *
 * NOTĂ: cache in-memory se golește la fiecare restart al serverului
 * (normal pentru Next.js serverless/edge). Pentru persistență reală
 * cross-request la scară, ar trebui înlocuit cu Redis sau similar —
 * marcat ca TODO mai jos.
 */

import type { SearchedJob } from "@/types/jobSearch";

interface CacheEntry {
  jobs: SearchedJob[];
  cachedAt: number; // timestamp (ms)
}

/**
 * Durata de valabilitate a unei intrări din cache, în milisecunde.
 * 5 minute e un compromis rezonabil: destul de scurt încât
 * rezultatele să rămână "proaspete", destul de lung încât să
 * absoarbă căutări repetate rapide (ex: userul ajustează filtrele).
 */
const CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * Store in-memory. Cheia e query-ul normalizat (lowercase, trim).
 *
 * TODO: înlocuit cu Redis / KV store dacă aplicația rulează pe
 * multiple instanțe server (in-memory nu e partajat între ele).
 */
const cacheStore = new Map<string, CacheEntry>();

function buildCacheKey(query: string): string {
  return query.trim().toLowerCase() || "__empty__";
}

/**
 * Încearcă să întoarcă rezultate din cache pentru un query dat.
 * Întoarce `null` dacă nu există intrare, sau dacă a expirat.
 */
export function getCachedResults(query: string): SearchedJob[] | null {
  const key = buildCacheKey(query);
  const entry = cacheStore.get(key);

  if (!entry) return null;

  const isExpired = Date.now() - entry.cachedAt > CACHE_TTL_MS;
  if (isExpired) {
    cacheStore.delete(key);
    return null;
  }

  return entry.jobs;
}

/**
 * Salvează rezultatele unui query în cache.
 */
export function setCachedResults(query: string, jobs: SearchedJob[]): void {
  const key = buildCacheKey(query);
  cacheStore.set(key, { jobs, cachedAt: Date.now() });
}

/**
 * Golește complet cache-ul. Util pentru testare sau pentru un
 * eventual buton manual de "Refresh results" în UI.
 */
export function clearCache(): void {
  cacheStore.clear();
}

/**
 * Numărul de intrări active din cache — util pentru debugging/telemetrie.
 */
export function getCacheSize(): number {
  return cacheStore.size;
}