import { describe, expect, it } from "vitest";
import {
  DEFAULT_HEATMAP_COUNT,
  seededHeatmap,
} from "./mock-heatmap";

describe("seededHeatmap", () => {
  it("is deterministic for the same seed", () => {
    const a = seededHeatmap(0xc0ffee, 50);
    const b = seededHeatmap(0xc0ffee, 50);
    expect(a).toEqual(b);
  });

  it("produces different sequences for different seeds", () => {
    const a = seededHeatmap(1, 50);
    const b = seededHeatmap(2, 50);
    expect(a).not.toEqual(b);
  });

  it("returns exactly `count` levels", () => {
    expect(seededHeatmap(0xc0ffee, 0).length).toBe(0);
    expect(seededHeatmap(0xc0ffee, 7).length).toBe(7);
    expect(seededHeatmap().length).toBe(DEFAULT_HEATMAP_COUNT);
  });

  it("every level is an integer in [0, 4]", () => {
    const out = seededHeatmap(0xc0ffee, 200);
    for (const v of out) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(4);
      expect(Number.isInteger(v)).toBe(true);
    }
  });
});
