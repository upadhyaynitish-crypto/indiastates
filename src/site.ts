export const SITE = {
  name: 'IndiaStates',
  tagline: 'A free, independent guide to every state and union territory of India',
  disclaimer:
    'Independent informational site, not affiliated with the Government of India or any state government.',
  /**
   * Where "Suggest a correction" links go. Replace with the real GitHub repo
   * (issues enabled) before launch; `{page}` is filled with the page title.
   */
  correctionsUrl: 'https://github.com/OWNER/indiastates/issues/new?title=Correction%3A%20{page}',
  /** Total number of states and UTs the site will eventually cover. */
  totalRegions: 36,
} as const;

export function correctionLink(page: string): string {
  return SITE.correctionsUrl.replace('{page}', encodeURIComponent(page));
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
