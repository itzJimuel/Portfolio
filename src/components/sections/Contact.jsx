import { useEffect, useState } from 'react';
import { LuCheck, LuCopy } from 'react-icons/lu';
import { profile } from '../../data/portfolio';
import ContactForm from '../ui/ContactForm';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SocialLinks from '../ui/SocialLinks';

const labelClass = 'font-mono text-xs tracking-wider text-muted uppercase';

/** Copies the email address and briefly confirms it. */
function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be unavailable (e.g. insecure context); the mailto link still works.
    }
  };

  const Icon = copied ? LuCheck : LuCopy;

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-muted hover:text-fg"
      >
        <Icon aria-hidden="true" className={copied ? 'size-4 text-success' : 'size-4'} />
        {copied ? 'Copied!' : 'Copy email'}
      </button>
      <span role="status" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </>
  );
}

export default function Contact({ section }) {
  return (
    <Section {...section}>
      <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <Reveal className="space-y-10">
          <div>
            <p className={labelClass}>Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-2 inline-block text-xl font-semibold tracking-tight break-words transition-colors hover:text-accent sm:text-2xl"
            >
              {profile.email}
            </a>
            <div>
              <CopyEmailButton email={profile.email} />
            </div>
          </div>

          <div>
            <p className={labelClass}>Location</p>
            <p className="mt-2 font-medium">{profile.location}</p>
          </div>

          <div>
            <p className={labelClass}>Elsewhere</p>
            <SocialLinks className="mt-3" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
