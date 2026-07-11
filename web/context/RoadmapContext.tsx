"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { roadmap as initialRoadmap } from "@/data/roadmap";

import {
  loadRoadmap,
  saveRoadmap,
} from "@/lib/roadmapStorage";

type RoadmapContextType = {
  roadmap: typeof initialRoadmap;
  setRoadmap: React.Dispatch<
    React.SetStateAction<typeof initialRoadmap>
  >;
};

const RoadmapContext =
  createContext<RoadmapContextType | null>(null);

export function RoadmapProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [roadmap, setRoadmap] =
    useState(initialRoadmap);

  useEffect(() => {
    const saved = loadRoadmap();

    if (saved) {
      setRoadmap(saved);
    }
  }, []);

  useEffect(() => {
    saveRoadmap(roadmap);
  }, [roadmap]);

  return (
    <RoadmapContext.Provider
      value={{
        roadmap,
        setRoadmap,
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
}

export function useRoadmapContext() {
  const context = useContext(RoadmapContext);

  if (!context) {
    throw new Error(
      "useRoadmapContext must be used inside RoadmapProvider"
    );
  }

  return context;
}