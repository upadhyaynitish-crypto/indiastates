#!/usr/bin/env node
// Adds a Wikimedia Commons photo to a state guide: checks the licence, saves a
// web-sized copy under src/assets/states/<state>/ and prints the credit block.
//
//   npm run photo -- <commons link> <state> [file-name]
//   npm run photo -- https://commons.wikimedia.org/wiki/File:Konarka_Temple.jpg odisha konark
//
// Portrait photos are cropped to 4:3 (centre) so they fit the cards; the credit
// then says "(cropped)", as the licences require for changed images.

import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const UA = 'IndiaStates-dev/0.1 (static site build; low volume)';
const MAX_WIDTH = 1920;

const [input, state, name] = process.argv.slice(2).filter((a) => a !== '--force');
const force = process.argv.includes('--force');

function fail(message) {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

if (!input || !state) {
  fail('Usage: npm run photo -- <Wikimedia Commons link> <state, e.g. goa> [file name]');
}
if (!existsSync(join('src/content/states', `${state}.md`)) && !existsSync(join('src/assets/states', state))) {
  fail(`No state called "${state}". Use the web-address form, e.g. tamil-nadu (see src/content/states/).`);
}

// Accept a file page link, an upload.wikimedia.org link or a bare "File:..." title.
function fileTitle(raw) {
  const s = decodeURIComponent(raw.trim());
  const page = s.match(/(?:File|Image):([^?#]+)/);
  if (page) return `File:${page[1].replace(/_/g, ' ')}`;
  const upload = s.match(/upload\.wikimedia\.org\/.+\/(?:\d+px-)?([^/]+\.(?:jpe?g|png|webp|tiff?))$/i);
  if (upload) return `File:${upload[1].replace(/_/g, ' ')}`;
  fail('That doesn\'t look like a Wikimedia Commons file link (it should contain "File:").');
}

const plain = (html = '') =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

const title = fileTitle(input);
const api = new URL('https://commons.wikimedia.org/w/api.php');
api.search = new URLSearchParams({
  action: 'query',
  titles: title,
  prop: 'imageinfo',
  iiprop: 'url|size|mime|extmetadata',
  iiurlwidth: String(MAX_WIDTH),
  format: 'json',
  formatversion: '2',
});

const res = await fetch(api, { headers: { 'User-Agent': UA } });
if (!res.ok) fail(`Wikimedia Commons answered ${res.status}. Try again in a minute.`);
const page = (await res.json()).query?.pages?.[0];
const info = page?.imageinfo?.[0];
if (!info) fail(`Couldn't find ${title} on Wikimedia Commons.`);
if (!/^image\/(jpeg|png|webp|tiff)$/.test(info.mime)) fail(`${info.mime} isn't a photo format the site can use.`);

const meta = info.extmetadata ?? {};
const license = plain(meta.LicenseShortName?.value);
const licenseUrl = meta.LicenseUrl?.value;
const artist = plain(meta.Artist?.value) || plain(meta.Credit?.value);

// The site's rule: only licences that allow reuse with credit, including commercially, and edits.
const allowed = /^(CC0|Public domain|PD\b|CC BY(-SA)? \d\.\d)/i.test(license) && !/NC|ND/.test(license);
if (!allowed) {
  fail(`Licence "${license || 'unknown'}" isn't allowed. Use CC0, public domain, CC BY or CC BY-SA photos.`);
}
if (!artist) fail('This photo has no author listed, so it can\'t be credited. Pick another.');
if (/government|ministry|\bPIB\b|GODL|press information bureau/i.test(`${artist} ${plain(meta.Credit?.value)}`)) {
  fail(`Credited to "${artist}". The site avoids government-credited photos so it never looks official. Pick another.`);
}

const fileName = (name || page.title.replace(/^File:/, '').replace(/\.[^.]+$/, ''))
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
const dir = join('src/assets/states', state);
const out = join(dir, `${fileName}.jpg`);
if (existsSync(out) && !force) fail(`${out} already exists. Give another file name, or add --force to replace it.`);

const download = await fetch(info.thumburl ?? info.url, { headers: { 'User-Agent': UA } });
if (!download.ok) fail(`Download failed (${download.status}). Try again in a minute.`);
const original = Buffer.from(await download.arrayBuffer());

// Apply the camera's orientation first so width and height are the ones people see.
let image = sharp(await sharp(original).rotate().toBuffer());
const { width, height } = await image.metadata();
const portrait = height > width;
if (portrait) {
  // "attention" keeps the busiest part of the frame (usually the subject, not the sky).
  // sharp allows one resize per pipeline, so crop in its own pass.
  const cropped = await image
    .resize({ width, height: Math.round((width * 3) / 4), fit: 'cover', position: sharp.strategy.attention })
    .toBuffer();
  image = sharp(cropped);
}
mkdirSync(dir, { recursive: true });
const saved = await image
  .resize({ width: MAX_WIDTH, withoutEnlargement: true })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(out);

const credit = portrait ? `${artist} (cropped)` : artist;
const sourceUrl = info.descriptionurl;
const description = plain(meta.ImageDescription?.value).slice(0, 200);

console.log(`
✓ Saved ${out} (${saved.width}×${saved.height}${portrait ? ', cropped from portrait to 4:3' : ''})

In the editor, choose this photo and fill in:
  Photographer / credit:  ${credit}
  Licence:                ${license}
  Licence link:           ${licenseUrl ?? '(none)'}
  Source page:            ${sourceUrl}
  Description:            write what the photo shows${description ? `\n                          (Commons says: "${description}")` : ''}

Or paste this into the state's file:
    image:
      src: ../../assets/states/${state}/${fileName}.jpg
      alt: DESCRIBE WHAT THE PHOTO SHOWS
      credit: ${JSON.stringify(credit)}
      license: ${license}${licenseUrl ? `\n      license_url: ${licenseUrl}` : ''}
      source_url: ${sourceUrl}
`);
if (portrait) console.log(`! Open ${out} and check the crop kept the important part. If not, crop the original yourself and save it over this file.\n`);
if (saved.width < 1200) console.log(`! This photo is only ${saved.width}px wide and may look soft on large screens.\n`);
