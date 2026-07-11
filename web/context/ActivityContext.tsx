"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Activity } from "@/types/activity";
import { load, save } from "@/lib/storage";

type ActivityContextType = {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
};

const ActivityContext =
  createContext<ActivityContextType | null>(null);

const STORAGE_KEY = "careeros_activity";

export function ActivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activities, setActivities] = useState<Activity[]>(() => {
    return load<Activity[]>(STORAGE_KEY, []);
  });

  useEffect(() => {
    save(STORAGE_KEY, activities);
  }, [activities]);

  function addActivity(activity: Activity) {
    setActivities((prev) => [activity, ...prev]);
  }

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error(
      "useActivity must be used inside ActivityProvider"
    );
  }

  return context;
}