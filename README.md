# Metric thread sizes

A static GitHub Pages site listing ISO metric threads (coarse and fine) with pitch, outer diameter and inner (minor) diameters. Tick rows and press **Compare selected** to hide everything else; press **Show all again** to restore the full table.

## Publish

1. Create a new GitHub repository and push these files to `main`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. The included workflow deploys the site on every push. It will be live at `https://<user>.github.io/<repo>/`.

## Run locally

Open `index.html` in a browser. No build step.

## Edit data

Add rows to `data.js` as `[diameter, pitch, "coarse" | "fine"]`. Inner diameters are computed in `app.js`:

- bolt minor diameter d3 = d − 1.22687·P
- nut minor diameter D1 = d − 1.08253·P
