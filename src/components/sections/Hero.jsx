import { LuArrowRight, LuMapPin } from 'react-icons/lu';
import { profile } from '../../data/portfolio';
import { cx } from '../../lib/utils';
import Button from '../ui/Button';
import SocialLinks from '../ui/SocialLinks';

/**
 * Staggered entrance animation for hero elements.
 * `motion-safe:` means it is skipped entirely when reduced motion is preferred.
 */
const rise = (step, className) => ({
  className: cx('motion-safe:animate-rise', className),
  style: { animationDelay: `${step * 90}ms` },
});

export default function Hero() {
  return (
    // Pulled up by the navbar's height (-mt-16 / pt-16) so the background
    // continues behind the transparent navbar instead of stopping at its edge.
    <section id="top" aria-labelledby="hero-heading" className="relative isolate -mt-16 overflow-hidden pt-16">
      {/* Decorative background: dotted grid + soft accent glow */}
      <div aria-hidden="true" className="bg-dot-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute -top-48 -right-40 -z-10 size-[36rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="wrapper flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20 sm:py-28">
        {profile.availability && (
          <p
            {...rise(
              0,
              'mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-sm text-muted backdrop-blur-sm',
            )}
          >
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-success motion-safe:animate-soft-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {profile.availability}
          </p>
        )}

        <h1
          id="hero-heading"
          {...rise(1, 'text-5xl leading-[0.95] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-8xl')}
        >
          {profile.name}
        </h1>

        <p {...rise(2, 'mt-5 text-xl font-medium tracking-tight text-accent sm:text-3xl')}>{profile.role}</p>

        <p {...rise(3, 'mt-6 max-w-2xl text-lg text-muted sm:text-xl')}>{profile.tagline}</p>

        <div {...rise(4, 'mt-10 flex flex-wrap gap-3')}>
          <Button href="#projects" size="lg">
            View Projects
            <LuArrowRight aria-hidden="true" />
          </Button>
          <Button href="#contact" variant="secondary" size="lg">
            Contact Me
          </Button>
        </div>

        <div {...rise(5, 'mt-14 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-muted')}>
          <p className="inline-flex items-center gap-2">
            <LuMapPin aria-hidden="true" className="size-4 text-accent" />
            {profile.location}
          </p>
          <span aria-hidden="true" className="hidden h-4 w-px bg-line sm:block" />
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
