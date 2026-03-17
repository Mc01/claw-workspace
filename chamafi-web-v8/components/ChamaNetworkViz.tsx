'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const MEMBERS = [
  { name: 'Amara', avatar: '👩🏿', angle: 0, status: 'paid', amount: '$50' },
  { name: 'Kwame', avatar: '👨🏿', angle: 60, status: 'paid', amount: '$50' },
  { name: 'Fatima', avatar: '👩🏾', angle: 120, status: 'pending', amount: '$50' },
  { name: 'Chidi', avatar: '👨🏾', angle: 180, status: 'paid', amount: '$50' },
  { name: 'Aisha', avatar: '👩🏽', angle: 240, status: 'recipient', amount: '$350' },
  { name: 'Obinna', avatar: '👨🏽', angle: 300, status: 'paid', amount: '$50' },
];

const STATUS_COLOR: Record<string, string> = {
  paid: '#35D07F',
  pending: '#F5C542',
  recipient: '#5ef7ab',
};

export default function ChamaNetworkViz() {
  const R = 120; // orbit radius

  return (
    <div style={{ position: 'relative', width: '320px', height: '320px', margin: '0 auto' }}>
      {/* SVG connections */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 320 320"
      >
        {MEMBERS.map((m, i) => {
          const rad = (m.angle * Math.PI) / 180;
          const x = 160 + R * Math.cos(rad);
          const y = 160 + R * Math.sin(rad);
          return (
            <motion.line
              key={i}
              x1="160" y1="160" x2={x} y2={y}
              stroke={STATUS_COLOR[m.status]}
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.35 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.3 }}
            />
          );
        })}
        {/* Center ring */}
        <motion.circle
          cx="160" cy="160" r={R}
          fill="none" stroke="rgba(53,208,127,0.08)" strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        />
      </svg>

      {/* Center node */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '64px', height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(53,208,127,0.2), rgba(53,208,127,0.05))',
          border: '2px solid rgba(53,208,127,0.4)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(53,208,127,0.3)',
          zIndex: 2,
        }}
      >
        <div style={{ fontSize: '20px' }}>🏦</div>
        <div style={{ fontSize: '8px', color: '#35D07F', fontWeight: 700 }}>Pool</div>
      </motion.div>

      {/* Pulse rings */}
      {[0, 1].map(i => (
        <motion.div
          key={i}
          animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
          transition={{ duration: 2.5, delay: i * 1.2, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '64px', height: '64px',
            borderRadius: '50%',
            border: '1px solid rgba(53,208,127,0.4)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Member nodes */}
      {MEMBERS.map((m, i) => {
        const rad = (m.angle * Math.PI) / 180;
        const x = 160 + R * Math.cos(rad) - 28;
        const y = 160 + R * Math.sin(rad) - 28;
        const color = STATUS_COLOR[m.status];
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 + 0.2, type: 'spring', stiffness: 300, damping: 15 }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            style={{
              position: 'absolute',
              left: x, top: y,
              width: '56px', height: '56px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${color}20 0%, ${color}08 100%)`,
              border: `2px solid ${color}50`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              cursor: 'default',
              boxShadow: m.status === 'recipient' ? `0 0 20px ${color}60` : 'none',
              zIndex: 1,
            }}
          >
            <div style={{ fontSize: '16px' }}>{m.avatar}</div>
            <div style={{ fontSize: '8px', color: color, fontWeight: 600 }}>{m.name}</div>
            {m.status === 'recipient' && (
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ fontSize: '8px', color: '#F5C542', fontWeight: 700 }}
              >{m.amount}</motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
