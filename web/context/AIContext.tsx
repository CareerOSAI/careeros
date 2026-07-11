"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type AIResultEntry<T = unknown> = {
  data: T;
  generatedAt: string;
};

type AIContextType = {
  results: Record<string, AIResultEntry>;
  getResult: <T = unknown>(key: string) => AIResultEntry<T> | undefined;
  setResult: <T = unknown>(key: string, data: T) => void;
  clearResult: (key: string) => void;
  isLoading: (key: string) => boolean;
  setLoading: (key: string, value: boolean) => void;
};

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<Record<string, AIResultEntry>>({});
  const [loadingKeys, setLoadingKeys] = useState<Record<string, boolean>>({});

  const getResult = <T,>(key: string) => {
    return results[key] as AIResultEntry<T> | undefined;
  };

  const setResult = <T,>(key: string, data: T) => {
    setResults((prev) => ({
      ...prev,
      [key]: { data, generatedAt: new Date().toISOString() },
    }));
  };

  const clearResult = (key: string) => {
    setResults((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const isLoading = (key: string) => Boolean(loadingKeys[key]);

  const setLoading = (key: string, value: boolean) => {
    setLoadingKeys((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AIContext.Provider
      value={{ results, getResult, setResult, clearResult, isLoading, setLoading }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAI must be used inside AIProvider");
  }
  return context;
}