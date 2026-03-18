import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import type { ReactNode } from 'react';

// ─── useCountUp Hook ────────────────────────────────────────────────────────
// Animates a number from 0 to the target value on mount
export function useCountUp(target: number, duration = 1.2, delay = 0) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => setDisplay(v));
    const controls = animate(motionVal, target, {
      duration,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [target, duration, delay]);

  return display;
}

// ─── AnimatedNumber ─────────────────────────────────────────────────────────
// Renders a number that counts up from 0 to value
export function AnimatedNumber({
  value,
  duration = 1.2,
  delay = 0,
  className,
}: {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const count = useCountUp(value, duration, delay);
  return <span className={className}>{count}</span>;
}

// ─── FocusRing ───────────────────────────────────────────────────────────────
// Animated focus ring for form inputs (wrap around input containers)
export function FocusRing({
  children,
  isFocused,
  hasError = false,
  className,
}: {
  children: ReactNode;
  isFocused: boolean;
  hasError?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className || ''}`}>
      {children}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: isFocused
            ? hasError
              ? '0 0 0 2px rgba(239,68,68,0.6), 0 0 16px rgba(239,68,68,0.15)'
              : '0 0 0 2px rgba(196,232,106,0.6), 0 0 16px rgba(196,232,106,0.15)'
            : '0 0 0 0px rgba(196,232,106,0)',
          opacity: isFocused ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </div>
  );
}

// ─── StaggerGrid ─────────────────────────────────────────────────────────────
// Drop-in grid with staggered card reveals (whileInView)
export function StaggerGrid({
  children,
  className,
  staggerDelay = 0.08,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay, delayChildren: 0.05 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerGridItem ─────────────────────────────────────────────────────────
export function StaggerGridItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StatReveal ──────────────────────────────────────────────────────────────
// Reveals a stat card with slide-up + fade, triggered by viewport entry
export function StatReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── ProgressShimmer ─────────────────────────────────────────────────────────
// Animated progress bar with a running shimmer overlay (framer-motion driven)
export function ProgressShimmer({
  percentage,
  isComplete = false,
  className,
}: {
  percentage: number;
  isComplete?: boolean;
  className?: string;
}) {
  const clampedPct = Math.min(Math.max(percentage, 0), 100);
  return (
    <div className={`relative w-full h-4 rounded-full overflow-hidden bg-white/[0.06] ${className || ''}`}>
      <motion.div
        className={`h-full rounded-full relative overflow-hidden ${
          isComplete
            ? 'bg-gradient-to-r from-sun-gold via-ochre to-sun-gold'
            : 'bg-gradient-to-r from-forest via-leaf to-lime'
        }`}
        initial={{ width: '0%' }}
        animate={{ width: `${clampedPct}%` }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {clampedPct > 0 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '150%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
          />
        )}
      </motion.div>
      {/* Glow tip */}
      {!isComplete && clampedPct > 0 && clampedPct < 100 && (
        <motion.div
          className="absolute top-0 h-full w-5 rounded-full blur-md opacity-70"
          initial={{ left: '0%' }}
          animate={{ left: `calc(${clampedPct}% - 10px)` }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ background: 'rgba(122,191,66,0.9)' }}
        />
      )}
    </div>
  );
}

// Page transition wrapper - fade in + slide up
export function PageTransition({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation wrapper
export function StaggerContainer({ 
  children, 
  className, 
  staggerDelay = 0.1 
}: { 
  children: ReactNode; 
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
export function StaggerItem({ 
  children, 
  className,
  direction = 'up'
}: { 
  children: ReactNode; 
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'down' | 'none';
}) {
  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 30 };
      case 'down': return { opacity: 0, y: -30 };
      case 'left': return { opacity: 0, x: -30 };
      case 'right': return { opacity: 0, x: 30 };
      case 'none': return { opacity: 0 };
    }
  };

  return (
    <motion.div
      variants={{
        hidden: getInitial(),
        visible: { 
          opacity: 1, 
          x: 0, 
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Card hover wrapper - lift + glow effect
export function HoverCard({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ y: -4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Button hover wrapper - shadow shift
export function HoverButton({ 
  children, 
  className,
  onClick
}: { 
  children: ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// Scale on hover (for icons, badges, etc)
export function HoverScale({ 
  children, 
  className,
  scale = 1.1
}: { 
  children: ReactNode; 
  className?: string;
  scale?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Fade in on scroll (for sections)
export function FadeInOnScroll({ 
  children, 
  className,
  delay = 0
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Modal animation wrapper
export function ModalAnimation({ 
  children, 
  className,
  onClose
}: { 
  children: ReactNode; 
  className?: string;
  onClose?: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />
      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
}

// Toast animation wrapper
export function ToastAnimation({ 
  children, 
  className,
  onRemove
}: { 
  children: ReactNode; 
  className?: string;
  onRemove?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      layout
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Skeleton pulse animation
export function SkeletonPulse({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Shimmer effect for loading states
export function Shimmer({ className }: { className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent ${className}`}
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity, 
        ease: 'linear',
        repeatDelay: 0.5
      }}
    />
  );
}

// Progress bar with shimmer
export function AnimatedProgressBar({ 
  percentage, 
  className 
}: { 
  percentage: number; 
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-full ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-forest via-leaf to-lime rounded-full relative"
      >
        {percentage < 100 && percentage > 0 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </motion.div>
    </div>
  );
}

// Bounce animation for attention
export function BounceOnMount({ 
  children, 
  className,
  delay = 0
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Loading spinner
export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={className}
    >
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </motion.div>
  );
}
