import { describe, expect, it } from "vitest";
import { formatIST } from "./clock";

describe("formatIST", () => {
  it("converts UTC midnight to 05:30:00 IST", () => {
    const d = new Date("2026-04-19T00:00:00.000Z");
    expect(formatIST(d)).toBe("05:30:00");
  });

  it("wraps past 24h: UTC 20:00 → IST 01:30 next day", () => {
    const d = new Date("2026-04-19T20:00:00.000Z");
    expect(formatIST(d)).toBe("01:30:00");
  });

  it("pads single-digit hours", () => {
    const d = new Date("2026-04-19T03:00:00.000Z");
    expect(formatIST(d)).toBe("08:30:00");
  });

  it("returns a HH:MM:SS pattern", () => {
    expect(formatIST(new Date())).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });
});
