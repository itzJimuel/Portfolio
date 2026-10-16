import { useEffect, useRef, useState } from 'react';
import { LuDownload, LuMenu, LuX } from 'react-icons/lu';
import { profile, sections } from '../../data/portfolio';
import { useActiveSection } from '../../hooks/useActiveSection';
import { asset, cx } from '../../lib/utils';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';

// Stable list for the scroll-spy ("top" = hero, so nothing is highlighted there).
const SECTION_IDS = ['top', ...sections.map((s) => s.id)];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);
  const activeId = useActiveSection(SECTION_IDS);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Give the bar a background and border once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the mobile menu is open: close on Escape, outside tap, or desktop resize.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 48rem)');
    const onBreakpoint = (event) => event.matches && setMenuOpen(false);

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const resumeUrl = asset(profile.resume);

  return (
    <header
      ref={headerRef}
      className={cx(
        'sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300',
        scrolled || menuOpen ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent',
      )}
    >
      <nav aria-label="Main" className="wrapper flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2.5 font-semibold tracking-tight whitespace-nowrap">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-fg font-mono text-xs text-bg transition-colors group-hover:bg-accent group-hover:text-accent-fg"
          >
            {profile.initials}
          </span>
          {profile.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {sections.map(({ id, nav }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={activeId === id ? 'true' : undefined}
                className={cx(
                  'rounded-full px-3 py-1.5 text-sm transition-colors',
                  activeId === id ? 'bg-subtle text-fg' : 'text-muted hover:text-fg',
                )}
              >
                {nav}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {profile.resume && (
            <Button href={resumeUrl} download variant="secondary" size="sm" className="max-sm:hidden">
              <LuDownload aria-hidden="true" />
              Résumé
            </Button>
          )}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-9 place-items-center rounded-full text-fg transition-colors hover:bg-subtle md:hidden"
          >
            {menuOpen ? <LuX aria-hidden="true" className="size-5" /> : <LuMenu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu (hidden from everyone, including screen readers, when closed) */}
      <div id="mobile-menu" hidden={!menuOpen} className="border-t border-line md:hidden motion-safe:animate-menu-in">
        <ul className="wrapper flex flex-col py-3">
          {sections.map(({ id, nav }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={closeMenu}
                aria-current={activeId === id ? 'true' : undefined}
                className={cx(
                  'flex items-center justify-between py-3 text-lg',
                  activeId === id ? 'font-medium text-accent' : 'text-fg',
                )}
              >
                {nav}
              </a>
            </li>
          ))}
          {profile.resume && (
            <li className="mt-2 border-t border-line pt-4 pb-2">
              <a href={resumeUrl} download onClick={closeMenu} className="inline-flex items-center gap-2 text-lg text-fg">
                <LuDownload aria-hidden="true" className="size-5 text-accent" />
                Download résumé
              </a>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
