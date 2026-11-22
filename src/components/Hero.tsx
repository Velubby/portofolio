import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/data/profile';

export default function Hero() {
  return (
    <section id="home" className="relative py-20 md:py-32 border-b border-border/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="min-badge">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {profile.badge}
        </span>

        <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-text-primary">
          Achmad Ichwani
        </h1>

        <p className="mt-2 text-xl font-medium text-text-secondary">
          {profile.role}
        </p>

        <p className="mt-6 max-w-xl mx-auto text-text-muted leading-relaxed">
          7th-semester Informatics Engineering student at Universitas Duta Bangsa Surakarta.
          I build clean Flutter apps and responsive web tools.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#projects" className="min-btn-primary">
            View My Projects
            <ArrowDown className="h-4 w-4" />
          </a>
          <a href="#contact" className="min-btn-outline">
            Say Hello
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-xs font-medium text-text-muted">
          {[
            { icon: <Github className="h-4 w-4" />, href: profile.githubUrl, label: 'GitHub' },
            { icon: <Linkedin className="h-4 w-4" />, href: profile.linkedinUrl, label: 'LinkedIn' },
            { icon: <Mail className="h-4 w-4" />, href: `mailto:${profile.email}`, label: profile.email },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border border-border px-3 py-1.5 text-text-secondary transition hover:border-accent hover:text-accent"
            >
              {s.icon} {s.label}
            </a>
          ))}
          <span className="hidden sm:inline">{profile.location}</span>
        </div>

        <div className="mt-12 relative">
          <Image
            src={profile.avatar}
            alt="Achmad Ichwani"
            width={560}
            height={560}
            className="mx-auto rounded-2xl border border-border object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
