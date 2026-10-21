# Thread sizes

A static GitHub Pages site listing ISO metric threads (coarse and fine) and Unified inch threads (UNC and UNF) with pitch, outer diameter and inner (minor) diameters.

- **Metric / Imperial / Both** picks which thread system is listed (metric by default).
- **Show rare sizes** adds the less common sizes; by default only common ones are listed.
- **Units: Native / All mm / All inch** shows each thread in its own units, or converts everything to one system.
- Tick rows and press **Compare selected** to hide everything else; press **Show all again** to restore the full table.

## Publish

1. Create a new GitHub repository and push these files to `main`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. The included workflow deploys the site on every push. It will be live at `https://<user>.github.io/<repo>/`.

## Run locally

Open `index.html` in a browser. No build step.

## Edit data

Add rows to `data.js`:

- `METRIC`: `[diameter (mm), pitch (mm), "coarse" | "fine", "common" | "rare"]`
- `INCH`: `[size label, major diameter (in), TPI, "coarse" | "fine", "common" | "rare"]`

Inner diameters are computed in `app.js` (inch threads use P = 25.4 / TPI mm):

- bolt minor diameter d3 = d − 1.22687·P
- nut minor diameter D1 = d − 1.08253·P
