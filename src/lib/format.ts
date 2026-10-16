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

// Plural labels for the "explore by interest" filters, in display order.
export const INTERESTS: { type: string; label: string }[] = [
  { type: 'heritage', label: 'Heritage' },
  { type: 'fort', label: 'Forts' },
  { type: 'religious', label: 'Sacred sites' },
  { type: 'wildlife', label: 'Wildlife' },
  { type: 'nature', label: 'Nature' },
  { type: 'hill-station', label: 'Hill stations' },
  { type: 'waterfall', label: 'Waterfalls' },
  { type: 'beach', label: 'Beaches' },
  { type: 'museum', label: 'Museums' },
  { type: 'city', label: 'Cities' },
];
