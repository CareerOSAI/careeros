/**
 * constants/currencies.ts
 *
 * Lista de monede suportate, folosită de JobSalary (types/job.ts),
 * utils/salary.ts (normalizare/conversie) și de
 * SalaryAnalyzerCard / JobSalary component pentru afișare.
 */

/**
 * Reprezentarea unei monede în aplicație.
 */
export interface Currency {
  code: string; // ISO 4217, ex: "EUR", "USD"
  symbol: string;
  name: string;
}

/**
 * Listă de bază, suficientă pentru piețele principale vizate de
 * providerii integrați (Arbeitnow, Remotive, Adzuna etc.).
 *
 * TODO: extinsă pe măsură ce se adaugă provideri din alte regiuni.
 */
export const CURRENCIES: Currency[] = [
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "RON", symbol: "lei", name: "Romanian Leu" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  { code: "DKK", symbol: "kr", name: "Danish Krone" },
  { code: "PLN", symbol: "zł", name: "Polish Złoty" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
];

/**
 * Moneda implicită folosită atunci când un provider nu specifică
 * moneda salariului (fallback în normalizers/).
 */
export const DEFAULT_CURRENCY = "EUR";

/**
 * Map rapid cod -> simbol, util în UI (JobSalary, JobCard) pentru
 * afișare rapidă fără a itera lista de fiecare dată.
 */
export const CURRENCY_SYMBOL_BY_CODE: Record<string, string> = CURRENCIES.reduce(
  (acc, currency) => {
    acc[currency.code] = currency.symbol;
    return acc;
  },
  {} as Record<string, string>
);