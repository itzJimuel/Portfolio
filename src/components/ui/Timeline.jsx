import Reveal from './Reveal';

/**
 * Vertical timeline of roles or schools, newest first.
 * Each item: { title, org, location?, period, description?, highlights? }.
 *
 * @param {boolean} [hideTitle] - Keep the heading for screen readers only
 *   (used when the section heading already says the same thing).
 */
export default function Timeline({ title, icon: Icon, items, hideTitle = false }) {
  if (!items?.length) return null;

  return (
    <div>
      <h3 className={hideTitle ? 'sr-only' : 'mb-8 flex items-center gap-3 text-lg font-semibold'}>
        <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
          <Icon aria-hidden="true" className="size-[18px]" />
        </span>
        {title}
      </h3>

      {/* The left border is the timeline line; it sits under the icon's center. */}
      <ol className="ml-[1.125rem] space-y-10 border-l border-line pl-8">
        {items.map((item, i) => (
          <Reveal as="li" key={`${item.title}-${item.period}`} delay={i * 80} className="relative flex flex-col">
            <span
              aria-hidden="true"
              className="absolute top-1 left-[calc(-2rem-5px)] size-[9px] rounded-full border-2 border-accent bg-bg"
            />
            <h4 className="mt-2 text-lg font-semibold tracking-tight">{item.title}</h4>
            <p className="text-muted">
              {item.org}
              {item.location && <span> · {item.location}</span>}
            </p>
            {/* Shown above the title visually, but read after it by screen readers. */}
            <p className="order-first font-mono text-xs tracking-wider text-muted uppercase">{item.period}</p>

            {item.description && <p className="mt-3 text-muted">{item.description}</p>}

            {item.highlights?.length > 0 && (
              <ul className="mt-3 space-y-1.5 text-muted">
                {item.highlights.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
