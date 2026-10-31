# Boundary data

One GeoJSON `FeatureCollection` per state/UT, named `<slug>.geojson`.

| File | Source | Licence |
| --- | --- | --- |
| `karnataka.geojson`, `gujarat.geojson`, `rajasthan.geojson` | Same DataMeet layer, simplified (tolerance 0.003–0.004°), 4 decimals | CC BY 4.0 |
| `kerala.geojson` | Same DataMeet layer, simplified (tolerance 0.0015°), 4 decimals | CC BY 4.0 |
| `tamil-nadu.geojson`, `andhra-pradesh.geojson`, `telangana.geojson`, `madhya-pradesh.geojson` | Same DataMeet layer, simplified (tolerance 0.003–0.004°), 4 decimals | CC BY 4.0 |
| `uttar-pradesh.geojson`, `bihar.geojson` | Same DataMeet layer, simplified (tolerance 0.003–0.004°), 4 decimals | CC BY 4.0 |
| `jharkhand.geojson`, `west-bengal.geojson` | Same DataMeet layer, simplified (tolerance 0.003°), 4 decimals | CC BY 4.0 |
| `odisha.geojson`, `chhattisgarh.geojson`, `sikkim.geojson`, `assam.geojson` | Same DataMeet layer, simplified (tolerance 0.001–0.003°), 4 decimals | CC BY 4.0 |
| `himachal-pradesh.geojson`, `uttarakhand.geojson`, `meghalaya.geojson` | Same DataMeet layer, simplified (tolerance 0.002–0.003°), 4 decimals | CC BY 4.0 |
| `maharashtra.geojson` | Same DataMeet layer, simplified (tolerance 0.003°) and truncated to 4 decimals | CC BY 4.0 |
| `goa.geojson` | [DataMeet — Survey of India / Census 2011 state boundaries](https://github.com/datameet/maps/tree/master/Survey-of-India-Index-Maps/Boundaries) (`India-States.shp`), simplified (tolerance 0.0005°) and truncated to 5 decimals | CC BY 4.0 |

Notes:

- This DataMeet layer predates the 2019 reorganisation (no separate Ladakh; Dadra & Nagar Haveli and Daman & Diu are still split). It is fine for Goa, but the India-wide map and the J&K/Ladakh/DNH-DD pages need a newer, Survey of India-compliant source.
- Keep `properties.attribution` (HTML) on the first feature; the map shows it.
- The layer is drawn at a coarse (index-map) scale, so it can be a few hundred metres out along borders. Dawki, on the Meghalaya–Bangladesh border, falls just outside it; check pins near borders sit inside the outline.
