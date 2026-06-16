const memoryCache = new Map<string, { value: unknown; expiresAt: number }>();

export async function cacheGet<T>(key: string): Promise<T | null> {
  const entry = memoryCache.get(key);
  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }

  return entry.value as T;
}

export async function cacheSet<T>(key: string, value: T, ttlSeconds = 300) {
  memoryCache.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
}
