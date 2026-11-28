'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

type Props = {
  target: number;
  suffix: string;
  className?: string;
};

const format = (value: number, suffix: string) =>
  `${String(value).padStart(2, '0')} ${suffix}`;

export default function CountUp({ target, suffix, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(format(0, suffix));

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      return;
    }

    let frame = 0;

    const animate = () => {
      const duration = 900;
      let start: number | null = null;

      const step = (now: number) => {
        if (start === null) start = now;
        const progress = Math.min((now - start) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplay(format(Math.round(eased * target), suffix));

        if (progress < 1) {
          frame = window.requestAnimationFrame(step);
        }
      };

      frame = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          el.classList.add('counting-enabled');
          animate();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      el.classList.remove('counting-enabled');
    };
  }, [target, suffix]);

  return (
    <span ref={ref} className={`count-up ${className}`}>
      <span className="sr-only">{format(target, suffix)}</span>
      <span aria-hidden="true" className="count-static">
        {format(target, suffix)}
      </span>
      <span aria-hidden="true" className="count-live">
        {display}
      </span>
    </span>
  );
}
