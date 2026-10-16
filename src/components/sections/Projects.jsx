import { projects } from '../../data/portfolio';
import { cx } from '../../lib/utils';
import ProjectCard from '../ui/ProjectCard';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

// Featured projects first; otherwise keep the order from the data file.
const orderedProjects = [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

export default function Projects({ section }) {
  return (
    <Section {...section}>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orderedProjects.map((project, i) => (
          <Reveal
            as="li"
            key={project.name}
            delay={project.featured ? 0 : (i % 3) * 90}
            className={cx(project.featured && 'md:col-span-2 lg:col-span-3')}
          >
            <ProjectCard project={project} featured={project.featured} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
