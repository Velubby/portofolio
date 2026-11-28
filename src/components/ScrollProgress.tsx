'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;
    let cancelled = false;

    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      const progress = max > 0 ? Math.min(Math.max(root.scrollTop / max, 0), 1) : 0;
      bar.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    const fonts = document.fonts;
    if (fonts) {
      fonts.ready
        .then(() => {
          if (!cancelled) schedule();
        })
        .catch(() => {});
    }

    return () => {
      cancelled = true;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px overflow-hidden">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-ink will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
