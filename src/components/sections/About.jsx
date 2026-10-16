import { LuArrowRight, LuDownload } from 'react-icons/lu';
import { about, profile } from '../../data/portfolio';
import { asset } from '../../lib/utils';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

export default function About({ section }) {
  const { photo } = profile;

  return (
    <Section {...section}>
      <div className="grid items-start gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
        {/* Photo with an offset accent frame */}
        <Reveal className="relative mx-auto w-full max-w-sm md:mx-0">
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-accent/50" />
          <img
            src={asset(photo.src)}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
            className="relative aspect-[4/5] w-full rounded-2xl bg-subtle object-cover"
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-5 text-lg leading-relaxed text-muted [&>p:first-child]:text-fg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {about.facts?.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 border-t border-l border-line sm:grid-cols-4">
              {about.facts.map(({ label, value }) => (
                <div key={label} className="border-r border-b border-line p-4">
                  <dt className="font-mono text-xs tracking-wider text-muted uppercase">{label}</dt>
                  <dd className="mt-1.5 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            {profile.resume && (
              <Button href={asset(profile.resume)} download>
                <LuDownload aria-hidden="true" />
                Download Résumé
              </Button>
            )}
            <Button href="#contact" variant="ghost">
              Get in touch
              <LuArrowRight aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
