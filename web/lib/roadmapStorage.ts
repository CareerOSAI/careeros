export const STORAGE_KEY = "careeros-roadmap";

export function loadRoadmap() {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return null;

  return JSON.parse(saved);
}

export function saveRoadmap(data: any) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}