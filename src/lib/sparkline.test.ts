import { describe, expect, it } from "vitest";
import { sparklinePoints } from "./sparkline";

describe("sparklinePoints", () => {
  it("evenly spaces x-coords across the given width", () => {
    expect(sparklinePoints([0, 1, 2, 3], 30)).toBe("0,0 10,1 20,2 30,3");
  });

  it("produces 8 evenly spaced x-coords for an 8-point polyline at width 70", () => {
    const pts = sparklinePoints([1, 2, 3, 4, 5, 6, 7, 8], 70);
    expect(pts.split(" ").length).toBe(8);
    const xs = pts.split(" ").map((s) => Number(s.split(",")[0]));
    expect(xs[0]).toBe(0);
    expect(xs[7]).toBe(70);
    expect(xs[1]).toBeCloseTo(10);
  });

  it("handles a single point by anchoring at x=0", () => {
    expect(sparklinePoints([5], 70)).toBe("0,5");
  });

  it("returns empty string for empty input", () => {
    expect(sparklinePoints([], 70)).toBe("");
  });

  it("handles non-integer widths", () => {
    const pts = sparklinePoints([0, 0, 0], 5);
    expect(pts).toBe("0,0 2.5,0 5,0");
  });
});
