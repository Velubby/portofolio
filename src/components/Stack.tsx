const groups = [
  { term: 'Mobile', items: ['Flutter', 'Dart', 'Firebase'] },
  { term: 'Web', items: ['TypeScript', 'React', 'Next.js', 'Tailwind'] },
  { term: 'Backend', items: ['PHP', 'MySQL', 'Python'] },
  { term: 'Practices', items: ['OOP', 'SQL', 'Git'] },
];

export default function Stack() {
  return (
    <section id="stack" className="section border-t border-rule">
      <div className="wrap">
        <h2 className="label">02 — Stack</h2>
        <dl className="mt-2">
          {groups.map((group) => (
            <div
              key={group.term}
              className="grid grid-cols-[96px_1fr] gap-4 border-t border-rule-soft py-4 sm:grid-cols-[160px_1fr]"
            >
              <dt className="label">{group.term}</dt>
              <dd className="text-sm leading-relaxed">{group.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
