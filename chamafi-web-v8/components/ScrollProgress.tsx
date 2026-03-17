'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #35D07F, #F5C542, #35D07F)',
        transformOrigin: 'left',
        scaleX,
        zIndex: 999,
        boxShadow: '0 0 10px rgba(53,208,127,0.8)',
      }}
    />
  );
}
