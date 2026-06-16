type RateBucket = {
  requests: number;
  windowStart: number;
};

const buckets = new Map<string, RateBucket>();

export function isRateLimited(key: string, maxRequests = 10, windowMs = 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart > windowMs) {
    buckets.set(key, { requests: 1, windowStart: now });
    return false;
  }

  bucket.requests += 1;
  return bucket.requests > maxRequests;
}

export function resetRateLimit(key: string) {
  buckets.delete(key);
}
