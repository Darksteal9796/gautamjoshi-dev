export function formatCountValue(
  n: number,
  targetStr: string,
  pad: number
): string {
  const decimals = targetStr.includes(".")
    ? Math.max(0, targetStr.split(".")[1].length)
    : 0;
  const hasComma =
    /,/.test(targetStr) || Math.abs(Number(targetStr.replace(/,/g, ""))) >= 1000;
  const rounded =
    decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));
  const [whole, frac] = rounded.split(".");
  const withCommas = hasComma
    ? Number(whole).toLocaleString("en-US")
    : whole;
  const result = frac ? `${withCommas}.${frac}` : withCommas;
  return pad > 0 ? result.padStart(pad, "0") : result;
}
