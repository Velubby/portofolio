import Link from 'next/link';

const links = [
  { id: 'work', label: 'work' },
  { id: 'stack', label: 'stack' },
  { id: 'contact', label: 'contact' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-canvas">
      <div className="wrap flex h-12 items-center justify-between">
        <Link href="/#top" className="label font-medium text-ink">
          velubby
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5">
          {links.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              className="label hover:text-ink hover:underline hover:underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
