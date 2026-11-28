'use client';

import { useEffect, useRef } from 'react';

const RADIUS = 150;
const BAND = 24;
const SHIFT = 14;
const OMEGA = 10;
const POSITION_EPSILON = 0.01;
const VELOCITY_EPSILON = 0.05;
const SCRAMBLE_GLYPHS = '_-/+=<>[]{}01';

type Offset = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function MagneticTitle({ text }: { text: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const offsetsRef = useRef<Offset[]>([]);
  const centersRef = useRef<Array<{ x: number; y: number }>>([]);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });
  const frameRef = useRef(0);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const fine = window.matchMedia('(pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || calm.matches) return;

    const letters = letterRefs.current.filter(
      (letter): letter is HTMLSpanElement => letter !== null,
    );
    if (letters.length === 0) return;

    const pointer = pointerRef.current;

    offsetsRef.current = letters.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }));

    let cancelled = false;
    let titleRect = title.getBoundingClientRect();
    let lastTime = 0;

    const measure = () => {
      titleRect = title.getBoundingClientRect();
      centersRef.current = letters.map((letter, index) => {
        const rect = letter.getBoundingClientRect();
        const offset = offsetsRef.current[index];
        return {
          x: rect.left - titleRect.left - offset.x + rect.width / 2,
          y: rect.top - titleRect.top - offset.y + rect.height / 2,
        };
      });
    };

    const tick = (now: number) => {
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
      lastTime = now;

      const inBand =
        pointer.active &&
        pointer.y >= titleRect.top - BAND &&
        pointer.y <= titleRect.bottom + BAND;
      let settled = true;

      for (let index = 0; index < letters.length; index += 1) {
        const offset = offsetsRef.current[index];
        const center = centersRef.current[index];
        let targetX = 0;
        let targetY = 0;

        if (inBand) {
          const deltaX = titleRect.left + center.x - pointer.x;
          const deltaY = titleRect.top + center.y - pointer.y;
          const distance = Math.hypot(deltaX, deltaY);

          if (distance < RADIUS) {
            const strength = (1 - distance / RADIUS) ** 2;
            const force = distance === 0 ? 0 : (SHIFT * strength) / distance;
            targetX = deltaX * force;
            targetY = deltaY * force;
          }
        }

        const displacementX = offset.x - targetX;
        const displacementY = offset.y - targetY;
        const decay = Math.exp(-OMEGA * dt);
        const tempX = (offset.vx + OMEGA * displacementX) * dt;
        const tempY = (offset.vy + OMEGA * displacementY) * dt;

        offset.x = targetX + (displacementX + tempX) * decay;
        offset.vx = (offset.vx - OMEGA * tempX) * decay;
        offset.y = targetY + (displacementY + tempY) * decay;
        offset.vy = (offset.vy - OMEGA * tempY) * decay;

        if (
          Math.abs(offset.vx) > VELOCITY_EPSILON ||
          Math.abs(offset.vy) > VELOCITY_EPSILON ||
          Math.abs(targetX - offset.x) > POSITION_EPSILON ||
          Math.abs(targetY - offset.y) > POSITION_EPSILON
        ) {
          settled = false;
        }

        letters[index].style.transform = `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`;
      }

      if (settled) {
        frameRef.current = 0;
        lastTime = 0;
        return;
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    const wake = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      wake();
    };

    const onPointerLeave = () => {
      pointer.active = false;
      wake();
    };

    const onResize = () => {
      measure();
      wake();
    };

    const onScroll = () => {
      titleRect = title.getBoundingClientRect();
      if (pointer.active) wake();
    };

    measure();
    document.fonts?.ready
      .then(() => {
        if (cancelled) return;
        measure();
        wake();
      })
      .catch(() => {});

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('blur', onPointerLeave);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelled = true;
      pointer.active = false;
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      letters.forEach((letter) => {
        letter.style.transform = '';
      });
    };
  }, []);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const letters = letterRefs.current.filter(
      (letter): letter is HTMLSpanElement => letter !== null,
    );
    if (letters.length === 0) return;

    const original = Array.from(text);
    let scrambleTimer = 0;
    let restoreTimer = 0;

    const restore = () => {
      if (scrambleTimer) {
        window.clearInterval(scrambleTimer);
        scrambleTimer = 0;
      }
      if (restoreTimer) {
        window.clearTimeout(restoreTimer);
        restoreTimer = 0;
      }
      letters.forEach((letter, index) => {
        const char = original[index] ?? '';
        letter.textContent = char === ' ' ? '\u00A0' : char;
      });
    };

    const paint = () => {
      letters.forEach((letter, index) => {
        if (original[index] === ' ') return;
        letter.textContent =
          SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)] ??
          '_';
      });
    };

    const onClick = () => {
      if (window.getSelection()?.toString()) return;
      restore();
      paint();
      scrambleTimer = window.setInterval(paint, 50);
      restoreTimer = window.setTimeout(restore, 320);
    };

    title.addEventListener('click', onClick);

    return () => {
      title.removeEventListener('click', onClick);
      if (scrambleTimer) window.clearInterval(scrambleTimer);
      if (restoreTimer) window.clearTimeout(restoreTimer);
    };
  }, [text]);

  return (
    <h1
      ref={titleRef}
      aria-label={text}
      className="text-[clamp(2.5rem,9vw,3.5rem)] font-semibold leading-none tracking-[-0.04em]"
    >
      {Array.from(text).map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          ref={(element) => {
            letterRefs.current[index] = element;
          }}
          aria-hidden="true"
          className="inline-block will-change-transform"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </h1>
  );
}
