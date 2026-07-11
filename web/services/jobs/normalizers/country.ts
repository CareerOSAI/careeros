/**
 * services/jobs/normalizers/country.ts
 *
 * Detectează țara dintr-o locație brută, folosind un map
 * oraș -> țară plus câteva euristici pentru remote/worldwide.
 *
 * Extras identic din app/api/job-search/route.ts
 * (CITY_TO_COUNTRY, detectCountry, isRomaniaOrRemote), fără nicio
 * modificare de comportament.
 */

const CITY_TO_COUNTRY: Record<string, string> = {
  berlin: "Germany",
  munich: "Germany",
  cologne: "Germany",
  dresden: "Germany",
  erfurt: "Germany",
  "frankfurt am main": "Germany",
  frankfurt: "Germany",
  föhren: "Germany",
  heilbronn: "Germany",
  minden: "Germany",
  mülheim: "Germany",
  stuttgart: "Germany",
  hamburg: "Germany",
  düsseldorf: "Germany",
  leipzig: "Germany",
  nuremberg: "Germany",
  bremen: "Germany",
  paris: "France",
  lyon: "France",
  amsterdam: "Netherlands",
  rotterdam: "Netherlands",
  vienna: "Austria",
  zurich: "Switzerland",
  geneva: "Switzerland",
  madrid: "Spain",
  barcelona: "Spain",
  lisbon: "Portugal",
  warsaw: "Poland",
  krakow: "Poland",
  prague: "Czech Republic",
  budapest: "Hungary",
  london: "United Kingdom",
  dublin: "Ireland",
  brussels: "Belgium",
  milan: "Italy",
  rome: "Italy",
  bucharest: "Romania",
  cluj: "Romania",
  timisoara: "Romania",
};

export function detectCountry(location: string, remote: boolean): string {
  const lower = location.toLowerCase().trim();

  if (lower.includes("romania")) return "Romania";
  if (remote && (lower === "remote" || lower.includes("worldwide") || lower.includes("anywhere"))) {
    return "Worldwide (Remote)";
  }

  const parts = location.split(",").map((p) => p.trim()).filter(Boolean);

  if (parts.length > 1) {
    return parts[parts.length - 1];
  }

  if (CITY_TO_COUNTRY[lower]) {
    return CITY_TO_COUNTRY[lower];
  }

  return remote ? "Worldwide (Remote)" : "Other";
}

export function isRomaniaOrRemote(location: string, remote: boolean): boolean {
  if (remote) return true;
  return location.toLowerCase().includes("romania");
}