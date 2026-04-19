import { describe, expect, it } from "vitest";
import {
  canSpendTokens,
  initialBudget,
  recordTokens,
  utcDateKey,
} from "./token-budget";

const DAY_MS = 24 * 60 * 60 * 1000;

describe("utcDateKey", () => {
  it("returns YYYY-MM-DD for UTC midnight", () => {
    expect(utcDateKey(Date.UTC(2026, 3, 19, 0, 0, 0))).toBe("2026-04-19");
  });

  it("returns the same date within a day", () => {
    const a = utcDateKey(Date.UTC(2026, 3, 19, 3, 0));
    const b = utcDateKey(Date.UTC(2026, 3, 19, 22, 0));
    expect(a).toBe(b);
  });

  it("advances across a UTC midnight boundary", () => {
    const a = utcDateKey(Date.UTC(2026, 3, 19, 23, 59));
    const b = utcDateKey(Date.UTC(2026, 3, 20, 0, 1));
    expect(a).not.toBe(b);
  });
});

describe("canSpendTokens", () => {
  const now = Date.UTC(2026, 3, 19, 12);

  it("returns true when used is below cap", () => {
    const state = { dateKey: utcDateKey(now), used: 1000 };
    expect(canSpendTokens(state, now, 500_000)).toBe(true);
  });

  it("returns false when used has met the cap", () => {
    const state = { dateKey: utcDateKey(now), used: 500_000 };
    expect(canSpendTokens(state, now, 500_000)).toBe(false);
  });

  it("resets the cap on a new UTC day", () => {
    const yesterday = { dateKey: "2026-04-18", used: 500_000 };
    expect(canSpendTokens(yesterday, now, 500_000)).toBe(true);
  });

  it("treats a non-positive cap as disabled", () => {
    const state = { dateKey: utcDateKey(now), used: 9_999_999 };
    expect(canSpendTokens(state, now, 0)).toBe(true);
  });
});

describe("recordTokens", () => {
  const now = Date.UTC(2026, 3, 19, 12);

  it("adds to same-day used count", () => {
    const next = recordTokens({ dateKey: utcDateKey(now), used: 1000 }, now, 250);
    expect(next.used).toBe(1250);
  });

  it("resets used on new UTC day", () => {
    const yesterday = { dateKey: "2026-04-18", used: 480_000 };
    const next = recordTokens(yesterday, now, 200);
    expect(next).toEqual({ dateKey: "2026-04-19", used: 200 });
  });

  it("clamps negative token deltas to zero", () => {
    const next = recordTokens({ dateKey: utcDateKey(now), used: 100 }, now, -50);
    expect(next.used).toBe(100);
  });

  it("initial budget starts empty and allows spending", () => {
    const state = initialBudget();
    expect(canSpendTokens(state, now, 500_000)).toBe(true);
    const next = recordTokens(state, now, 42);
    expect(next.used).toBe(42);
  });

  it("survives a full day-rollover cycle", () => {
    let state = initialBudget();
    state = recordTokens(state, now, 100);
    expect(state.used).toBe(100);
    state = recordTokens(state, now + DAY_MS, 50);
    expect(state.used).toBe(50);
  });
});
