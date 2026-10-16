import Reveal from './Reveal';
import { cx } from '../../lib/utils';

/**
 * Standard page section: numbered eyebrow, heading, optional intro, content.
 * Props come straight from the `sections` list in the data file.
 */
export default function Section({ id, index, nav, title, intro, className, children }) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cx('py-20 sm:py-28', className)}>
      <div className="wrapper">
        <Reveal as="header" className="mb-12 max-w-2xl sm:mb-16">
          {/* Decorative label: the heading below already names the section. */}
          <p aria-hidden="true" className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
            <span>{String(index).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-current opacity-50" />
            <span>{nav}</span>
          </p>
          <h2 id={headingId} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
        </Reveal>

        {children}
      </div>
    </section>
  );
}
