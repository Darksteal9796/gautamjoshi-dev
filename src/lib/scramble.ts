export const SCRAMBLE_GLYPHS = "!<>-_\\/[]{}—=+*^?#_";

export function scrambleFrame(
  text: string,
  progress: number,
  rng: () => number = Math.random
): string {
  if (progress >= 1) return text;
  if (progress <= 0 || text.length === 0) {
    let out = "";
    for (const c of text) {
      if (c === " " || c === "\n") out += c;
      else out += SCRAMBLE_GLYPHS[Math.floor(rng() * SCRAMBLE_GLYPHS.length)];
    }
    return out;
  }
  const revealIdx = Math.floor(text.length * progress);
  let out = text.slice(0, revealIdx);
  for (let i = revealIdx; i < text.length; i++) {
    const c = text[i];
    if (c === " " || c === "\n") out += c;
    else out += SCRAMBLE_GLYPHS[Math.floor(rng() * SCRAMBLE_GLYPHS.length)];
  }
  return out;
}
