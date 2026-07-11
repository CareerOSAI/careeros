/**
 * utils/parsers.ts
 *
 * Parsare a datelor brute, "murdare", primite direct de la API-urile
 * externe ale providerilor (Arbeitnow, Remotive, Adzuna, Greenhouse,
 * Lever etc.), înainte ca acestea să treacă prin normalizers/ și mapping.
 *
 * Diferența față de utils/salary.ts:
 * - salary.ts       -> lucrează cu date DEJA structurate (SalaryRange)
 * - parsers.ts       -> extrage date structurate din text/JSON brut,
 *                       neuniform, așa cum vine direct de la provideri
 */

/**
 * Extrage un interval de salariu dintr-un string liber, așa cum
 * apare adesea la provideri care nu oferă câmpuri separate min/max
 * (ex: "$60k - $80k", "60000-80000 EUR", "€50.000 / year").
 *
 * Întoarce { min, max } în unități brute (nu convertite), sau
 * { min: null, max: null } dacă nu poate extrage nimic util.
 * Normalizarea finală (monedă, perioadă) e responsabilitatea
 * mapper-ului specific fiecărui provider, folosind buildSalaryRange
 * din utils/salary.ts.
 */
export function parseSalaryFromText(
  text: string | null | undefined
): { min: number | null; max: number | null } {
  if (!text) return { min: null, max: null };

  // Normalizează notația "60k" -> "60000" înainte de extragere.
  const normalized = text.replace(/(\d+(?:[.,]\d+)?)\s*k\b/gi, (_, num) => {
    const value = parseFloat(num.replace(",", "."));
    return String(Math.round(value * 1000));
  });

  const numbers = normalized.match(/\d[\d.,]*\d|\d/g);
  if (!numbers || numbers.length === 0) return { min: null, max: null };

  const parsed = numbers
    .map((n) => parseFloat(n.replace(/[.,](?=\d{3}\b)/g, "").replace(",", ".")))
    .filter((n) => !isNaN(n));

  if (parsed.length === 0) return { min: null, max: null };
  if (parsed.length === 1) return { min: parsed[0], max: parsed[0] };

  return { min: Math.min(...parsed), max: Math.max(...parsed) };
}

/**
 * Extrage un cod de monedă dintr-un string liber, prin căutarea
 * simbolurilor/codurilor comune. Folosit ca fallback atunci când
 * un provider nu oferă un câmp `currency` separat.
 */
export function parseCurrencyFromText(
  text: string | null | undefined
): string | null {
  if (!text) return null;

  const symbolMap: Record<string, string> = {
    "€": "EUR",
    "$": "USD",
    "£": "GBP",
    "lei": "RON",
    "CHF": "CHF",
  };

  for (const [symbol, code] of Object.entries(symbolMap)) {
    if (text.includes(symbol)) return code;
  }

  const isoMatch = text.match(/\b[A-Z]{3}\b/);
  return isoMatch ? isoMatch[0] : null;
}

/**
 * Detectează perioada de raportare a salariului dintr-un text liber
 * (ex: "/ year", "per hour", "monthly"). Fallback la "unknown"
 * dacă nu poate determina perioada.
 */
export function parseSalaryPeriodFromText(
  text: string | null | undefined
): "hour" | "day" | "month" | "year" | "unknown" {
  if (!text) return "unknown";
  const lower = text.toLowerCase();

  if (/hour|hr\b|\/h\b/.test(lower)) return "hour";
  if (/day\b|daily/.test(lower)) return "day";
  if (/month|mo\b|monthly/.test(lower)) return "month";
  if (/year|yr\b|annual|annum/.test(lower)) return "year";

  return "unknown";
}

/**
 * Parsează o listă de tehnologii dintr-un text liber (ex: descrierea
 * unui job, care menționează tehnologii inline, fără o listă
 * structurată separată). Extrage cuvinte separate prin virgulă,
 * "/", "|", sau newline.
 *
 * Notă: aceasta e o extragere BRUTĂ — normalizarea finală (mapare
 * la id-uri canonice, eliminare duplicate) se face prin
 * normalizeTechnologyList din utils/skills.ts.
 */
export function parseTechnologyListFromText(text: string | null | undefined): string[] {
  if (!text) return [];

  return text
    .split(/[,/|\n]/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0 && t.length < 40); // filtrează fragmente absurd de lungi
}

/**
 * Parsează un boolean "murdar" primit de la un provider (ex: unii
 * trimit `"true"`/`"false"` ca string, alții `1`/`0`, alții boolean
 * nativ). Folosit de mapper-ele individuale ale providerilor.
 */
export function parseLooseBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    return ["true", "1", "yes", "remote"].includes(value.trim().toLowerCase());
  }
  return false;
}

/**
 * Parsează un RemoteType dintr-un text liber, așa cum apare adesea
 * fie ca boolean brut ("remote: true"), fie ca text descriptiv
 * ("Remote / Hybrid", "On-site only").
 */
export function parseRemoteTypeFromText(
  text: string | null | undefined | boolean
): "remote" | "hybrid" | "onsite" | "unknown" {
  if (typeof text === "boolean") return text ? "remote" : "onsite";
  if (!text) return "unknown";

  const lower = text.toLowerCase();
  if (lower.includes("hybrid")) return "hybrid";
  if (lower.includes("remote")) return "remote";
  if (lower.includes("on-site") || lower.includes("onsite") || lower.includes("office")) {
    return "onsite";
  }

  return "unknown";
}