import { getCollection, type CollectionEntry } from 'astro:content';
import { parseMonths } from './months';

type Spot = CollectionEntry<'states'>['data']['tourist_spots'][number];

export type Place = Spot & {
  /** Position in the state's list; the guide anchors each card as `#spot-<number>`. */
  number: number;
  state: string;
  slug: string;
  months: number[];
};

/** Every tourist spot across the published guides, ordered by state name. */
export async function getPlaces(): Promise<Place[]> {
  const states = (await getCollection('states')).sort((a, b) => a.data.name.localeCompare(b.data.name));
  return states.flatMap(({ data }) =>
    data.tourist_spots.map((spot, i) => {
      try {
        return { ...spot, number: i + 1, state: data.name, slug: data.slug, months: parseMonths(spot.best_time) };
      } catch (e) {
        throw new Error(`${data.name} › ${spot.name}: ${(e as Error).message}`);
      }
    }),
  );
}
