'use client';
import { useEffect, useRef, useState } from 'react';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 40;
          const step = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="stat-number">{count.toLocaleString()}{suffix}</div>;
}

const STATS = [
  { value: 500, suffix: '+', label: 'Members' },
  { value: 48, suffix: '+', label: 'Active Chamas' },
  { value: 120, suffix: 'K', label: 'cUSD Saved' },
  { value: 100, suffix: '%', label: 'On-chain' },
];

export default function StatsBar() {
  return (
    <section className="py-10 px-5" style={{ borderTop: '1px solid rgba(53,208,127,0.1)', borderBottom: '1px solid rgba(53,208,127,0.1)' }}>
      <div className="max-w-sm mx-auto grid grid-cols-2 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <CountUp target={s.value} suffix={s.suffix} />
            <div className="text-sm mt-1 font-medium" style={{ color: '#8fb89a' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
