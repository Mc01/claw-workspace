import { useParams, Link } from 'react-router-dom';
import { useAccount, useChainId } from 'wagmi';
import {
  ArrowLeft, Users, Clock, User, ExternalLink,
  Target, TrendingUp, Loader2, AlertTriangle, CheckCircle,
  Coins, GraduationCap, Unlock, Sparkles,
} from 'lucide-react';
import { useChama, useJoinChama, useContribute, useRefund, useGraduate } from '../hooks/useChama';
import { formatAddress, formatAmount, formatDateTime, isExpired, getDaysRemaining, cn } from '../lib/utils';
import { getExplorerUrl } from '../config/contracts';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '../components/Toast';
import { useTokenAllowance } from '../hooks/useToken';
import { parseUnits } from 'viem';

/* ─── Ambient Background ─────────────────────────────────────────────── */
function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #7ABF42 0%, transparent 70%)',
          animation: 'ambientDrift 12s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)',
          animation: 'ambientDrift 16s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-80 rounded-full opacity-[0.05]"
        style={{
          background: 'radial-gradient(ellipse, #4A8025 0%, transparent 70%)',
          animation: 'ambientDrift 20s ease-in-out infinite 4s',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(196,232,106,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(196,232,106,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

/* ─── Animated Progress Bar ─────────────────────────────────────────── */
function AnimatedProgressBar({
  current,
  target,
  percentage,
}: {
  current: bigint | undefined;
  target: bigint | undefined;
  percentage: bigint | undefined;
}) {
  const pct = Number(percentage || 0);
  const isComplete = pct >= 100;
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayed(eased * Math.min(pct, 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [pct]);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-3">
        <span className="text-sand/60 font-medium">
          {current ? (Number(current) / 1e18).toFixed(2) : '0'} cUSD raised
        </span>
        <span className="text-sand/60">
          {target ? (Number(target) / 1e18).toFixed(2) : '0'} cUSD target
        </span>
      </div>

      <div className="relative w-full h-4 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className={cn(
            'h-full rounded-full relative overflow-hidden',
            isComplete
              ? 'bg-gradient-to-r from-sun-gold via-ochre to-sun-gold'
              : 'bg-gradient-to-r from-forest via-leaf to-lime'
          )}
          style={{ width: `${displayed}%`, transition: 'width 0.05s linear' }}
        >
          {pct > 0 && (
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                animation: 'shimmer 2s linear infinite',
              }}
            />
          )}
        </div>
        {!isComplete && pct > 0 && pct < 100 && (
          <div
            className="absolute top-0 h-full w-6 rounded-full blur-md opacity-70"
            style={{
              left: `calc(${displayed}% - 12px)`,
              background: 'rgba(122, 191, 66, 0.8)',
              transition: 'left 0.05s linear',
            }}
          />
        )}
      </div>

      <div className="flex justify-between items-center mt-2">
        <span className={cn('text-sm font-bold tabular-nums', isComplete ? 'text-sun-gold' : 'text-lime')}>
          {displayed.toFixed(1)}%
        </span>
        {isComplete && (
          <span className="flex items-center gap-1.5 text-xs text-sun-gold font-semibold animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Target Reached!
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Glass Stat Card ───────────────────────────────────────────────── */
function StatCard({
  icon,
  label,
  value,
  accent = false,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        'relative p-4 rounded-2xl border transition-all duration-500 group overflow-hidden cursor-default select-none backdrop-blur-xl',
        accent
          ? 'bg-lime/[0.06] border-lime/20 hover:bg-lime/[0.11] hover:border-lime/35'
          : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-sand/20',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{
        boxShadow: '0 0 0 1px rgba(255,255,255,0.02) inset, 0 4px 24px rgba(0,0,0,0.3)',
        transitionProperty: 'opacity, transform, background-color, border-color, box-shadow',
        transitionDuration: '400ms',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(122,191,66,0.06) 0%, transparent 70%)' }}
      />
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          {icon}
        </div>
        <span className="text-xs text-sand/50 font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-xl font-bold text-cream tabular-nums">{value}</p>
    </div>
  );
}

/* --- Animated Progress Bar --- */
function AnimatedProgressBar({
  current,
  target,
  percentage,
}: {
  current: bigint | undefined;
  target: bigint | undefined;
  percentage: bigint | undefined;
}) {
  const pct = Number(percentage || 0);
  const isComplete = pct >= 100;
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayed(eased * Math.min(pct, 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [pct]);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-3">
        <span className="text-sand/60 font-medium">
          {current ? (Number(current) / 1e18).toFixed(2) : '0'} cUSD raised
        </span>
        <span className="text-sand/60">
          {target ? (Number(target) / 1e18).toFixed(2) : '0'} cUSD target
        </span>
      </div>
      <div className="relative w-full h-4 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className={cn(
            'h-full rounded-full relative overflow-hidden',
            isComplete
              ? 'bg-gradient-to-r from-sun-gold via-ochre to-sun-gold'
              : 'bg-gradient-to-r from-forest via-leaf to-lime'
          )}
          style={{ width: `${displayed}%`, transition: 'width 0.05s linear' }}
        >
          {pct > 0 && (
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                animation: 'shimmer 2s linear infinite',
              }}
            />
          )}
        </div>
        {!isComplete && pct > 0 && pct < 100 && (
          <div
            className="absolute top-0 h-full w-6 rounded-full blur-md opacity-70"
            style={{
              left: `calc(${displayed}% - 12px)`,
              background: 'rgba(122, 191, 66, 0.8)',
              transition: 'left 0.05s linear',
            }}
          />
        )}
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className={cn('text-sm font-bold tabular-nums', isComplete ? 'text-sun-gold' : 'text-lime')}>
          {displayed.toFixed(1)}%
        </span>
        {isComplete && (
          <span className="flex items-center gap-1.5 text-xs text-sun-gold font-semibold animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Target Reached!
          </span>
        )}
      </div>
    </div>
  );
}
