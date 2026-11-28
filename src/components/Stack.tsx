import CountUp from '@/components/CountUp';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeader from '@/components/SectionHeader';

const groups = [
  { term: 'Mobile', items: ['Flutter', 'Dart', 'Firebase'] },
  { term: 'Web', items: ['TypeScript', 'React', 'Next.js', 'Tailwind'] },
  { term: 'Backend', items: ['PHP', 'MySQL', 'Python'] },
];

export default function Stack() {
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <SectionHeader>
          <h2 className="label">Stack</h2>
          <p className="label hidden min-[480px]:block">
            <CountUp target={groups.length} suffix="groups" />
          </p>
        </SectionHeader>
        <dl className="section-body mt-2">
          {groups.map((group, index) => (
            <ScrollReveal
              key={group.term}
              className="grid grid-cols-1 gap-1 border-t border-rule-soft py-4 sm:grid-cols-[160px_1fr] sm:gap-4"
              stagger={index}
            >
              <dt className="label">{group.term}</dt>
              <dd className="text-sm leading-relaxed">{group.items.join(' · ')}</dd>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
