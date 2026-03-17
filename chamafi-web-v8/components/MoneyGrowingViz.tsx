'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const COINS = ['💰', '💵', '🪙', '💎', '📈'];

export default function MoneyGrowingViz() {
  const [coins, setCoins] = useState<Array<{ id: number; coin: string; x: number; delay: number }>>([]);
  const [bars, setBars] = useState([0, 0, 0, 0, 0, 0, 0]);
  const counterRef = useRef(0);

  useEffect(() => {
    // Animate bars growing
    const targets = [35, 55, 45, 75, 60, 90, 80];
    const timers = targets.map((t, i) =>
      setTimeout(() => {
        setBars(prev => { const n = [...prev]; n[i] = t; return n; });
      }, i * 200 + 300)
    );

    // Periodic coin rain
    const spawnCoin = () => {
      const id = counterRef.current++;
      setCoins(prev => [...prev, {
        id,
        coin: COINS[Math.floor(Math.random() * COINS.length)],
        x: 10 + Math.random() * 80,
        delay: 0,
      }]);
      setTimeout(() => setCoins(prev => prev.filter(c => c.id !== id)), 2500);
    };

    const interval = setInterval(spawnCoin, 800);
    spawnCoin();

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  const barColors = ['#35D07F', '#3de894', '#F5C542', '#35D07F', '#5ef7ab', '#F5C542', '#35D07F'];

  return (
    <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
      {/* Chart bars */}
      <div style={{
        position: 'absolute', bottom: '20px', left: '20px', right: '20px',
        display: 'flex', gap: '8px', alignItems: 'flex-end', height: '150px',
      }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${h}%`, opacity: 1 }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '100%',
                background: `linear-gradient(180deg, ${barColors[i]} 0%, ${barColors[i]}88 100%)`,
                borderRadius: '6px 6px 0 0',
                position: 'relative',
                boxShadow: `0 0 12px ${barColors[i]}66`,
              }}
            >
              {/* Shimmer on bars */}
              <motion.div
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 2, delay: i * 0.2 + 1, repeat: Infinity, repeatDelay: 3 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
                  borderRadius: '6px 6px 0 0',
                }}
              />
            </motion.div>
            <div style={{ fontSize: '8px', color: 'rgba(143,184,154,0.6)', textAlign: 'center' }}>
              {['Jan','Feb','Mar','Apr','May','Jun','Jul'][i]}
            </div>
          </div>
        ))}
      </div>

      {/* Floating coins */}
      {coins.map(c => (
        <motion.div
          key={c.id}
          initial={{ y: -30, opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ y: 60, opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8], rotate: 20 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: `${c.x}%`,
            fontSize: '20px',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 8px rgba(53,208,127,0.8))',
          }}
        >
          {c.coin}
        </motion.div>
      ))}

      {/* Trend line */}
      <svg
        style={{ position: 'absolute', bottom: '40px', left: '20px', right: '20px', width: 'calc(100% - 40px)', height: '80px', pointerEvents: 'none' }}
        viewBox="0 0 300 60"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 50 C30 45, 50 40, 80 32 C110 24, 130 28, 160 18 C190 8, 220 12, 250 4 C270 -2, 290 2, 300 0"
          fill="none"
          stroke="rgba(53,208,127,0.6)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
        />
        <motion.path
          d="M0 50 C30 45, 50 40, 80 32 C110 24, 130 28, 160 18 C190 8, 220 12, 250 4 C270 -2, 290 2, 300 0 L300 60 L0 60 Z"
          fill="url(#greenFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        />
        <defs>
          <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(53,208,127,0.15)" />
            <stop offset="100%" stopColor="rgba(53,208,127,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
