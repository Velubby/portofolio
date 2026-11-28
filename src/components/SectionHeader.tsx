'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function SectionHeader({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      el.classList.add('revealed');
      return;
    }

    let frame = 0;
    let done = false;
    let observer: IntersectionObserver | null = null;

    const stop = () => {
      observer?.disconnect();
      observer = null;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const reveal = () => {
      if (done) return;
      done = true;
      el.classList.add('revealed');
      stop();
    };

    const check = () => {
      if (done) return;
      if (el.getBoundingClientRect().bottom < 0) reveal();
    };

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        check();
      });
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.4 },
    );

    observer.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Catch headers that are already above the viewport, e.g. after a
    // deep link or a jump from the command palette.
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      check();
    });

    return stop;
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-pending flex items-baseline justify-between gap-4 pb-2.5 ${className}`}
    >
      {children}
    </div>
  );
}
