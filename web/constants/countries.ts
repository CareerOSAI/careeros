/**
 * constants/countries.ts
 *
 * Lista de țări suportate, folosită de JobFilters (filtrare după
 * locație/țară) și de normalizers/ (normalizarea câmpului `country`
 * primit de la providerii externi, care raportează țara în formate
 * diferite — nume complet, cod ISO2, etc.).
 */

/**
 * Reprezentarea unei țări în aplicație.
 */
export interface Country {
  code: string; // ISO 3166-1 alpha-2, ex: "RO", "DE", "US"
  name: string;
}

/**
 * Listă de bază, suficientă pentru piețele principale vizate inițial
 * de CareerOS (Europa + remote-friendly hubs globale).
 *
 * TODO: extinsă după nevoie / posibil migrată la o listă completă
 * ISO 3166 dacă devine necesar suport global complet.
 */
export const COUNTRIES: Country[] = [
  { code: "RO", name: "Romania" },
  { code: "DE", name: "Germany" },
  { code: "NL", name: "Netherlands" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "PT", name: "Portugal" },
  { code: "PL", name: "Poland" },
  { code: "GB", name: "United Kingdom" },
  { code: "IE", name: "Ireland" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "CZ", name: "Czech Republic" },
  { code: "HU", name: "Hungary" },
  { code: "GR", name: "Greece" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
];

/**
 * Map rapid cod -> nume, util în normalizers/ și în UI (JobCompany,
 * JobOverview) fără a itera lista de fiecare dată.
 */
export const COUNTRY_NAME_BY_CODE: Record<string, string> = COUNTRIES.reduce(
  (acc, country) => {
    acc[country.code] = country.name;
    return acc;
  },
  {} as Record<string, string>
);