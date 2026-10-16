import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { site, profile, socials } from './src/data/portfolio.js';

/**
 * Fills the SEO / Open Graph placeholders in index.html (e.g. %%SITE_TITLE%%)
 * from src/data/portfolio.js, so page metadata is edited in the same place as
 * the rest of the content. It also adds JSON-LD "Person" structured data.
 */
function portfolioMeta() {
  // Social previews need absolute URLs, so resolve paths against the site URL.
  const siteUrl = site.url.endsWith('/') ? site.url : `${site.url}/`;
  const absolute = (path) => new URL(path, siteUrl).href;

  const values = {
    TITLE: site.title,
    DESCRIPTION: site.description,
    AUTHOR: profile.name,
    URL: siteUrl,
    LOCALE: site.locale,
    OG_IMAGE: absolute(site.ogImage),
    OG_IMAGE_ALT: site.ogImageAlt,
  };

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    homeLocation: { '@type': 'Place', name: profile.location },
    sameAs: socials.map((s) => s.url).filter((url) => url.startsWith('http')),
  };

  return {
    name: 'portfolio-meta',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return {
          html: html.replace(/%%SITE_(\w+)%%/g, (match, key) =>
            key in values ? escapeHtml(values[key]) : match,
          ),
          tags: [
            {
              tag: 'script',
              attrs: { type: 'application/ld+json' },
              // Escape "<" so the JSON can never close the script tag early.
              children: JSON.stringify(person).replace(/</g, '\\u003c'),
              injectTo: 'head',
            },
          ],
        };
      },
    },
  };
}

export default defineConfig({
  // A relative base lets the same build work on Vercel, Netlify and
  // GitHub Pages (which serves project sites from a sub-path).
  base: './',
  plugins: [react(), tailwindcss(), portfolioMeta()],
});
