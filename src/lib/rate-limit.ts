export type RateLimitState = Map<string, number[]>;

export type RateLimitConfig = {
  limit: number;
  windowMs: number;
};

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterMs: number };

export function checkRateLimit(
  state: RateLimitState,
  key: string,
  now: number,
  config: RateLimitConfig
): RateLimitResult {
  const history = state.get(key) ?? [];
  const cutoff = now - config.windowMs;
  const fresh: number[] = [];
  for (const t of history) {
    if (t > cutoff) fresh.push(t);
  }

  if (fresh.length >= config.limit) {
    state.set(key, fresh);
    const oldest = fresh[0];
    const retryAfterMs = Math.max(1, oldest + config.windowMs - now);
    return { allowed: false, retryAfterMs };
  }

  fresh.push(now);
  state.set(key, fresh);
  return { allowed: true };
}
