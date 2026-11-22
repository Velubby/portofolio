'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const pos = window.scrollY + 160;
      for (const { id } of links) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border/50 bg-white/80 backdrop-blur transition-colors duration-300 ${
        scrolled ? 'border-border' : 'border-transparent/50'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2 text-lg font-bold tracking-tight text-text-primary">
          <span className="text-accent">AI</span>
          <span>PORTFOLIO</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`text-sm font-medium transition-colors ${
                active === l.id ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-text-secondary transition hover:text-text-primary md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={`overflow-hidden transition-all duration-300 md:hidden ${open ? 'max-h-80' : 'max-h-0'}`}>
        <nav className="flex flex-col gap-1 border-t border-border/50 bg-white px-6 py-4 backdrop-blur" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className={`border-b border-border/50 py-2.5 text-base font-medium last:border-0 ${
                active === l.id ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
