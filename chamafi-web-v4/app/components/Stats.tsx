"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, label, prefix = "", suffix = "", color, delay }: {
  value: number; label: string; prefix?: string; suffix?: string; color: string; delay: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 2200, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      flex: "1 1 200px",
      padding: "32px 28px",
      borderRadius: 24,
      background: "rgba(255,255,255,0.04)",
      backdropFilter: "blur(30px)",
      WebkitBackdropFilter: "blur(30px)",
      border: "1px solid rgba(255,255,255,0.08)",
      textAlign: "center",
      transition: "all 0.3s ease",
      cursor: "default",
      animationDelay: `${delay}ms`,
      position: "relative",
      overflow: "hidden",
    }}
    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.borderColor = "rgba(255,255,255,0.2)"; el.style.boxShadow = `0 20px 60px ${color}25`; }}
    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.boxShadow = "none"; }}
    >
      {/* Gradient top line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <div style={{
        fontSize: "clamp(36px,5vw,52px)",
        fontWeight: 900,
        letterSpacing: "-1px",
        marginBottom: 8,
        background: `linear-gradient(135deg, ${color}, white)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontVariantNumeric: "tabular-nums",
      }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", fontWeight: 500, letterSpacing: "0.02em" }}>
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  const stats = [
    { value: 12400, label: "Active Members", prefix: "", suffix: "+", color: "#a78bfa" },
    { value: 2800000, label: "cUSD Saved", prefix: "$", suffix: "", color: "#60a5fa" },
    { value: 890, label: "Savings Circles", prefix: "", suffix: "+", color: "#f472b6" },
    { value: 99, label: "Uptime", prefix: "", suffix: "%", color: "#34d399" },
  ];

  return (
    <section id="stats" style={{ position: "relative", zIndex: 10, padding: "0 24px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.5),rgba(236,72,153,0.5),transparent)", marginBottom: 64 }} />

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
