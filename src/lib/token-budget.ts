export type TokenBudgetState = {
  dateKey: string;
  used: number;
};

export function utcDateKey(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 10);
}

export function initialBudget(): TokenBudgetState {
  return { dateKey: "", used: 0 };
}

export function canSpendTokens(
  state: TokenBudgetState,
  now: number,
  cap: number
): boolean {
  if (cap <= 0) return true;
  const todayKey = utcDateKey(now);
  if (state.dateKey !== todayKey) return true;
  return state.used < cap;
}

export function recordTokens(
  state: TokenBudgetState,
  now: number,
  tokens: number
): TokenBudgetState {
  const todayKey = utcDateKey(now);
  const safeTokens = Math.max(0, tokens);
  if (state.dateKey !== todayKey) {
    return { dateKey: todayKey, used: safeTokens };
  }
  return { dateKey: todayKey, used: state.used + safeTokens };
}
