import { describe, expect, it } from "vitest";
import {
  easeToward,
  nodePosition,
  normalizeDeg,
  ORBIT_CX,
  ORBIT_CY,
  RING_RADII,
} from "./orbit-layout";

const near = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) < eps;

describe("nodePosition", () => {
  it("places index 0 at the top of the ring when rotation is 0", () => {
    const { x, y } = nodePosition(0, 4, 100, 0);
    expect(near(x, ORBIT_CX)).toBe(true);
    expect(near(y, ORBIT_CY - 100)).toBe(true);
  });

  it("places index 1 of 4 at the right", () => {
    const { x, y } = nodePosition(1, 4, 100, 0);
    expect(near(x, ORBIT_CX + 100)).toBe(true);
    expect(near(y, ORBIT_CY)).toBe(true);
  });

  it("places index 2 of 4 at the bottom", () => {
    const { x, y } = nodePosition(2, 4, 100, 0);
    expect(near(x, ORBIT_CX)).toBe(true);
    expect(near(y, ORBIT_CY + 100)).toBe(true);
  });

  it("rotates clockwise by 90deg → index 0 moves from top to right", () => {
    const { x, y } = nodePosition(0, 4, 100, 90);
    expect(near(x, ORBIT_CX + 100)).toBe(true);
    expect(near(y, ORBIT_CY)).toBe(true);
  });

  it("respects ring radius overrides", () => {
    const { x } = nodePosition(1, 4, RING_RADII[1], 0);
    expect(near(x, ORBIT_CX + 56)).toBe(true);
  });

  it("distributes 5 nodes evenly across 360deg", () => {
    const angles = Array.from({ length: 5 }, (_, i) =>
      Math.atan2(
        nodePosition(i, 5, 100, 0).y - ORBIT_CY,
        nodePosition(i, 5, 100, 0).x - ORBIT_CX
      )
    );
    const TAU = Math.PI * 2;
    const wrap = (d: number) => ((d % TAU) + TAU) % TAU;
    const step = TAU / 5;
    for (let i = 1; i < angles.length; i++) {
      const delta = wrap(angles[i] - angles[i - 1]);
      expect(near(delta, step, 1e-6)).toBe(true);
    }
  });
});

describe("easeToward", () => {
  it("moves current toward target by factor", () => {
    expect(easeToward(0, 10, 0.1)).toBe(1);
    expect(easeToward(5, 10, 0.5)).toBe(7.5);
  });

  it("is stable at the target", () => {
    expect(easeToward(10, 10, 0.5)).toBe(10);
  });

  it("works with negative targets", () => {
    expect(easeToward(0, -10, 0.1)).toBe(-1);
  });
});

describe("normalizeDeg", () => {
  it("is a no-op within [0, 360)", () => {
    expect(normalizeDeg(0)).toBe(0);
    expect(normalizeDeg(359.9)).toBeCloseTo(359.9);
  });

  it("wraps values above 360", () => {
    expect(normalizeDeg(360)).toBe(0);
    expect(normalizeDeg(720.5)).toBeCloseTo(0.5);
  });

  it("wraps negative values into [0, 360)", () => {
    expect(normalizeDeg(-1)).toBeCloseTo(359);
    expect(normalizeDeg(-720)).toBe(0);
  });
});
