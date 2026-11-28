'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'li' | 'p' | 'span';
};

export default function ScrollReveal({
  children,
  className = '',
  stagger = 0,
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null);

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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    observer.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Catch elements that are already above the viewport, e.g. after a
    // deep link or a jump from the command palette.
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      check();
    });

    return stop;
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal-pending ${className}`}
      style={
        stagger
          ? ({ '--reveal-delay': `${stagger * 60}ms` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
