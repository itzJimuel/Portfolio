import { useEffect, useState } from 'react';

/**
 * Scroll-spy: returns the id of the section currently crossing a thin line
 * ~40% down the viewport, so the navbar can highlight the matching link.
 * Pass a stable array (defined outside the component) to avoid re-subscribing.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -59% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
