export interface Section {
  id: string;
  /** Heading as HTML (may contain entities or inline markup). */
  headingHtml: string;
  bodyHtml: string;
}

/**
 * Splits rendered Markdown into one chunk per `## heading`, so the page
 * template can drop components (spot cards, tables) into the right section
 * while authors keep writing plain Markdown.
 */
export function splitSections(html: string): { intro: string; sections: Section[] } {
  const parts = html.split(/(?=<h2\b)/);
  const intro = parts[0]?.startsWith('<h2') ? '' : (parts.shift() ?? '');
  const sections = parts.map((part) => {
    const match = part.match(/^<h2\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/);
    if (!match) throw new Error(`Could not parse section heading: ${part.slice(0, 80)}`);
    return { id: match[1], headingHtml: match[2], bodyHtml: part.slice(match[0].length) };
  });
  return { intro, sections };
}
