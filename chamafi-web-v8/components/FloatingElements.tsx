'use client';
import { motion } from 'framer-motion';

const FLOATERS = [
  { emoji: '💰', x: '8%', y: '20%', delay: 0, duration: 7 },
  { emoji: '🌍', x: '92%', y: '15%', delay: 1.5, duration: 9 },
  { emoji: '📈', x: '5%', y: '65%', delay: 3, duration: 8 },
  { emoji: '🪙', x: '88%', y: '55%', delay: 0.5, duration: 11 },
  { emoji: '💎', x: '15%', y: '85%', delay: 2, duration: 6 },
  { emoji: '🌱', x: '82%', y: '80%', delay: 4, duration: 10 },
];

export default function FloatingElements() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {FLOATERS.map((f, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0, -10, 0],
            rotate: [-5, 5, -5, 3, -5],
            scale: [1, 1.1, 1, 1.05, 1],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: f.x,
            top: f.y,
            fontSize: '28px',
            opacity: 0.12,
            filter: 'blur(0.5px)',
          }}
        >
          {f.emoji}
        </motion.div>
      ))}
    </div>
  );
}
