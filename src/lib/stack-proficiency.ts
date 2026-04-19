export const PROFICIENCY_FLOOR = 50;
export const PROFICIENCY_TOP = 95;
export const PROFICIENCY_STEP = 6;

export function proficiencyWidth(indexInCategory: number): number {
  const raw = PROFICIENCY_TOP - indexInCategory * PROFICIENCY_STEP;
  return Math.max(PROFICIENCY_FLOOR, raw);
}
