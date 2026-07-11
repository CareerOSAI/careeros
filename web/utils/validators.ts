/**
 * utils/validators.ts
 *
 * Validatori generici, folosiți de:
 * - services/jobs/mapping (validarea unui Job după mapare, înainte
 *   de a-l accepta în rezultatul final)
 * - services/jobs/normalizers (validare câmpuri individuale)
 * - features/cv/builder (validare formulare CV)
 */

/**
 * Validează un URL. Folosit pentru applyUrl, website, avatarUrl etc.
 */
export function isValidUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validează o adresă de email simplă (suficient pentru formulare,
 * nu pentru verificare exhaustivă RFC 5322).
 */
export function isValidEmail(value: string | null | undefined): boolean {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Validează un cod de monedă ISO 4217 (3 litere mari).
 * Folosit de normalizers/ înainte de a accepta `currency` de la
 * un provider extern.
 */
export function isValidCurrencyCode(value: string | null | undefined): boolean {
  if (!value) return false;
  return /^[A-Z]{3}$/.test(value);
}

/**
 * Validează un cod de țară ISO 3166-1 alpha-2 (2 litere mari).
 */
export function isValidCountryCode(value: string | null | undefined): boolean {
  if (!value) return false;
  return /^[A-Z]{2}$/.test(value);
}

/**
 * Validează un interval numeric de salariu (min <= max, dacă ambele
 * sunt prezente, și ambele pozitive dacă există).
 * Folosit de mapper înainte de a construi JobSalary.
 */
export function isValidSalaryRange(
  min: number | null,
  max: number | null
): boolean {
  if (min !== null && min < 0) return false;
  if (max !== null && max < 0) return false;
  if (min !== null && max !== null && min > max) return false;
  return true;
}

/**
 * Validează o dată ISO — folosit pentru publishedAt/expiresAt
 * primite de la provideri, care uneori trimit date malformate.
 */
export function isValidIsoDate(value: string | null | undefined): boolean {
  if (!value) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Verifică dacă un Job mapat are câmpurile minime obligatorii
 * valide (title, applyUrl, company.name). Folosit de mapper ca
 * ultim filtru înainte de a accepta jobul în rezultatul final —
 * evită afișarea unor joburi incomplete/corupte din surse externe.
 */
export function hasRequiredJobFields(job: {
  title?: string | null;
  applyUrl?: string | null;
  companyName?: string | null;
}): boolean {
  return (
    !!job.title &&
    job.title.trim().length > 0 &&
    isValidUrl(job.applyUrl) &&
    !!job.companyName &&
    job.companyName.trim().length > 0
  );
}