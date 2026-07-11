export function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;

    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

export function save<T>(key: string, value: T) {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(value));
}