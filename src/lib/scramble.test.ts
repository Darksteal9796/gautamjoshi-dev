import { describe, expect, it } from "vitest";
import { SCRAMBLE_GLYPHS, scrambleFrame } from "./scramble";

const fixed = () => 0; // always first glyph

describe("scrambleFrame", () => {
  it("returns original text when progress >= 1", () => {
    expect(scrambleFrame("Gautam", 1, fixed)).toBe("Gautam");
    expect(scrambleFrame("Gautam", 1.5, fixed)).toBe("Gautam");
  });

  it("returns full scramble when progress is 0", () => {
    const out = scrambleFrame("abc", 0, fixed);
    expect(out.length).toBe(3);
    expect(out).not.toBe("abc");
    for (const c of out) expect(SCRAMBLE_GLYPHS).toContain(c);
  });

  it("reveals the first N chars at progress N/len", () => {
    const out = scrambleFrame("abcdef", 0.5, fixed);
    expect(out.slice(0, 3)).toBe("abc");
    expect(out.length).toBe(6);
  });

  it("preserves spaces and newlines", () => {
    const out = scrambleFrame("a b\nc", 0, fixed);
    expect(out[1]).toBe(" ");
    expect(out[3]).toBe("\n");
  });

  it("handles empty string", () => {
    expect(scrambleFrame("", 0, fixed)).toBe("");
    expect(scrambleFrame("", 0.5, fixed)).toBe("");
  });
});
