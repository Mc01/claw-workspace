'use client';

import { useEffect, useRef, useState } from 'react';

function AnimatedNumber({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{ display: 'inline' }}>
      {prefix}{value.toLocaleString()}{suffix}
    </div>
  );
}

const stats = [
  { value: 2400000, label: 'Total Value Locked', prefix: '$', suffix: '', display: '$2.4M' },
  { value: 12847, label: 'Active Members', prefix: '', suffix: '+', display: '12,847+' },
  { value: 340, label: 'Active Chamas', prefix: '', suffix: '+', display: '340+' },
  { value: 98, label: 'Payout Success Rate', prefix: '', suffix: '%', display: '98%' },
];

export default function Stats() {
  return (
    <section style={{
      padding: '80px 5%',
      background: 'rgba(255,215,0,0.02)',
      borderTop: '1px solid rgba(255,215,0,0.08)',
      borderBottom: '1px solid rgba(255,215,0,0.08)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, rgba(255,215,0,0.03) 0%, rgba(0,212,170,0.02) 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '40px',
        position: 'relative',
        zIndex: 1,
      }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            textAlign: 'center',
            padding: '24px',
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}>
            <div style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: '800',
              background: i % 2 === 0
                ? 'linear-gradient(135deg, #FFD700, #FFF3A3)'
                : 'linear-gradient(135deg, #00D4AA, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              marginBottom: '8px',
              letterSpacing: '-1px',
            }}>
              {s.prefix}
              <AnimatedNumber
                target={s.value > 1000 ? Math.round(s.value / (s.value >= 1000000 ? 1000000 : 1)) : s.value}
                suffix={s.value >= 1000000 ? 'M' : s.suffix}
              />
            </div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', fontWeight: '500' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
