export const ORBIT_CX = 250;
export const ORBIT_CY = 210;

export const RING_RADII = { 1: 56, 2: 100, 3: 142 } as const;

export const RING_SPEEDS_DEG_PER_TICK = { 1: 0.045, 2: -0.09, 3: 0.15 } as const;

export type RingKey = keyof typeof RING_RADII;

export function nodePosition(
  indexInRing: number,
  ringCount: number,
  radius: number,
  rotationDeg: number,
  cx: number = ORBIT_CX,
  cy: number = ORBIT_CY
): { x: number; y: number } {
  const baseAngle = (2 * Math.PI * indexInRing) / ringCount - Math.PI / 2;
  const angle = baseAngle + (rotationDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

export function easeToward(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}

export function normalizeDeg(deg: number): number {
  return ((deg % 360) + 360) % 360;
}
