import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ro"] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale: Locale =
    requested === "ro" || requested === "en"
      ? requested
      : "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});