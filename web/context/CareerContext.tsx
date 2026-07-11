"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type CareerGoal = {
  targetRole: string;
  targetSeniority: "Junior" | "Mid" | "Senior" | "Lead" | "";
  preferredCountries: string[];
  remotePreference: "Remote" | "Hybrid" | "On-site" | "Any";
  targetSalary: string;
};

type CareerContextType = {
  goal: CareerGoal;
  loading: boolean;
  updateGoal: (partial: Partial<CareerGoal>) => void;
  resetGoal: () => void;
};

const STORAGE_KEY = "careeros_career_goal";

const DEFAULT_GOAL: CareerGoal = {
  targetRole: "",
  targetSeniority: "",
  preferredCountries: [],
  remotePreference: "Any",
  targetSalary: "",
};

const CareerContext = createContext<CareerContextType | undefined>(
  undefined
);

export function CareerProvider({ children }: { children: ReactNode }) {
  const [goal, setGoal] = useState<CareerGoal>(DEFAULT_GOAL);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setGoal(JSON.parse(stored));
      } catch {
        setGoal(DEFAULT_GOAL);
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goal));
  }, [goal, loading]);

  const updateGoal = (partial: Partial<CareerGoal>) => {
    setGoal((prev) => ({ ...prev, ...partial }));
  };

  const resetGoal = () => {
    setGoal(DEFAULT_GOAL);
  };

  return (
    <CareerContext.Provider value={{ goal, loading, updateGoal, resetGoal }}>
      {children}
    </CareerContext.Provider>
  );
}

export function useCareer() {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error("useCareer must be used inside CareerProvider");
  }
  return context;
}