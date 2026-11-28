'use client';

import { useEffect, useState } from 'react';

const pad = (value: number) => String(value).padStart(2, '0');

const format = (date: Date) =>
  `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

export default function LocalClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="label flex items-baseline gap-2">
      <span>local</span>{' '}
      <time className="tabular-nums text-ink" dateTime={now?.toISOString()}>
        {now ? format(now) : '--:--:--'}
      </time>
    </p>
  );
}
