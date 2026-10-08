// Numbers are formatted for an international audience (1,458,545), not the
// Indian lakh/crore grouping (14,58,545).
const number = new Intl.NumberFormat('en-US');

export const formatNumber = (n: number) => number.format(n);

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const listJoin = (items: string[]) =>
  new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(items);

const SPOT_TYPE_LABEL: Record<string, string> = {
  'hill-station': 'Hill station',
};
export const spotTypeLabel = (t: string) => SPOT_TYPE_LABEL[t] ?? t.charAt(0).toUpperCase() + t.slice(1);
