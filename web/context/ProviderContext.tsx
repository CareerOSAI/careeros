"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  ALL_PROVIDERS,
  getEnabledProviders,
  setProviderEnabled,
  RegisteredProvider,
} from "@/services/jobs/providers";

type ProviderContextType = {
  providers: RegisteredProvider[];
  enabledProviderIds: string[];
  toggleProvider: (id: string) => void;
  isEnabled: (id: string) => boolean;
};

const ProviderContext = createContext<ProviderContextType | undefined>(
  undefined
);

export function ProviderContextProvider({ children }: { children: ReactNode }) {
  const [enabledProviderIds, setEnabledProviderIds] = useState<string[]>([]);

  useEffect(() => {
    setEnabledProviderIds(getEnabledProviders().map((p) => p.id));
  }, []);

  const toggleProvider = (id: string) => {
    const currentlyEnabled = enabledProviderIds.includes(id);
    setProviderEnabled(id, !currentlyEnabled);

    setEnabledProviderIds((prev) =>
      currentlyEnabled ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const isEnabled = (id: string) => enabledProviderIds.includes(id);

  return (
    <ProviderContext.Provider
      value={{
        providers: ALL_PROVIDERS,
        enabledProviderIds,
        toggleProvider,
        isEnabled,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
}

export function useProviderContext() {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error(
      "useProviderContext must be used inside ProviderContextProvider"
    );
  }
  return context;
}