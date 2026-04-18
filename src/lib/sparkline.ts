export function sparklinePoints(
  ys: readonly number[],
  width: number
): string {
  if (ys.length === 0) return "";
  if (ys.length === 1) return `0,${ys[0]}`;
  const step = width / (ys.length - 1);
  return ys.map((y, i) => `${+(i * step).toFixed(3)},${y}`).join(" ");
}
