import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

/*
 * Light/dark theme state.
 *
 * - No saved value  → follow the system preference (the default).
 * - Saved "light"/"dark" → a manual override, stored in localStorage.
 *
 * The toggle always flips what the visitor currently sees. If that lands on
 * the same theme as the system, the override is removed instead of saved, so
 * the site goes back to following the system automatically.
 * The inline script in index.html applies a saved override before first paint.
 */

const STORAGE_KEY = 'theme';
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

const getSystemTheme = () => (darkQuery.matches ? 'dark' : 'light');

function subscribeToSystemTheme(onChange) {
  darkQuery.addEventListener('change', onChange);
  return () => darkQuery.removeEventListener('change', onChange);
}

function readSavedTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null; // Storage can be blocked; fall back to the system theme.
  }
}

function saveTheme(value) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Not persisted, but still applied for this visit.
  }
}

/** Reflects the override (or null = follow system) onto <html> and the meta tags. */
function applyTheme(saved) {
  const root = document.documentElement;
  if (saved) root.dataset.theme = saved;
  else delete root.dataset.theme;

  document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', saved ?? 'light dark');

  // Tint the mobile browser toolbar to match the page background.
  const background = getComputedStyle(root).getPropertyValue('--color-bg').trim();
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.dataset.default ??= meta.content;
    meta.content = saved && background ? background : meta.dataset.default;
  });
}

export function useTheme() {
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme);
  const [savedTheme, setSavedTheme] = useState(readSavedTheme);

  // Sync the toolbar color on load, and follow changes made in other tabs.
  useEffect(() => {
    applyTheme(readSavedTheme());

    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      const next = readSavedTheme();
      applyTheme(next);
      setSavedTheme(next);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const theme = savedTheme ?? systemTheme;

  const toggleTheme = useCallback(() => {
    const target = theme === 'dark' ? 'light' : 'dark';
    const next = target === getSystemTheme() ? null : target;

    saveTheme(next);
    setSavedTheme(next);

    // Cross-fade between themes where supported, unless motion is reduced.
    const update = () => applyTheme(next);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !reduceMotion) document.startViewTransition(update);
    else update();
  }, [theme]);

  return { theme, toggleTheme };
}
