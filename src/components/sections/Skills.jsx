import { skills } from '../../data/portfolio';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

export default function Skills({ section }) {
  return (
    <Section {...section}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ category, icon: CategoryIcon, items }, i) => (
          <Reveal
            key={category}
            delay={i * 90}
            // On 2-column tablets, a lone last card spans the full row.
            className="rounded-2xl border border-line bg-surface p-6 sm:p-7 md:max-lg:[&:last-child:nth-child(odd)]:col-span-2"
          >
            <h3 className="flex items-center gap-3 font-semibold">
              {CategoryIcon && (
                <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
                  <CategoryIcon aria-hidden="true" className="size-[18px]" />
                </span>
              )}
              {category}
            </h3>

            <ul className="mt-6 flex flex-wrap gap-2">
              {items.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="group inline-flex items-center gap-2 rounded-lg border border-line bg-bg px-3 py-2 text-sm transition-colors duration-200 hover:border-accent/50"
                >
                  {Icon && (
                    <Icon
                      aria-hidden="true"
                      className="size-4 text-muted transition-colors duration-200 group-hover:text-accent"
                    />
                  )}
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
