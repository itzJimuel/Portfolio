# Jimuel Amuto — Portfolio

A fast, accessible personal portfolio built with **React 19**, **Vite** and **Tailwind CSS v4**.

- Light & dark themes (follows your system by default, with a manual toggle that remembers your choice)
- Sticky navbar with scroll-spy, smooth scrolling and a mobile menu
- Subtle scroll and hover animations that switch off for visitors who prefer reduced motion
- Hero, About, Skills, Projects, Experience/Education timeline, Contact form, Footer
- Downloadable résumé, SEO and Open Graph tags, JSON-LD structured data, favicon set
- **All content lives in one file:** [`src/data/portfolio.js`](src/data/portfolio.js)

Lighthouse (production build): Performance 98–100 · Accessibility 100 · Best Practices 100 · SEO 100.

---

## 1. Run it locally

**Requirements:** [Node.js](https://nodejs.org) 20.19+ or 22.12+ (the current LTS is recommended).

```bash
npm install        # install dependencies (first time only)
npm run dev        # start the dev server → http://localhost:5173
```

Other commands:

| Command           | What it does                                          |
| ----------------- | ----------------------------------------------------- |
| `npm run build`   | Creates the production site in `dist/`                |
| `npm run preview` | Serves the `dist/` build locally to check it          |
| `npm run lint`    | Checks the code for mistakes with ESLint              |

---

## 2. Edit your content

Open **[`src/data/portfolio.js`](src/data/portfolio.js)**. Everything on the site comes from there, so you
never need to touch the components. Anything marked **`TODO`** is a placeholder for you to replace.

| Export                    | Controls                                                                    |
| ------------------------- | --------------------------------------------------------------------------- |
| `site`                    | Page title, meta description, site URL, social-share image (SEO)           |
| `profile`                 | Name, role, tagline, location, availability badge, email, résumé, photo    |
| `socials`                 | GitHub / LinkedIn / email links (hero, contact, footer)                    |
| `sections`                | Section titles, intros and navbar labels. **Reorder or delete to change the page.** |
| `about`                   | Bio paragraphs and the quick-facts grid                                    |
| `skills`                  | Skill categories, each with items and icons                                 |
| `projects`                | Project cards (`featured: true` makes one large and full-width)             |
| `experience`, `education` | Timeline entries, newest first                                              |

The SEO tags in `index.html` (title, description, Open Graph) are filled in automatically from `site` and
`profile` when the site runs or builds, so you don't edit `index.html` by hand.

### Add a project

Copy an existing object in `projects` and change it:

```js
{
  name: 'My New App',
  description: 'One line about what it does and why it is interesting.',
  tech: ['React', 'Firebase'],
  image: 'images/projects/my-new-app.webp',
  imageAlt: 'Screenshot of My New App home screen',
  github: 'https://github.com/your-username/my-new-app',
  demo: 'https://my-new-app.vercel.app', // or null if there is no live demo
  demoLabel: 'Live demo',               // optional link text, e.g. 'Watch demo' for a video
},
```

### Add a skill icon

Icons come from [react-icons](https://react-icons.github.io/react-icons). Search for the technology
(e.g. "kotlin"), copy the icon name, add it to the matching `import` line at the top of
`portfolio.js`, then use it:

```js
import { SiPython, SiKotlin } from 'react-icons/si';
// …
{ name: 'Kotlin', icon: SiKotlin },
```

Only the icons you import are included in the final site, so this doesn't slow it down.

### Replace images & files

All files live in the [`public/`](public) folder. In `portfolio.js` you reference them **without a leading slash**
(e.g. `'images/profile.webp'`).

| File                               | Replace with                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| `public/images/profile.webp`       | Your photo (currently your GitHub avatar). Portrait, ideally **800×1000**; update `width`/`height` in `profile.photo`. |
| `public/images/projects/*.webp`    | Project screenshots: **16:10**, about **1440×900**. Update each `image`.      |
| `public/resume.pdf`                | Your résumé (currently a draft built from your portfolio data). Keep the file name, or change `profile.resume`. |
| `public/og-image.png`              | The preview image shown when your link is shared: **1200×630** PNG or JPG.    |
| `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png` | Your own icon (optional).                          |

**Image tips for a fast site:** save photos and screenshots as **WebP** (or AVIF) and compress them with
[Squoosh](https://squoosh.app) to under ~200 KB each. All images below the hero are already lazy-loaded.

### Change the look

- **Colors:** edit the tokens at the top of [`src/index.css`](src/index.css). `--color-accent` is the single accent
  color. Light values are in `@theme`, and dark values are in the `@variant dark` block just below. Keep
  text contrast at 4.5:1 or higher (check with [WebAIM's contrast checker](https://webaim.org/resources/contrastchecker/)).
- **Fonts:** the site self-hosts [Geist and Geist Mono](https://fontsource.org/fonts/geist). To switch, install another
  `@fontsource-variable/...` package, import it in `src/main.jsx`, and update `--font-sans` / `--font-mono`.

---

## 3. The contact form

The form has no backend. It validates the fields and then opens the visitor's email app with the message
pre-filled (`mailto:`). To receive messages directly instead, the simplest free option is
[Formspree](https://formspree.io):

1. Create a form on Formspree and copy your endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
2. In [`src/components/ui/ContactForm.jsx`](src/components/ui/ContactForm.jsx), inside `handleSubmit`, keep the
   `const data = …` line. Replace everything after it (the `subject`, `body`, `window.location.href` and
   `setStatus` lines) with:

   ```js
   const response = await fetch('https://formspree.io/f/abcdwxyz', {
     method: 'POST',
     headers: { Accept: 'application/json' },
     body: new FormData(form),
   });
   setStatus(response.ok ? `Thanks, ${data.name}! Your message was sent.` : 'Sorry, something went wrong. Please email me instead.');
   if (response.ok) form.reset();
   ```

   Also change `const handleSubmit = (event) =>` to `const handleSubmit = async (event) =>`.

---

## 4. Deploy for free

> **Before you deploy:** set `site.url` in `portfolio.js` to your final address so link previews on
> Facebook, LinkedIn and other sites show your image. Redeploy whenever you change it.

The build uses relative paths, so the **same build works on all three hosts** with no config changes.

### Option A: Vercel (easiest)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), choose **Add New → Project**, and import the repo.
3. Vercel detects Vite automatically (build: `npm run build`, output: `dist`). Click **Deploy**.

Every `git push` redeploys automatically. Your URL will look like `https://your-project.vercel.app`.

### Option B: Netlify

1. Push to GitHub, then on [netlify.com](https://netlify.com) choose **Add new site → Import an existing project**.
2. Build command: `npm run build` · Publish directory: `dist` → **Deploy**.

(Or run `npm run build` and drag the `dist` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).)

### Option C: GitHub Pages

1. Push to a GitHub repository.
2. Create the file `.github/workflows/deploy.yml` with:

   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: pages
     cancel-in-progress: true

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v7
         - uses: actions/setup-node@v7
           with:
             node-version: lts/*
             cache: npm
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v5
           with:
             path: dist

     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - id: deployment
           uses: actions/deploy-pages@v5
   ```

3. In the repo, go to **Settings → Pages → Source** and pick **GitHub Actions**.
4. Push to `main`. The site appears at `https://<username>.github.io/<repo-name>/`.

---

## Project structure

```
├── index.html                 # HTML shell: SEO placeholders + no-flash theme script
├── vite.config.js             # Vite + a small plugin that fills SEO tags from portfolio.js
├── public/                    # Static files copied as-is (images, résumé, icons, og-image)
└── src/
    ├── data/portfolio.js      # ← all site content
    ├── index.css              # Tailwind setup, color tokens (light/dark), animations
    ├── main.jsx               # App entry: fonts, styles, React root
    ├── App.jsx                # Page layout: renders sections in data order
    ├── hooks/
    │   ├── useTheme.js        # Light/dark state, system preference, persistence
    │   ├── useActiveSection.js# Scroll-spy for the navbar
    │   └── useInView.js       # Shared IntersectionObserver for scroll reveals
    ├── lib/utils.js           # Small helpers (class names, asset paths)
    └── components/
        ├── layout/            # Navbar, Footer
        ├── sections/          # Hero, About, Skills, Projects, Experience, Contact
        └── ui/                # Button, Section, Reveal, ThemeToggle, ProjectCard, Timeline, …
```

## Accessibility & performance notes

- Semantic landmarks, one `<h1>`, a "Skip to content" link, visible focus styles, and labelled icon buttons
- Every menu, toggle and form field works with the keyboard alone. The mobile menu closes with <kbd>Esc</kbd>.
- Form errors appear only after the visitor interacts with a field. They're linked with `aria-describedby` and
  use an icon as well as color.
- Text meets WCAG AA contrast in both themes (checked with axe-core)
- No layout shift (CLS 0): images have fixed dimensions and lazy-load below the fold
- Fonts are self-hosted, and only the Latin subset downloads for English pages
