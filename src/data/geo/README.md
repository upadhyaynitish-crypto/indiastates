# Boundary data

One GeoJSON `FeatureCollection` per state/UT, named `<slug>.geojson`.

| File | Source | Licence |
| --- | --- | --- |
| `goa.geojson` | [DataMeet — Survey of India / Census 2011 state boundaries](https://github.com/datameet/maps/tree/master/Survey-of-India-Index-Maps/Boundaries) (`India-States.shp`), simplified (tolerance 0.0005°) and truncated to 5 decimals | CC BY 4.0 |

Notes:

- This DataMeet layer predates the 2019 reorganisation (no separate Ladakh; Dadra & Nagar Haveli and Daman & Diu are still split). It is fine for Goa, but the India-wide map and the J&K/Ladakh/DNH-DD pages need a newer, Survey of India-compliant source.
- Keep `properties.attribution` (HTML) on the first feature; the map shows it.
