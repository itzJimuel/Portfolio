/** Joins class names, skipping falsy values: cx('a', isOn && 'b') → "a b". */
export const cx = (...classes) => classes.filter(Boolean).join(' ');

/** True for links that leave the site (http/https). */
export const isExternal = (url) => /^https?:\/\//i.test(url ?? '');

/** Attributes for links that open in a new tab safely. */
export const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' };

/**
 * Resolves a file in /public (e.g. "images/profile.webp") against the site's
 * base path, so it also works when hosted in a sub-folder (GitHub Pages).
 * Full URLs, mailto: and data: links are returned unchanged.
 */
export function asset(path) {
  if (!path || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
