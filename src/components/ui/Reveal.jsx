import { useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { cx } from '../../lib/utils';

/**
 * Eases its children in the first time they scroll into view.
 * Purely visual: the content is always in the DOM, and visitors who prefer
 * reduced motion see it immediately (see `.reveal` in index.css).
 *
 * @param {string} [as='div'] - HTML tag to render (e.g. "li", "header").
 * @param {number} [delay=0]  - Stagger delay in milliseconds.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className, style, children, ...rest }) {
  const ref = useRef(null);
  const isVisible = useInView(ref);

  return (
    <Tag
      ref={ref}
      className={cx('reveal', isVisible && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
