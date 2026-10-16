import { LuBriefcase, LuGraduationCap } from 'react-icons/lu';
import { education, experience } from '../../data/portfolio';
import { cx } from '../../lib/utils';
import Section from '../ui/Section';
import Timeline from '../ui/Timeline';

export default function Experience({ section }) {
  // Two columns when both lists have entries; otherwise one readable column.
  const twoColumns = experience.length > 0 && education.length > 0;

  return (
    <Section {...section}>
      <div className={cx('grid gap-14', twoColumns ? 'lg:grid-cols-2 lg:gap-16' : 'max-w-3xl')}>
        <Timeline title="Experience" icon={LuBriefcase} items={experience} hideTitle={!twoColumns} />
        <Timeline title="Education" icon={LuGraduationCap} items={education} hideTitle={!twoColumns} />
      </div>
    </Section>
  );
}
