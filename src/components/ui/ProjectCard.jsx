import { LuArrowUpRight, LuGithub } from 'react-icons/lu';
import { asset, cx, externalLinkProps } from '../../lib/utils';

/**
 * Card for one project. `featured` cards get a wide, side-by-side layout
 * on large screens.
 */
export default function ProjectCard({ project, featured = false }) {
  const { name, description, tech = [], image, imageAlt, github, demo, demoLabel = 'Live demo' } = project;

  return (
    <article
      className={cx(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface',
        'transition-[border-color,box-shadow,translate] duration-300',
        'hover:border-accent/40 hover:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.18)] motion-safe:hover:-translate-y-1',
        featured && 'lg:grid lg:grid-cols-[3fr_2fr]',
      )}
    >
      {image && (
        <div className={cx('relative aspect-[16/10] overflow-hidden bg-subtle', featured && 'lg:aspect-auto lg:min-h-80')}>
          <img
            src={asset(image)}
            alt={imageAlt ?? `Screenshot of ${name}`}
            width="1200"
            height="750"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className={cx('flex flex-1 flex-col p-6', featured && 'sm:p-8 lg:p-10')}>
        {featured && (
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">Featured project</p>
        )}
        <h3 className={cx('font-semibold tracking-tight', featured ? 'text-2xl' : 'text-xl')}>{name}</h3>
        <p className="mt-3 text-muted">{description}</p>

        {tech.length > 0 && (
          <ul aria-label="Technologies used" className="mt-5 flex flex-wrap gap-2">
            {tech.map((item) => (
              <li key={item} className="rounded-md bg-subtle px-2 py-1 font-mono text-xs text-muted">
                {item}
              </li>
            ))}
          </ul>
        )}

        {(github || demo) && (
          <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6 text-sm font-medium">
            {github && (
              <a href={github} className="link-underline inline-flex items-center gap-1.5 hover:text-accent" {...externalLinkProps}>
                <LuGithub aria-hidden="true" className="size-4" />
                Source code
                <span className="sr-only"> for {name} (opens in a new tab)</span>
              </a>
            )}
            {demo && (
              <a href={demo} className="link-underline inline-flex items-center gap-1.5 hover:text-accent" {...externalLinkProps}>
                <LuArrowUpRight aria-hidden="true" className="size-4" />
                {demoLabel}
                <span className="sr-only"> for {name} (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
