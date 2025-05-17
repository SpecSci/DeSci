# DeSci
DeSci Decentralized Science Project featuring Spectrometry Data LLM

This project contains 3 Internet Computer (IC) canisters

-
1 Frontend, using nextjs;
-
1 Spectrometry Economy;
-
1 Statistics, easy quick to retrieve data/info about activity;
-

use 1 single dfx.json file in the main root that builds and deploys all canisters to both local and ic network if desired to push to mainnet.



Scaffold a brand‑new Next.js 14 (App Router) project named **spectranet** with TypeScript, Tailwind CSS, shadcn/ui, Recharts, heroicons, and @tanstack/react‑query.  
Theme: **modern, science‑lab aesthetic** (deep‑space blues & violets, neon cyan accents).  
Font stack: Inter for UI text, JetBrains Mono for code/spectra numbers.  
Every component must be fully responsive with motion-safe framer‑motion fade/slide animations.

## 1 Folder / File Structure
spectranet/
├─ app/
│ ├─ layout.tsx # global header/footer/nav, dark‑mode toggle
│ ├─ page.tsx # Home
│ ├─ about/
│ │ └─ page.tsx # Vision & team
│ ├─ explorer/
│ │ └─ page.tsx # Interactive spectra graph explorer
│ ├─ upload/
│ │ └─ page.tsx # Scan uploader w/ drag‑n‑drop, progress
│ ├─ dashboard/
│ │ ├─ layout.tsx # sub‑nav tabs
│ │ └─ page.tsx # Personal stats & royalties
│ ├─ api/
│ │ └─ page.tsx # Dev docs, code snippets
│ └─ governance/
│ └─ page.tsx # DAO proposals list
├─ components/
│ ├─ Logo.tsx
│ ├─ Nav.tsx
│ ├─ Footer.tsx
│ ├─ SpectraChart.tsx
│ ├─ SpectrumCard.tsx
│ ├─ UploadWidget.tsx
│ ├─ StatPanel.tsx
│ └─ ThemeToggle.tsx
├─ lib/
│ ├─ icpClient.ts # placeholder for canister calls
│ └─ dummyData.ts # mock spectra & user stats
├─ styles/
│ └─ globals.css
├─ tailwind.config.ts
└─ tsconfig.json


## 2 Global Layout (`app/layout.tsx`)
* Top fixed nav with Logo + links (`Home | Explorer | Upload | Dashboard | Governance | API`).
* Right‑side ThemeToggle (sun/moon icon from heroicons).
* Footer with copyright, social icons, ICP & DFINITY badges.

## 3 Home Page
* **Hero section**: “Scan the World’s Molecules” headline, call‑to‑action buttons (“Explore Data” / “Upload Scan”).
* **Live‑stats strip**: animated counters (total spectra, verified devices, royalties paid).
* **How it works** steps in a 3‑column grid with icons.
* **Featured datasets** carousel (SpectrumCard components).
* **CTA footer**.

## 4 Explorer Page
* Search bar + filter pills (category, wavelength range).
* Main SpectraChart (Recharts LineChart) that plots selected spectrum vs. reference.
* Side drawer showing metadata, verification level, uploader avatar.
* Compare toggle to overlay multiple spectra.

## 5 Upload Page
* UploadWidget: drag‑and‑drop `.json` or `.csv` spectrum file, or live device scan (stub).
* Realtime preview of parsed peaks in mini‑chart.
* Form fields: sample name, category dropdown, privacy switch, stake amount slider.
* Submit button triggers “success” toast and redirects to Dashboard.

## 6 Dashboard Page
* StatPanel grid (lifetime uploads, royalties, reputation level).
* Table of recent royalties (react‑table).
* Tabbed area: “My Scans” list, “Staking” vault, “Calibration NFTs”.
* Simple placeholder graph of weekly earnings (Recharts AreaChart).

## 7 Governance Page
* List of open/proposed/closed DAO proposals fetched via dummy hook.
* ProposalCard shows title, TL;DR, vote counts, progress bar.
* “Create Proposal” modal (text boxes only; no on‑chain tx yet).

## 8 API Page
* Code‑block tabs (curl, JS, Rust) demonstrating `GET /spectra/{id}` and `POST /scan`.
* Copy‑to‑clipboard buttons.
* Rate‑limit note and link to docs repo.

## 9 Components Spec
* **SpectraChart** accepts `Spectrum[]` (array of `{wavelength:number,intensity:number}`) and optional `reference`.
* Tailwind classes: rounded‑2xl, shadow‑lg, p‑4, bg‑neutral‑900/40 backdrop‑blur for dark theme.
* Use Recharts responsive container; tooltip shows Δ (difference) on hover.

## 10 Tailwind Config
* Extend colours:
```ts
  colors: {
    primary: { 50:\"#ecfeff\",100:\"#cffafe\",200:\"#a5f3fc\",300:\"#67e8f9\",400:\"#22d3ee\",500:\"#06b6d4\",600:\"#0891b2\",700:\"#0e7490\",800:\"#155e75\",900:\"#164e63\" },
    spectral: { DEFAULT:\"#7c3aed\", dark:\"#3b0764\" }
  }


next@14, react@18, tailwindcss@^3.4, @headlessui/react, @heroicons/react,
shadcn‑ui (radix primitives), recharts, framer‑motion, @tanstack/react‑query,
clsx, zod, react‑hook‑form


12 Dummy Data & Hooks (lib/)

useSpectra(id) returns mock spectrum.
useDashboardStats() returns counters & royalties.
Use React Query with setTimeout to fake latency.

13 Testing & Linting

ESLint with @next/eslint-plugin-next, Prettier, Husky pre‑commit.
Playwright e2e test: home page loads hero text.

14 Execution Notes

npx create-next-app@latest spectranet --ts --tailwind --eslint --app.
Copy generated files & folders above.
npx shadcn-ui@latest init then shadcn-ui add button card dialog.
Run pnpm dev and verify pages.
Replace lib/dummyData.ts with real ICP canister calls when ready.


Each page/component should have minimal working TSX, Tailwind classes, and placeholder text so the site builds successfully on first run.

## Build and Deployment

1. Clone the repository and enter the project root:

   ```bash
   git clone https://github.com/SpecSci/DeSci.git
   cd DeSci
   ```

2. Install the recommended dfx version and build the Rust canister:

   ```bash
   dfxvm install 0.18.0
   dfxvm default 0.18.0
   ```

   Then build the canister:

   ```bash
   cargo build --release
   ```

3. Install and build the frontend from the `spectranet` folder (there is no
   `frontend` directory in this repo):

   ```bash
   cd spectranet
   npm install
   npm run build
   ```

4. Deploy the canisters using DFX:

   ```bash
   dfx deploy
   ```


5. For a fully automated setup you can use the script in `autobuild.txt`. Copy
   the contents of that file to `autobuild.sh`, make it executable and run it.
   The script installs dependencies, builds all components and deploys the
   canisters to the IC mainnet.

## Viewing Logs

Avoid using `tail` to inspect logs because it may hang. Use `less` or `cat` instead.

## Avoiding commands that hang

Some commands may freeze when they require network access or wait indefinitely. If a command hangs,
abort it with `Ctrl+C` and list it here so it isn't run again.

### Known hanging commands

- `npm install` in the `spectranet` folder (attempted during build; it stalled due to network
  restrictions).
