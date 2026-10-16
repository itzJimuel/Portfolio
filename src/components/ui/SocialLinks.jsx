import { socials } from '../../data/portfolio';
import { cx, externalLinkProps, isExternal } from '../../lib/utils';

/** Row of round icon links built from `socials` in the data file. */
export default function SocialLinks({ className }) {
  return (
    <ul className={cx('flex flex-wrap items-center gap-2', className)}>
      {socials.map(({ label, url, icon: Icon }) => {
        const external = isExternal(url);
        return (
          <li key={label}>
            <a
              href={url}
              aria-label={external ? `${label} (opens in a new tab)` : label}
              title={label}
              className="grid size-10 place-items-center rounded-full border border-line text-muted transition-[color,border-color,translate] duration-200 hover:border-accent hover:text-accent motion-safe:hover:-translate-y-0.5"
              {...(external && externalLinkProps)}
            >
              <Icon aria-hidden="true" className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
