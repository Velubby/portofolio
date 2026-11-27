import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="top" className="wrap flex-1 pb-12 pt-14 md:pb-16 md:pt-20">
        <p className="label">404</p>
        <h1 className="mt-4 text-[clamp(2rem,7vw,2.75rem)] font-semibold leading-none tracking-[-0.04em]">
          This page does not exist.
        </h1>
        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted text-pretty">
          The link is broken, or the page moved.
        </p>
        <Link href="/" className="label link mt-6 inline-flex items-center gap-1 py-1">
          <span aria-hidden="true">←</span> back to velubby
        </Link>
      </main>
      <Footer />
    </>
  );
}
