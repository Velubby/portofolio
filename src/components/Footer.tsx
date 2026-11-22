export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-bg-secondary py-8 text-center text-xs text-text-muted">
      <div className="mx-auto max-w-5xl space-y-2 px-4">
        <p>© {new Date().getFullYear()} Achmad Ichwani. All rights reserved.</p>
        <p className="flex items-center justify-center gap-1.5 font-mono text-[10px] text-text-muted">
          Built with Next.js &amp; Tailwind CSS. Minimalist.
        </p>
      </div>
    </footer>
  );
}
