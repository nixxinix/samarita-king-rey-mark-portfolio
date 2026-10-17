# Portfolio (React + Vite)

A simple, clean, responsive and accessible portfolio. Built with React, React Router and Vite. Ready to deploy on Vercel.

```bash
npm install        # once
npm run dev        # start locally at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # try the production build locally
npm run lint       # check the code for mistakes
```

Needs Node 20.19 or newer (see `.nvmrc`).

---

## 1. Make it yours

Almost everything you will edit is plain data in `src/data/`:

| File | What it controls |
| --- | --- |
| `site.js` | Your name, email, location, intro, About text, GitHub and LinkedIn links |
| `projects.js` | Every project: its card, its details page, its filter |
| `tools.js` | The moving tools strip |
| `skills.js` | The skills cards |
| `certifications.js` | The certificate carousel |
| `navigation.js` | The side menu links |

Also update the title, description and `og:` lines in `index.html` (they show in search results and when a link is shared), and replace the pictures in `public/` (sizes below).

### Add a project

1. Put a picture in `public/images/projects/` named after the project in kebab-case, for example `my-new-project.jpg` (1200 x 900).
2. Open `src/data/projects.js`, copy one project object, and change `slug`, `title`, `image`, and the text.

That is all. The card, the filter button (if the `category` is new), the page at `/projects/my-new-project` and the previous/next links are created automatically.

### Pictures

| Where | Size | Notes |
| --- | --- | --- |
| `public/images/projects/` | 1200 x 900 (4:3) | Screenshot or photo of the project |
| `public/images/certificates/` | 1200 x 850 | Picture of the certificate |
| `public/images/profile.svg` | 800 x 1000 (4:5) | Your portrait (any format works, update the path in `AboutPage.jsx`) |
| `public/favicon.svg` | any square | Browser tab icon |

Use `.jpg`, `.png` or `.webp` for photos and keep each under about 300 KB. Always keep the descriptive `alt` text.

### Colors, font and spacing

`src/styles/tokens.css` holds every color, the font and the spacing. The font (IBM Plex Mono) is bundled with the site through `@fontsource`, so no request goes to Google. To change the font family, install another `@fontsource/...` package, import it in `src/main.jsx`, and update `--font`.

---

## 2. Naming conventions

| Thing | Convention | Example |
| --- | --- | --- |
| Components | PascalCase, one component per file, file name = component name, `.jsx` | `ProjectCard.jsx` |
| Pages (one per route) | PascalCase ending in `Page` | `ContactPage.jsx` |
| Home sections | PascalCase ending in `Section` | `SkillsSection.jsx` |
| Hooks | camelCase starting with `use`, `.js` | `useReveal.js` |
| Data files | camelCase, plural noun, `.js` | `certifications.js` |
| Stylesheets | kebab-case, grouped by area | `header.css` |
| Pictures and other public files | lowercase kebab-case, descriptive | `weather-dashboard.svg` |
| URLs and slugs | kebab-case | `/projects/weather-dashboard` |
| CSS classes | kebab-case, `--` for a variant | `btn--ghost` |
| Folders | lowercase; components grouped by feature | `components/home/` |
| Exports | components and pages: `default`; hooks and data: named | `export function useReveal` |
| Imports | use the `@/` shortcut for `src/` | `import Button from '@/components/ui/Button'` |

### Folder map

```
public/                      Files served as they are (favicon, pictures)
  images/projects/           One picture per project
  images/certificates/
src/
  main.jsx                   Starts the app, loads fonts and styles
  App.jsx                    The list of pages (routes)
  pages/                     One file per page
  components/
    layout/                  Header, side menu, footer, page frame
    ui/                      Reusable pieces: Button, Icon, Reveal, PageBanner...
    home/                    Sections of the home page
    contact/                 Contact page pieces
    project/                 Project details pieces
  data/                      Your content (edit these)
  hooks/                     Reusable logic (scroll animation, reduced motion...)
  styles/                    CSS split by area; index.css loads them all
index.html                   Page shell, title and description
vercel.json                  Vercel settings
```

---

## 3. Deploy on Vercel

**With GitHub (easiest)**

1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New > Project** and import the repository.
3. Vercel detects Vite. The settings come from `vercel.json` (build `npm run build`, output `dist`). Press **Deploy**.

Every push to `main` then updates the live site, and every branch gets its own preview link.

**With the command line**

```bash
npm install -g vercel
vercel          # first deploy (preview)
vercel --prod   # publish to your real address
```

**What `vercel.json` does**

- Sends every address to `index.html`, so links such as `/about` or `/projects/weather-dashboard` also work when someone opens or refreshes them directly.
- Caches built files for a year and pictures for a day, so the site loads fast on repeat visits.
- Adds basic security headers.

Add your own domain under **Project Settings > Domains**.

> Unknown addresses show the friendly "Page not found" screen, but the server still answers with a normal status. That is normal for single-page apps and fine for a portfolio.

### Make the contact form send messages

By default, **Send message** opens the visitor's email app with the message ready. To receive messages directly, create a free form on a service such as [Formspree](https://formspree.io), then add its address as an environment variable named `VITE_CONTACT_ENDPOINT` (Vercel: **Project Settings > Environment Variables**, then redeploy; locally: copy `.env.example` to `.env.local`).

---

## 4. How it stays easy for every visitor

- **Readable:** 17 px text, generous line spacing, color contrast that meets WCAG AA.
- **Clear navigation:** the menu button says "Menu" in words. Buttons and links are at least 44 px tall.
- **Keyboard and screen readers:** skip link, visible focus ring, labeled icon buttons, proper headings. The menu and picture viewer close with Esc, the carousel works with arrow keys, and focus moves to the page content after each page change.
- **Touch screens:** project titles and buttons are always visible, since a phone cannot hover.
- **Forms:** every field has a visible label and a specific error message.
- **Motion:** pieces rise gently into place once while scrolling (wrap anything in `<Reveal>` to do the same). Everything stops moving for visitors who turn on "reduce motion". The tools strip pauses on hover or focus and has a Pause button.

## Credits

- Font: IBM Plex Mono by IBM (SIL Open Font License), packaged by Fontsource.
- Icons: simple line icons in the style of Feather Icons (MIT License).
