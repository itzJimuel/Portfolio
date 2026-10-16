import { useEffect, useState } from 'react';

/*
 * One IntersectionObserver is shared by every element on the page (cheaper
 * than one observer each). Elements are un-observed after their first
 * appearance because the reveal animation only plays once.
 */
const callbacks = new WeakMap();
let sharedObserver;

function getObserver() {
  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        sharedObserver.unobserve(entry.target);
      }
    },
    // Trigger slightly before the element's top edge reaches the bottom of the screen.
    { rootMargin: '0px 0px -8% 0px' },
  );
  return sharedObserver;
}

/** Returns true once the referenced element has scrolled into view. */
export function useInView(ref) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = getObserver();
    callbacks.set(element, () => setInView(true));
    observer.observe(element);

    return () => {
      callbacks.delete(element);
      observer.unobserve(element);
    };
  }, [ref]);

  return inView;
}
