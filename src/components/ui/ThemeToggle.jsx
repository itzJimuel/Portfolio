import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '../../hooks/useTheme';
import { cx } from '../../lib/utils';

/** Icon button that flips between light and dark themes. */
export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const Icon = theme === 'dark' ? LuSun : LuMoon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className={cx(
        'grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-subtle hover:text-fg',
        className,
      )}
    >
      <Icon key={theme} aria-hidden="true" className="size-[18px] motion-safe:animate-rise" />
    </button>
  );
}
