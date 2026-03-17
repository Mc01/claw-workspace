'use client'
import { useEffect, useRef, useState } from 'react'

const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ$£€₦₵'

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const cols = Math.floor(canvas.width / 20)
    const drops: number[] = Array(cols).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(0, 255, 255, 0.15)'
      ctx.font = '14px Share Tech Mono, monospace'

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        ctx.fillText(char, i * 20, drops[i] * 20)
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)
    const resizeHandler = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resizeHandler)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20 pointer-events-none"
    />
  )
}

function TerminalText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, 30)
    return () => clearTimeout(timer)
  }, [displayed, text, started])

  return (
    <span className="text-cyan-400 font-mono">
      {displayed}
      {displayed.length < text.length && <span className="animate-pulse">█</span>}
    </span>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Animated grid background */}
      <div className="absolute inset-0 cyber-grid-bg opacity-60" />

      {/* Matrix rain */}
      <MatrixRain />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-pink-500/5 blur-[80px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
        {/* System status */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#00ff88]" />
          <span className="font-mono text-xs text-green-400 tracking-[0.3em] uppercase">
            SYSTEM ONLINE // CELO MAINNET
          </span>
        </div>

        {/* Pre-title terminal */}
        <div className="mb-6 font-mono text-sm text-gray-500 tracking-widest">
          <TerminalText text="> INITIALIZING CHAMAFI_PROTOCOL_V3..." delay={200} />
        </div>

        {/* Main title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold mb-4 leading-none tracking-tight">
          <span
            className="glitch inline-block text-white"
            data-text="CHAMA"
          >
            CHAMA
          </span>
          <span
            className="glitch inline-block neon-cyan"
            data-text="FI"
          >
            FI
          </span>
        </h1>

        {/* Subtitle */}
        <div className="text-xl sm:text-2xl md:text-3xl font-mono mb-4 tracking-wide">
          <span className="text-gray-300">SAVE TOGETHER.</span>{' '}
          <span className="neon-magenta">GROW TOGETHER.</span>
        </div>

        {/* Description */}
        <p className="text-gray-400 font-mono text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
          Africa&apos;s traditional savings circles — <span className="text-cyan-400">Chamas, Ajo, Stokvels</span> — 
          supercharged with <span className="text-pink-400">DeFi yield</span> on Celo.
          Save in stablecoins. Earn passively. <span className="text-green-400">On-chain, forever.</span>
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="#minipay" className="btn-cyber btn-cyber-solid w-full sm:w-auto text-sm px-8 py-3">
            ▶ LAUNCH ON MINIPAY
          </a>
          <a href="#how-it-works" className="btn-cyber btn-cyber-primary w-full sm:w-auto text-sm px-8 py-3">
            HOW IT WORKS →
          </a>
        </div>

        {/* Powered by Celo badge */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 border border-yellow-500/30 bg-yellow-500/5 px-5 py-2.5 rounded-sm">
            <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xs">C</div>
            <span className="font-mono text-xs text-yellow-400 tracking-widest uppercase">Powered by Celo</span>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-mono text-xs text-gray-600 tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-cyan-500/50 to-transparent" />
        </div>
      </div>

      {/* Bottom scanline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </section>
  )
}
