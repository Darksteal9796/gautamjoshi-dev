import { beforeEach, describe, expect, it } from "vitest";
import {
  checkRateLimit,
  type RateLimitConfig,
  type RateLimitState,
} from "./rate-limit";

const CONFIG: RateLimitConfig = { limit: 10, windowMs: 5 * 60 * 1000 };

describe("checkRateLimit", () => {
  let state: RateLimitState;

  beforeEach(() => {
    state = new Map();
  });

  it("allows the first request", () => {
    const result = checkRateLimit(state, "1.1.1.1", 0, CONFIG);
    expect(result.allowed).toBe(true);
  });

  it("allows up to `limit` requests inside the window", () => {
    for (let i = 0; i < CONFIG.limit; i++) {
      const result = checkRateLimit(state, "1.1.1.1", i * 1000, CONFIG);
      expect(result.allowed).toBe(true);
    }
  });

  it("blocks the (limit+1)th request inside the window", () => {
    for (let i = 0; i < CONFIG.limit; i++) {
      checkRateLimit(state, "1.1.1.1", i * 1000, CONFIG);
    }
    const result = checkRateLimit(
      state,
      "1.1.1.1",
      CONFIG.limit * 1000,
      CONFIG
    );
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.retryAfterMs).toBeGreaterThan(0);
    }
  });

  it("allows again after the window expires", () => {
    for (let i = 0; i < CONFIG.limit; i++) {
      checkRateLimit(state, "1.1.1.1", i * 1000, CONFIG);
    }
    const laterResult = checkRateLimit(
      state,
      "1.1.1.1",
      CONFIG.windowMs + 10_000,
      CONFIG
    );
    expect(laterResult.allowed).toBe(true);
  });

  it("tracks separate IPs independently", () => {
    for (let i = 0; i < CONFIG.limit; i++) {
      checkRateLimit(state, "1.1.1.1", i * 1000, CONFIG);
    }
    const freshIp = checkRateLimit(state, "2.2.2.2", 100, CONFIG);
    expect(freshIp.allowed).toBe(true);
  });

  it("prunes stale timestamps from memory", () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit(state, "1.1.1.1", i * 1000, CONFIG);
    }
    // Trigger prune by calling at a much later time
    checkRateLimit(state, "1.1.1.1", CONFIG.windowMs + 60_000, CONFIG);
    const history = state.get("1.1.1.1") ?? [];
    expect(history.length).toBe(1); // only the latest call survives
  });

  it("returns an approximate retry-after within the window bounds", () => {
    for (let i = 0; i < CONFIG.limit; i++) {
      checkRateLimit(state, "1.1.1.1", 0, CONFIG);
    }
    const blocked = checkRateLimit(state, "1.1.1.1", 1000, CONFIG);
    expect(blocked.allowed).toBe(false);
    if (!blocked.allowed) {
      expect(blocked.retryAfterMs).toBeLessThanOrEqual(CONFIG.windowMs);
    }
  });
});
