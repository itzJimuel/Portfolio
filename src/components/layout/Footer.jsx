import { LuArrowUp } from 'react-icons/lu';
import { profile } from '../../data/portfolio';
import SocialLinks from '../ui/SocialLinks';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="wrapper flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-muted sm:text-left">
          © {year} {profile.name}. Built with React &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          <SocialLinks />
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            Back to top
            <LuArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
