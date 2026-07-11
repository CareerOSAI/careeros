/**
 * services/jobs/normalizers/location.ts
 *
 * Normalizează câmpurile de locație/țară primite de la un provider
 * extern. Providerii raportează locația în formate foarte diferite:
 * doar oraș ("Berlin"), oraș + țară ("Berlin, Germany"), doar cod
 * de țară ("DE"), sau text ambiguu ("Remote - Europe").
 *
 * Folosit de fiecare mapper din services/jobs/mapping/ pentru a
 * construi ProviderJob.location și ProviderJob.country.
 */

import { COUNTRIES, COUNTRY_NAME_BY_CODE } from "@/constants/countries";
import { isValidCountryCode } from "@/utils/validators";
import { normalizeForComparison } from "@/utils/strings";

export interface NormalizedLocation {
  location: string | null;
  country: string | null; // cod ISO 3166-1 alpha-2, ex: "DE"
}

/**
 * Map rapid nume-de-țară (normalizat) -> cod ISO2, construit din
 * COUNTRIES, pentru a recunoaște nume complete de țară în text liber
 * (ex: "Germany" -> "DE").
 */
const COUNTRY_CODE_BY_NAME: Record<string, string> = COUNTRIES.reduce(
  (acc, country) => {
    acc[normalizeForComparison(country.name)] = country.code;
    return acc;
  },
  {} as Record<string, string>
);

/**
 * Încearcă să identifice un cod de țară ISO2 dintr-un fragment de
 * text (fie cod direct, fie nume complet de țară).
 */
function detectCountryCode(fragment: string): string | null {
  const trimmed = fragment.trim();

  // Cod ISO2 direct, ex: "DE"
  const upper = trimmed.toUpperCase();
  if (isValidCountryCode(upper) && COUNTRY_NAME_BY_CODE[upper]) {
    return upper;
  }

  // Nume complet de țară, ex: "Germany"
  const normalized = normalizeForComparison(trimmed);
  return COUNTRY_CODE_BY_NAME[normalized] ?? null;
}

/**
 * Input generic pentru normalizarea locației — diferă de la provider
 * la provider, deci acceptăm fie un text liber unic, fie câmpuri deja
 * separate (city/country), în funcție de ce oferă API-ul extern.
 */
export interface RawLocationInput {
  /** Text liber complet, ex: "Berlin, Germany" sau "Remote - Europe" */
  freeText?: string | null;
  /** Câmp separat de oraș, dacă providerul îl oferă direct */
  city?: string | null;
  /** Câmp separat de țară (nume sau cod), dacă providerul îl oferă direct */
  countryRaw?: string | null;
}

/**
 * Normalizează datele de locație într-un { location, country } curat.
 *
 * Prioritate: câmpuri separate (city/countryRaw) > parsare din text liber.
 */
export function normalizeLocation(input: RawLocationInput): NormalizedLocation {
  // Cazul cu câmpuri deja separate de provider (ex: Adzuna, Greenhouse)
  if (input.city || input.countryRaw) {
    const countryCode = input.countryRaw ? detectCountryCode(input.countryRaw) : null;

    return {
      location: input.city?.trim() || null,
      country: countryCode,
    };
  }

  // Cazul cu text liber unic (ex: Arbeitnow, Remotive)
  if (input.freeText) {
    const text = input.freeText.trim();

    if (text.length === 0) {
      return { location: null, country: null };
    }

    // Text de tip "Remote" fără altă informație
    if (/^remote$/i.test(text)) {
      return { location: "Remote", country: null };
    }

    // Format tipic "City, Country" sau "City, XX"
    const parts = text.split(",").map((p) => p.trim());
    if (parts.length >= 2) {
      const lastPart = parts[parts.length - 1];
      const countryCode = detectCountryCode(lastPart);

      return {
        location: parts.slice(0, -1).join(", "),
        country: countryCode,
      };
    }

    // Un singur fragment — încercăm să vedem dacă E chiar o țară
    const asCountryCode = detectCountryCode(text);
    if (asCountryCode) {
      return { location: text, country: asCountryCode };
    }

    // Fallback: tratăm tot textul ca location, fără țară detectată
    return { location: text, country: null };
  }

  return { location: null, country: null };
}