export const DEFAULT_HEATMAP_SEED = 0xc0ffee;
export const DEFAULT_HEATMAP_COUNT = 182;

export function seededHeatmap(
  seed: number = DEFAULT_HEATMAP_SEED,
  count: number = DEFAULT_HEATMAP_COUNT
): number[] {
  let s = seed >>> 0;
  const rand = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    const r = rand();
    out.push(r > 0.88 ? 4 : r > 0.72 ? 3 : r > 0.5 ? 2 : r > 0.25 ? 1 : 0);
  }
  return out;
}
