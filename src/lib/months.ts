export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

const INDEX = new Map(MONTH_NAMES.map((m, i) => [m.toLowerCase(), i + 1]));

/**
 * Turns a free-text season such as "October to March",
 * "March to May and October to December" or "All year" into month numbers
 * (1–12). Ranges may wrap past December. Text in brackets or after a comma is
 * treated as a note and ignored. Throws on anything it can't read, so a typo
 * in content fails the build instead of silently dropping a place.
 */
export function parseMonths(text: string): number[] {
  const core = text.replace(/\(.*?\)/g, '').split(',')[0].trim().toLowerCase();
  if (core === 'all year' || core === 'year-round') return MONTH_NAMES.map((_, i) => i + 1);

  const months = new Set<number>();
  for (const part of core.split(/\s+and\s+/)) {
    const [from, to = from] = part.split(/\s+to\s+/).map((s) => INDEX.get(s.trim()));
    if (!from || !to) throw new Error(`Can't read months from "${text}"`);
    for (let m = from; ; m = (m % 12) + 1) {
      months.add(m);
      if (m === to) break;
    }
  }
  return [...months].sort((a, b) => a - b);
}
