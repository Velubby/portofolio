import { CheckCircle2, Cpu, Smartphone, Terminal } from 'lucide-react';

const skillGroups = [
  {
    title: 'Mobile App Development',
    icon: <Smartphone className="h-4 w-4 text-text-secondary" />,
    skills: ['Flutter Framework', 'Dart Language', 'Firebase Integration', 'Material & Cupertino UI', 'OOP Principles'],
  },
  {
    title: 'Web & Database Setup',
    icon: <Terminal className="h-4 w-4 text-text-secondary" />,
    skills: ['PHP Programming', 'MySQL / SQL databases', 'HTML5 & CSS3', 'JavaScript (ES6)', 'Bootstrap / Tailwind'],
  },
  {
    title: 'Informatics Engineering Basics',
    icon: <Cpu className="h-4 w-4 text-text-secondary" />,
    skills: ['Data Structures', 'Relational Databases', 'Computer Networking', 'Python Scripts', 'Systems Security'],
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 border-b border-border/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="section-head">
          <span className="section-kicker">Chapter 01 — About</span>
          <h2 className="section-title">I build what I study.</h2>
          <div className="section-rule" />
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <div className="space-y-5">
            <p className="text-text-muted leading-relaxed">
              I am a technology-focused student in my 7th semester at Universitas Duta Bangsa
              Surakarta, building functional mobile apps and modern web tools with a solid
              grounding in software engineering.
            </p>
            <p className="text-text-muted leading-relaxed">
              I enjoy solving complex logic puzzles and writing clean, structured codebases —
              from OOP architectures and database normalization to cross-platform UI systems.
            </p>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">Technical Stack</h3>
            <div className="space-y-6">
              {skillGroups.map((g) => (
                <div key={g.title}>
                  <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-text-primary">
                    {g.icon} {g.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {g.skills.map((s) => (
                      <span key={s} className="min-badge">
                        <CheckCircle2 className="mr-1.5 h-3 w-3 text-accent" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
