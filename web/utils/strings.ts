/**
 * utils/strings.ts
 *
 * Utilitare generice pentru manipulare de string-uri, folosite de:
 * - services/jobs/mapping (generare id-uri, curățare titluri/descrieri)
 * - services/jobs/normalizers (normalizare text înainte de comparații)
 * - componente UI (JobCard, JobOverview) pentru trunchiere text
 */

/**
 * Transformă un string într-un slug normalizat, folosit ex. la
 * generarea Job.id (`${source}_${slug}`) sau la id-uri de tehnologii.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimină diacritice
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Normalizează un string pentru comparații (folosit intens de
 * services/jobs/duplicates și de TECHNOLOGY_ALIAS_MAP lookup):
 * lowercase, fără spații multiple, fără spații la capete.
 */
export function normalizeForComparison(value: string): string {
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Trunchiază un text la un număr maxim de caractere, adăugând "…"
 * dacă a fost trunchiat. Folosit în JobCard pentru descrieri lungi.
 */
export function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}…`;
}

/**
 * Elimină tag-uri HTML dintr-un string. Util pentru descrieri de job
 * care vin ca HTML de la unii provideri (ex: Greenhouse, Lever).
 */
export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

/**
 * Capitalizează prima literă a unui string. Folosit pentru afișare
 * consistentă a unor valori normalizate (ex: employment type brut).
 */
export function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Verifică dacă un string e null/undefined/gol (după trim).
 * Util în mapper și normalizers pentru validare rapidă a câmpurilor
 * primite de la provideri externi.
 */
export function isBlank(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0;
}