/**
 * constants/providers.ts
 *
 * Configurarea statică a fiecărui provider de joburi.
 * Aceasta este sursa de adevăr pentru metadatele providerilor —
 * NU conține logică de fetch (asta e în services/jobs/providers/).
 *
 * Fiecare provider nou trebuie să-și adauge aici propria intrare
 * de tip ProviderConfig.
 */

import type { ProviderConfig } from "@/types/provider";
import type { JobSource } from "@/types/jobSearch";

export const PROVIDER_CONFIGS: Record<JobSource, ProviderConfig> = {
  arbeitnow: {
    id: "arbeitnow",
    displayName: "Arbeitnow",
    requiresApiKey: false,
    baseUrl: "https://www.arbeitnow.com/api/job-board-api",
    enabledByDefault: true,
  },

  remotive: {
    id: "remotive",
    displayName: "Remotive",
    requiresApiKey: false,
    baseUrl: "https://remotive.com/api/remote-jobs",
    enabledByDefault: true,
  },

  adzuna: {
    id: "adzuna",
    displayName: "Adzuna",
    requiresApiKey: true,
    apiKeyEnvVar: "ADZUNA_API_KEY",
    baseUrl: "https://api.adzuna.com/v1/api/jobs",
    enabledByDefault: false,
    rateLimitPerMinute: 60,
  },

  greenhouse: {
    id: "greenhouse",
    displayName: "Greenhouse",
    requiresApiKey: false,
    baseUrl: "https://boards-api.greenhouse.io/v1/boards",
    enabledByDefault: false,
  },

  lever: {
    id: "lever",
    displayName: "Lever",
    requiresApiKey: false,
    baseUrl: "https://api.lever.co/v0/postings",
    enabledByDefault: false,
  },

  fantastic: {
    id: "fantastic",
    displayName: "Fantastic Jobs",
    requiresApiKey: true,
    apiKeyEnvVar: "FANTASTIC_JOBS_API_KEY",
    baseUrl: "https://api.fantastic.jobs",
    enabledByDefault: false,
    rateLimitPerMinute: 30,
  },

  manual: {
    id: "manual",
    displayName: "Manual Jobs",
    requiresApiKey: false,
    baseUrl: "", // fără API extern — joburi introduse manual de user
    enabledByDefault: true,
  },

  linked: {
    id: "linked",
    displayName: "Linked Sources",
    requiresApiKey: false,
    baseUrl: "", // TODO: definit când se implementează provider-ul
    enabledByDefault: false,
  },

  rss: {
    id: "rss",
    displayName: "RSS Sources",
    requiresApiKey: false,
    baseUrl: "", // TODO: definit când se implementează provider-ul
    enabledByDefault: false,
  },
};

/**
 * Listă derivată, utilă pentru iterare (ex: în Settings, la afișarea
 * tuturor providerilor disponibili pentru activare/dezactivare).
 */
export const ALL_PROVIDER_IDS: JobSource[] = Object.keys(
  PROVIDER_CONFIGS
) as JobSource[];

/**
 * Providerii activați implicit la prima rulare / prima instalare.
 */
export const DEFAULT_ENABLED_PROVIDERS: JobSource[] = ALL_PROVIDER_IDS.filter(
  (id) => PROVIDER_CONFIGS[id].enabledByDefault
);