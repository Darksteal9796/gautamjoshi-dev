import { describe, expect, it } from "vitest";
import { proficiencyWidth } from "./stack-proficiency";

describe("proficiencyWidth", () => {
  it("returns 95 for the top item", () => {
    expect(proficiencyWidth(0)).toBe(95);
  });

  it("drops 6% per position", () => {
    expect(proficiencyWidth(1)).toBe(89);
    expect(proficiencyWidth(2)).toBe(83);
    expect(proficiencyWidth(5)).toBe(65);
  });

  it("floors at 50 once the slope would dip below", () => {
    expect(proficiencyWidth(7)).toBe(53);
    expect(proficiencyWidth(8)).toBe(50);
    expect(proficiencyWidth(20)).toBe(50);
  });
});
