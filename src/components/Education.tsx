'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, Code, Cpu, Database, ShieldCheck } from 'lucide-react';
import { courseCategories } from '@/data/courses';
import { profile } from '@/data/profile';

const icons = [
  <Code key="0" className="h-5 w-5 text-text-secondary" />,
  <Cpu key="1" className="h-5 w-5 text-text-secondary" />,
  <Database key="2" className="h-5 w-5 text-text-secondary" />,
  <ShieldCheck key="3" className="h-5 w-5 text-text-secondary" />,
];

export default function Education() {
  const [open, setOpen] = useState<string | null>('Software Engineering & Programming');

  return (
    <section id="education" className="py-20 border-b border-border/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="section-head">
          <span className="section-kicker">Chapter 04 — Education</span>
          <h2 className="section-title">Studying the craft.</h2>
          <div className="section-rule" />
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-[5fr_7fr]">
          <div className="space-y-6">
            <div className="min-card p-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-text-primary">Universitas Duta Bangsa Surakarta</h3>
                  <p className="text-xs font-semibold text-text-secondary">Bachelor of Informatics Engineering</p>
                </div>
                <span className="min-badge bg-accent text-white border-accent">
                  {profile.semester}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 text-xs text-text-muted leading-relaxed">
                <p>Currently focused on mobile software development and distributed network structures.</p>
                <div className="mt-3 flex items-center gap-2 text-text-muted">
                  <BookOpen className="h-3.5 w-3.5 text-text-secondary" />
                  <span>39 Core Courses Completed</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-text-muted">
              Curriculum Categories — click to toggle
            </h3>
            <div className="space-y-3">
              {courseCategories.map((cat, i) => {
                const isOpen = open === cat.title;
                return (
                  <div key={cat.title} className="min-card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : cat.title)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between p-4 text-left transition hover:bg-bg-tertiary"
                    >
                      <span className="flex items-center gap-3">
                        {icons[i]}
                        <span className="text-sm font-bold text-text-primary">{cat.title}</span>
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-border/50 bg-bg-tertiary/50">
                        <div className="grid gap-2 sm:grid-cols-2">
                          {cat.courses.map((course) => (
                            <div key={course} className="flex items-center gap-2 py-0.5 text-sm text-text-secondary">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              {course}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
