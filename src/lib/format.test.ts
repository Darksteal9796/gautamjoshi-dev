import { describe, expect, it } from "vitest";
import { formatCountValue } from "./format";

describe("formatCountValue", () => {
  it("pads an integer target with leading zeros", () => {
    expect(formatCountValue(4, "4", 2)).toBe("04");
    expect(formatCountValue(6, "6", 2)).toBe("06");
  });

  it("leaves unpadded integers alone when pad is 0", () => {
    expect(formatCountValue(147, "147", 0)).toBe("147");
  });

  it("preserves a single-decimal float", () => {
    expect(formatCountValue(6.2, "6.2", 0)).toBe("6.2");
  });

  it("rounds the tween value to match target decimals", () => {
    expect(formatCountValue(6.24, "6.2", 0)).toBe("6.2");
    expect(formatCountValue(6.26, "6.2", 0)).toBe("6.3");
  });

  it("inserts thousand separators when target has them", () => {
    expect(formatCountValue(5248, "5,248", 0)).toBe("5,248");
  });

  it("inserts thousand separators when magnitude >= 1000 even if target string lacks commas", () => {
    expect(formatCountValue(5248, "5248", 0)).toBe("5,248");
  });

  it("produces zero at tween start with a padded integer target", () => {
    expect(formatCountValue(0, "4", 2)).toBe("00");
  });

  it("produces zero at tween start with a decimal target", () => {
    expect(formatCountValue(0, "6.2", 0)).toBe("0.0");
  });

  it("handles mid-tween float of an integer target via rounding", () => {
    expect(formatCountValue(2.5, "4", 2)).toBe("03");
    expect(formatCountValue(2.4, "4", 2)).toBe("02");
  });

  it("keeps the comma during tween for thousand-scale targets", () => {
    expect(formatCountValue(2624, "5248", 0)).toBe("2,624");
    expect(formatCountValue(999, "5248", 0)).toBe("999");
  });
});
