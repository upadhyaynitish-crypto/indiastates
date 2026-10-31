# Editing IndiaStates without AI

You can change any guide, add places and add photos yourself. There are two tools:

- **The editor**: forms in your web browser, for text, facts, places and sources.
- **The photo helper**: one command that fetches a photo from Wikimedia Commons, checks its licence and fills in the credit for you.

Nothing you do in the editor goes live by itself. You check it on your computer first, then publish (see step 5).

---

## 1. Open the editor

You need **Google Chrome, Microsoft Edge or Brave**. The editor's local mode doesn't work in Safari or Firefox.

1. Open **Terminal** and go to the project folder:
   ```bash
   cd ~/Desktop/IndiaStates
   ```
2. Start the site on your computer:
   ```bash
   npm run dev
   ```
3. In Chrome, open **http://localhost:4321/admin/index.html**. Use the full address, ending in `index.html`.
4. Click **Work with Local Repository** and choose the **IndiaStates** folder on your Desktop. Click **Allow** when Chrome asks.

You'll see **States & UTs** with every guide. Click one to edit it.

To see your changes on the real page, open **http://localhost:4321/states/goa** (or whichever state) in another tab and refresh it after saving.

---

## 2. Common jobs

### Fix or update a fact
1. Open the state and change the field or the text under **Article**.
2. Under **Sources**, add or update the source that backs it up: its title, web address and what it supports.
3. Set **Last updated** to today.
4. Click **Save**.

If you can't find a source yet, don't add the fact. Or add it and put a note under **Still being checked**, which visitors can see.

### Add a place to visit
1. Open the state, scroll to **Places to visit** and click **Add place**.
2. Fill in:
   - **Name** and **Type**. The type decides which Trip finder filter it appears under.
   - **Description**: one or two sentences, in your own words.
   - **Latitude / Longitude**: in Google Maps, right-click the place and click the numbers at the top of the menu to copy them. The first number is latitude and the second is longitude.
   - **Best time**: full month names, e.g. `October to March` or `March to May and October to December`. The editor refuses short forms like "Oct".
   - **Photo**: optional. See below.
3. Places appear on the page and the map in the order listed. Drag the handle to reorder them.
4. Click **Save**.

### Add a photo
Only photos from **Wikimedia Commons**, **Unsplash** or **your own** are allowed, and every photo needs its credit and licence.

For a Wikimedia Commons photo:

1. Find the photo on commons.wikimedia.org and copy the address of its page. It contains `File:`.
2. In Terminal, in the project folder, run (with your link, state and a short name):
   ```bash
   npm run photo -- "https://commons.wikimedia.org/wiki/File:Konarka_Temple.jpg" odisha konark-temple
   ```
   The helper:
   - refuses licences the site can't use, and photos credited to the government;
   - saves a web-sized copy in `src/assets/states/odisha/`;
   - crops tall (portrait) photos to the card shape and adds "(cropped)" to the credit, as the licence requires. Open the photo afterwards to check the crop kept the important part;
   - prints the credit, licence and source page.
3. In the editor, open the place's **Photo**, click **Choose** (or **Replace**) and pick the new file. Copy the credit details the helper printed into the fields below it.
4. Write the **Description for screen readers** yourself, saying what the photo shows.

For an Unsplash or your own photo, put the file in `src/assets/states/<state>/` and fill in the credit fields by hand. For your own photo, the credit is your name and the licence is whatever you choose, e.g. CC BY-SA 4.0.

### Add a new state or union territory
1. Click **New State or UT**. The **Article** starts with the section headings the page needs. Keep them, in that order, and write under each.
2. Fill in every field. The editor won't save until the required ones are done.
3. **The map boundary is a separate technical step.** The page also needs `src/data/geo/<state>.geojson`, cut from the official-boundary data described in `src/data/geo/README.md`. Until that file exists, the build stops with *"Missing boundary file"*. This is expected, and it keeps a page without a correct map from going live. Ask a developer, or AI, for this one step.

---

## 3. The rules (from the project brief)

- **Every fact needs a source.** Statistics come from the Census of India, data.gov.in, MoSPI or state government sites, with the year.
- **Never invent anything.** If it can't be sourced, leave it out or list it under **Still being checked**.
- **Photos:** Wikimedia Commons, Unsplash or your own, always with credit and licence.
- **No copying.** Write in your own words. Wikipedia can be adapted only with credit (CC BY-SA), which means listing it under Sources.
- **Neutral tone** on politics, religion and disputes.
- **Never imply the site is official.** No government emblems or logos.
- **Accessibility:** every photo needs a real description.

---

## 4. Check before you publish

In Terminal, in the project folder:

```bash
npm run build
```

If it ends without errors, everything is valid. If something is wrong, it stops and names the state and field. For example:

| Message mentions | What to do |
|---|---|
| `Can't read months from "…"` | Fix the Best time wording (full month names). |
| `IATA code` | Airport codes are three capital letters, e.g. `BOM`. |
| `Missing boundary file` | A new state needs its map file (see above). |
| `description` too short or long | The search description must be 70 to 170 characters. |
| An image path | The photo file name or folder doesn't match. Re-choose it in the editor. |

---

## 5. Publish

Each save in the editor changes files in the IndiaStates folder. To publish them:

- **Today:** commit the changes with GitHub Desktop or `git`.
- **Once the site is on GitHub and Cloudflare Pages:** pushing the commit publishes the site in a couple of minutes.

### Later: edit on the live site, from any computer
After the project is on GitHub:
1. In `public/admin/config.yml`, replace `OWNER` in `repo: OWNER/indiastates` with your GitHub username.
2. On GitHub, create a **fine-grained personal access token** (Settings → Developer settings) for this repository only, with **Contents: Read and write**.
3. Open `https://<your site>/admin/`, click **Sign In Using Access Token** and paste it.

Each save then becomes a commit on GitHub and the site republishes itself. Anyone without your token can open the page but can't change anything.

---

## Updating the editor
The editor version is fixed in `public/admin/index.html` (`@sveltia/cms@0.246.1`), so it never changes without you knowing. To upgrade, change the number to a newer release from npmjs.com/package/@sveltia/cms (ideally one at least two weeks old), then open the editor and check a guide still saves correctly.
