import { cx } from '../../lib/utils';

const base =
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap ' +
  'transition-[background-color,border-color,color,translate,box-shadow] duration-200 ' +
  'motion-safe:hover:-translate-y-0.5 [&>svg]:size-[1.1em]';

const variants = {
  primary:
    'bg-accent text-accent-fg hover:bg-accent-hover hover:shadow-[0_10px_30px_-12px_var(--color-accent)]',
  secondary: 'border border-line bg-surface text-fg hover:border-muted',
  ghost: 'text-fg hover:bg-subtle',
};

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-12 px-6 text-base',
};

/**
 * A pill-shaped button. Renders an <a> when given `href`, otherwise a <button>.
 *
 * @param {'primary'|'secondary'|'ghost'} [variant='primary']
 * @param {'sm'|'md'|'lg'} [size='md']
 */
export default function Button({ href, variant = 'primary', size = 'md', className, children, ...props }) {
  const classes = cx(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
