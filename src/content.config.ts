// Astro 6+ reads collection config from src/content.config.ts (the older
// src/content/config.ts location is no longer supported).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** A statistic always carries the year it refers to. */
const stat = z.object({
  value: z.number().positive(),
  year: z.number().int().min(1900).max(2100),
});

const states = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/states' }),
  schema: ({ image }) => {
    /** Every image must say where it came from and under what licence. */
    const imageMeta = z.object({
      src: image(),
      alt: z.string().min(1, 'alt text is required'),
      credit: z.string().min(1, 'credit is required'),
      license: z.string().min(1, 'license is required'),
      license_url: z.url().optional(),
      source_url: z.url(), // e.g. the Wikimedia Commons file page
    });

    return z.object({
      name: z.string(),
      type: z.enum(['state', 'union-territory']),
      slug: z.string().regex(/^[a-z0-9-]+$/),
      tagline: z.string(),
      /** Meta description: ~150 characters, unique per page. */
      description: z.string().min(70).max(170),
      capital: z.string(),
      largest_city: z.string().optional(),
      official_languages: z.array(z.string()).min(1),
      other_languages: z.array(z.string()).default([]),
      formed: z.coerce.date(),
      area_km2: z.number().positive(),
      population: stat,
      literacy_rate: stat,
      region: z.enum([
        'North India',
        'South India',
        'East India',
        'West India',
        'Central India',
        'Northeast India',
      ]),
      neighbours: z.array(z.string()).default([]),
      coordinates: z.object({ lat: z.number(), lng: z.number() }),
      hero_image: imageMeta,
      tourist_spots: z
        .array(
          z.object({
            name: z.string(),
            type: z.enum([
              'beach',
              'heritage',
              'religious',
              'fort',
              'nature',
              'wildlife',
              'waterfall',
              'city',
              'museum',
              'hill-station',
            ]),
            description: z.string().min(1),
            lat: z.number(),
            lng: z.number(),
            best_time: z.string(),
            image: imageMeta.optional(),
          }),
        )
        .min(1),
      universities: z.array(
        z.object({
          name: z.string(),
          city: z.string(),
          type: z.string(),
          website: z.url(),
        }),
      ),
      festivals: z.array(z.object({ name: z.string(), month: z.string(), description: z.string() })),
      famous_food: z.array(z.object({ name: z.string(), description: z.string() })),
      sources: z
        .array(
          z.object({
            title: z.string(),
            url: z.url(),
            /** What this source backs up, so reviewers can check claims quickly. */
            supports: z.string().optional(),
          }),
        )
        .min(1),
      /** Claims that are on the page but still need checking against a primary source. */
      needs_verification: z.array(z.string()).default([]),
      last_updated: z.coerce.date(),
    });
  },
});

export const collections = { states };
