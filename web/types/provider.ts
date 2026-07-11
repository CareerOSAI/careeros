/**
 * types/provider.ts
 *
 * Contractul pentru providerii de joburi din services/jobs/providers/.
 * Lucrează cu SearchedJob (types/jobSearch.ts) — rezultatele din
 * Job Search, NU Job Tracker.
 */

import type { SearchedJob, JobSource } from "@/types/jobSearch";

export interface ProviderConfig {
  id: JobSource;
  displayName: string;
  requiresApiKey: boolean;
  apiKeyEnvVar?: string;
  baseUrl: string;
  enabledByDefault: boolean;
  rateLimitPerMinute?: number;
}

export interface ProviderSearchParams {
  query?: string;
  location?: string;
  remoteOnly?: boolean;
  technologies?: string[];
  page?: number;
  pageSize?: number;
}

export interface ProviderFetchResult {
  source: JobSource;
  success: boolean;
  jobs: SearchedJob[];
  error?: string;
  raw?: unknown;
}

export interface JobProvider {
  config: ProviderConfig;
  search: (params: ProviderSearchParams) => Promise<ProviderFetchResult>;
  healthCheck?: () => Promise<boolean>;
}

export interface RegisteredProvider {
  provider: JobProvider;
  isEnabled: boolean;
}

export interface ProviderRegistry {
  registerProvider: (provider: JobProvider) => void;
  getProviders: () => RegisteredProvider[];
  getEnabledProviders: () => JobProvider[];
  enableProvider: (id: JobSource) => void;
  disableProvider: (id: JobSource) => void;
  getProvider: (id: JobSource) => JobProvider | undefined;
}

export interface AggregatedProviderResults {
  allJobs: SearchedJob[];
  succeededSources: JobSource[];
  failedSources: { source: JobSource; error: string }[];
}