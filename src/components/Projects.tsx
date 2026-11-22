'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { projects, projectFilters, type Project } from '@/data/projects';

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="min-card p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
          {p.category}
        </span>
        <div className="flex gap-2 text-text-muted">
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub Code" className="transition hover:text-accent">
            <Github className="h-4 w-4" />
          </a>
          <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" title="Live Link" className="transition hover:text-accent">
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-1">{p.title}</h3>
      <p className="text-sm text-text-secondary mb-4 leading-relaxed">{p.description}</p>
      {p.imagePath && (
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-gray-50 mb-4">
          <Image
            src={p.imagePath}
            alt={`${p.title} Screenshot`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {p.tech.map((tag) => (
          <span key={tag} className="min-badge text-[11px] border text-text-muted">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<'All' | 'Web App' | 'Mobile App' | 'Python Tool'>('All');
  const filtered = projects.filter((p) => filter === 'All' || p.category === filter);

  return (
    <section id="projects" className="py-20 border-b border-border/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="section-head mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="section-kicker">Selected Work — 03</span>
            <h2 className="section-title">What I&apos;ve Built</h2>
          </div>
          <div className="flex flex-wrap gap-2 border border-border rounded-xl px-2 py-1 bg-white">
            {projectFilters.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  filter === tab
                    ? 'bg-accent text-white border-accent'
                    : 'text-text-secondary hover:text-text-primary border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-text-muted">
            No projects in this category yet — more builds coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
