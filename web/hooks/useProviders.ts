"use client";

/**
 * hooks/useProviders.ts
 *
 * Hook pentru vizualizarea și controlul providerilor de joburi
 * (Arbeitnow, Remotive, și cei viitori — Adzuna, Greenhouse etc.).
 *
 * Folosit pentru un eventual ecran de Settings unde userul poate
 * activa/dezactiva provideri individuali.
 *
 * NOTĂ: setProviderEnabled din services/jobs/providers/index.ts
 * modifică starea in-memory pe server — acest hook e util pentru
 * a AFIȘA starea curentă, dar activarea/dezactivarea reală necesită
 * un API route dedicat (TODO — nu există încă unul), pentru că
 * providers/index.ts rulează server-side, nu poate fi importat
 * direct într-un client component.
 */

import { useState, useCallback } from "react";

export interface ProviderInfo {
  id: string;
  displayName: string;
  enabled: boolean;
}

interface UseProvidersResult {
  providers: ProviderInfo[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  toggleProvider: (id: string, enabled: boolean) => Promise<void>;
}

/**
 * TODO: necesită un API route (ex: app/api/providers/route.ts) care
 * expune GET (listă provideri + stare) și POST (toggle enabled),
 * apelând getEnabledProviders() / setProviderEnabled() server-side.
 * Acest hook e pregătit să consume acel endpoint odată creat.
 */
export default function useProviders(): UseProvidersResult {
  const [providers, setProviders] = useState<ProviderInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/providers");
      if (!res.ok) throw new Error("Failed to load providers");
      const data = await res.json();
      setProviders(data.providers ?? []);
    } catch {
      setError("Could not load providers.");
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleProvider = useCallback(async (id: string, enabled: boolean) => {
    try {
      await fetch("/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, enabled }),
      });

      setProviders((prev) =>
        prev.map((p) => (p.id === id ? { ...p, enabled } : p))
      );
    } catch {
      setError("Could not update provider.");
    }
  }, []);

  return { providers, loading, error, refresh, toggleProvider };
}