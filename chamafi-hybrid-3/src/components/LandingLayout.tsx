import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export function LandingLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 800);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div id="page-transition" className={`page-transition ${!pageLoading ? 'exit' : ''}`}>
        <div className="pt-wipe"></div>
        <div className="pt-logo">
          <svg viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" stroke="#C4E86A" strokeWidth="3"/>
            <path d="M30 48 L30 20 M30 20 L20 32 M30 20 L40 32 M30 30 L18 24 M30 30 L42 24" stroke="#C4E86A" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <span>ChamaFi</span>
        </div>
      </div>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style>{landingStyles}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 26 L16 10 M16 10 L10 17 M16 10 L22 17 M16 18 L9 14 M16 18 L23 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            ChamaFi
          </Link>
          <div className="nav-links">
            <a href="#what-is-chamafi" className="nav-link">About</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#mechanics" className="nav-link">Mechanics</a>
            <a href="#where-to-use" className="nav-link">Platforms</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>
          <Link to="/app" className="btn btn-nav">Launch App <span className="btn-arrow">→</span></Link>
        </div>
      </nav>

      <main><Outlet /></main>
    </>
  );
}

const landingStyles = `
:root {
  --soil: #3D2B1F; --clay: #6B3A2A; --sand: #C4A47C; --cream: #F5ECD7; --parchment: #EFE4CC;
  --forest: #2D5016; --leaf: #4A8025; --lime: #7ABF42; --mint: #C4E86A;
  --sun-gold: #F5A623; --ochre: #D4821A;
  --border: #1A1A1A; --shadow: 4px 4px 0px #1A1A1A; --shadow-lg: 6px 6px 0px #1A1A1A;
  --font-sans: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'Space Mono', monospace;
  --nav-h: 72px;
}

html { scroll-behavior: smooth; overflow-x: hidden; }

.landing-page {
  font-family: var(--font-sans);
  background: var(--cream);
  color: var(--soil);
}

.page-transition {
  position: fixed; inset: 0; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  pointer-events: none;
}

.pt-wipe {
  position: absolute; inset: 0; background: var(--soil);
  transform: translateX(0);
  transition: transform 0.8s cubic-bezier(0.77,0,0.175,1);
}

.page-transition.exit .pt-wipe { transform: translateX(100%); }

.pt-logo {
  position: relative; z-index: 1;
  display: flex; align-items: center; gap: 16px;
  color: var(--mint); font-family: var(--font-mono);
  font-size: 28px; font-weight: 700;
  transition: opacity 0.4s ease;
  animation: logoSpin 2s ease-out;
}

.page-transition.exit .pt-logo { opacity: 0; }

@keyframes logoSpin {
  from { transform: rotate(-180deg) scale(0); }
  to { transform: rotate(0deg) scale(1); }
}

.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  height: var(--nav-h);
  border-bottom: 2px solid transparent;
  transition: background 0.3s, border-color 0.3s;
}

.navbar.scrolled {
  background: rgba(245,236,215,0.92);
  backdrop-filter: blur(12px);
  border-color: var(--border);
}

.nav-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 24px;
  height: 100%;
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
}

.nav-logo {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-mono); font-size: 20px; font-weight: 700;
  color: var(--soil); text-decoration: none;
  transition: color 0.2s;
}

.nav-logo:hover { color: var(--leaf); }
.nav-logo svg { width: 28px; height: 28px; }

.nav-links { display: flex; gap: 8px; }

.nav-link {
  padding: 8px 16px; font-size: 14px; font-weight: 500;
  color: var(--soil); text-decoration: none;
  border: 2px solid transparent;
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
}

.nav-link:hover {
  border-color: var(--border); background: var(--parchment);
  transform: translateY(-1px);
}

.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 24px; font-family: var(--font-sans);
  font-size: 15px; font-weight: 600; text-decoration: none;
  border: 2px solid var(--border); cursor: pointer;
  position: relative; overflow: hidden;
  transition: transform 0.15s, box-shadow 0.15s;
}

.btn:active { transform: translate(2px,2px) !important; box-shadow: none !important; }

.btn-nav {
  background: var(--mint); color: var(--soil);
  box-shadow: var(--shadow); font-size: 14px; padding: 8px 20px;
}

.btn-nav:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--border); }

.btn-primary {
  background: var(--leaf); color: white;
  box-shadow: var(--shadow-lg); font-size: 16px; padding: 16px 32px;
}

.btn-primary:hover { transform: translate(-3px,-3px); box-shadow: 9px 9px 0 var(--border); }

.btn-fill {
  position: absolute; inset: 0; background: var(--lime);
  transform: translateX(-101%);
  transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
  z-index: 0;
}

.btn-primary:hover .btn-fill { transform: translateX(0); }

.btn-text { position: relative; z-index: 1; }

.btn-ghost {
  background: transparent; color: var(--soil); box-shadow: var(--shadow);
}

.btn-ghost:hover { background: var(--parchment); transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--border); }

.btn-arrow { transition: transform 0.2s; display: inline-block; }

.btn:hover .btn-arrow { transform: translate(4px,0); }

.btn-ghost:hover .btn-arrow { transform: translate(0,4px); }

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* Hero */
.hero {
  min-height: 100vh; padding-top: var(--nav-h);
  position: relative; overflow: hidden; background: var(--cream);
}

.sky-layer { position: absolute; inset: 0; opacity: 0; transition: opacity 0.5s; pointer-events: none; }

.sky-dawn { background: linear-gradient(to bottom, #FF9966 0%, #FFB347 30%, #FFD700 60%, var(--cream) 100%); }

.sky-day { background: linear-gradient(to bottom, #87CEEB 0%, #B8E4F9 40%, var(--cream) 100%); }

.sun-container {
  position: absolute; bottom: 36%; left: 50%;
  transform: translateX(-50%); z-index: 2; pointer-events: none;
}

.sun { width: 80px; height: 80px; position: relative; transform: translateY(200px); }

.sun-core {
  position: absolute; inset: 12px; border-radius: 50%;
  background: radial-gradient(circle, #FFF9C4 0%, var(--sun-gold) 60%, #E8880A 100%);
  box-shadow: 0 0 20px 8px rgba(245,166,35,0.5);
  animation: sunPulse 3s ease-in-out infinite;
}

.sun-glow {
  position: absolute; inset: -20px; border-radius: 50%;
  background: radial-gradient(circle, rgba(245,166,35,0.3) 0%, transparent 70%);
  animation: sunPulse 3s ease-in-out infinite reverse;
}

.sun-rays { position: absolute; inset: 0; animation: sunRotate 20s linear infinite; }

@keyframes sunPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.08); opacity: 0.9; } }

@keyframes sunRotate { to { transform: rotate(360deg); } }

.hero-content {
  position: relative; z-index: 5;
  padding: 80px 24px 320px; max-width: 700px; margin: 0 auto; text-align: center;
}

.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 18px; background: var(--parchment);
  border: 2px solid var(--border); font-size: 13px; font-weight: 600;
  letter-spacing: 0.05em; text-transform: uppercase;
  margin-bottom: 28px; box-shadow: var(--shadow);
}

.badge-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--lime); animation: dotPulse 2s ease-in-out infinite;
}

@keyframes dotPulse { 0%,100% { box-shadow: 0 0 0 3px rgba(196,232,106,0.3); } 50% { box-shadow: 0 0 0 6px rgba(196,232,106,0.1); } }

.hero-title { font-size: clamp(48px, 8vw, 88px); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 24px; }

.title-line { display: block; }

.title-green { color: var(--leaf); }

.hero-sub { font-size: 18px; line-height: 1.6; color: #5C4A38; margin-bottom: 36px; }

.hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }

.hero-pills { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

.pill {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 18px; border: 2px solid var(--border);
  font-family: var(--font-mono); font-size: 14px; font-weight: 700;
  box-shadow: var(--shadow); transition: transform 0.2s, box-shadow 0.2s;
}

.pill:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--border); }

.pill-green { background: var(--mint); }
.pill-earth { background: var(--sand); }
.pill-brown { background: var(--parchment); }
.pill-yield { background: #FFE58A; }

.pill-num { font-weight: 700; }

.hero-scene {
  position: absolute; bottom: 0; left: 50%;
  transform: translateX(-50%); width: 100%; max-width: 1100px;
  height: 380px; z-index: 3; pointer-events: none;
}

.hero-scene::after {
  content: ''; position: absolute; bottom: 0;
  left: -100%; right: -100%; height: 60px;
  background: linear-gradient(to bottom, #8B6340 0%, #6B4423 100%);
  border-top: 3px solid var(--border);
}

.main-tree {
  position: absolute; bottom: 60px; left: 50%;
  transform: translateX(-50%); width: 220px; height: 330px;
  transform-origin: bottom center;
}

.tree-idle { animation: treeIdleSway 6s ease-in-out infinite; }

@keyframes treeIdleSway {
  0%,100% { transform: translateX(-50%) rotate(0deg); }
  25% { transform: translateX(-50%) rotate(0.8deg); }
  75% { transform: translateX(-50%) rotate(-0.8deg); }
}

.grass-field {
  position: absolute; bottom: 0; left: 0; right: 0; height: 80px;
  display: flex; align-items: flex-end; justify-content: center;
  gap: 2px; overflow: hidden;
}

.grass-blade { width: 4px; border-radius: 2px 2px 0 0; transform-origin: bottom center; transition: transform 0.1s ease-out; }

.small-trees { position: absolute; bottom: 60px; width: 100%; }

.small-tree { position: absolute; bottom: 0; transform-origin: bottom center; opacity: 0; transition: opacity 0.6s; }

.small-tree.shown { opacity: 1; }

.st-left { left: 10%; width: 90px; height: 150px; animation: smallSway1 5s 0.5s ease-in-out infinite; }
.st-right { right: 10%; width: 70px; height: 115px; animation: smallSway2 7s 1s ease-in-out infinite; }

@keyframes smallSway1 { 0%,100% { transform: rotate(0deg); } 33% { transform: rotate(1.2deg); } 66% { transform: rotate(-1.2deg); } }
@keyframes smallSway2 { 0%,100% { transform: rotate(0deg); } 33% { transform: rotate(-1deg); } 66% { transform: rotate(1deg); } }

.scroll-hint {
  position: absolute; bottom: 36px; left: 50%;
  transform: translateX(-50%); z-index: 10;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  font-size: 12px; font-weight: 500; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--clay);
}

.scroll-mouse { width: 22px; height: 36px; border: 2px solid var(--clay); border-radius: 12px; display: flex; justify-content: center; padding-top: 6px; }

.scroll-wheel { width: 3px; height: 8px; background: var(--clay); border-radius: 2px; animation: scrollWheel 1.5s ease-in-out infinite; }

@keyframes scrollWheel { 0% { transform: translateY(0); opacity: 1; } 80% { transform: translateY(12px); opacity: 0; } 100% { transform: translateY(0); opacity: 0; } }

/* Reveal */
.reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.reveal-up.visible { opacity: 1; transform: translateY(0); }

.reveal-left { opacity: 0; transform: translateX(-60px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.reveal-left.visible { opacity: 1; transform: translateX(0); }

.reveal-right { opacity: 0; transform: translateX(60px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.reveal-right.visible { opacity: 1; transform: translateX(0); }

/* Stats */
.stats-section { position: relative; padding: 80px 0; background: var(--soil); overflow: hidden; }

.stats-bg-pattern {
  position: absolute; inset: 0;
  background-image: repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.04) 39px, rgba(255,255,255,0.04) 40px),
    repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.04) 39px, rgba(255,255,255,0.04) 40px);
}

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; position: relative; z-index: 1; }

.stat-card { background: var(--parchment); border: 2px solid var(--border); padding: 32px 24px; box-shadow: var(--shadow-lg); transition: transform 0.25s, box-shadow 0.25s; cursor: default; }
.stat-card:hover { transform: translate(-4px, -4px); box-shadow: 10px 10px 0 var(--border); }

.stat-icon { font-size: 32px; margin-bottom: 16px; }
.stat-num { font-family: var(--font-mono); font-size: 42px; font-weight: 700; color: var(--soil); line-height: 1; margin-bottom: 8px; min-height: 50px; }
.stat-label { font-size: 14px; font-weight: 600; color: var(--clay); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
.stat-bar { height: 6px; background: rgba(0,0,0,0.1); border-radius: 3px; overflow: hidden; }
.stat-bar-fill { height: 100%; background: var(--leaf); border-radius: 3px; width: 0; transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); }

/* Section Header */
.section-header { text-align: center; margin-bottom: 72px; }
.section-tag { display: inline-block; padding: 4px 14px; background: var(--mint); border: 2px solid var(--border); font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px; }
.section-title { font-size: clamp(32px, 5vw, 52px); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 16px; }
.text-green { color: var(--leaf); }
.section-sub { font-size: 17px; color: var(--clay); max-width: 520px; margin: 0 auto; }

/* What Section */
.what-section { padding: 120px 0; background: var(--cream); }
.what-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
@media (max-width: 900px) { .what-inner { grid-template-columns: 1fr; gap: 48px; } }

.what-lead { font-size: 20px; font-weight: 500; line-height: 1.6; margin-bottom: 20px; color: var(--soil); }
.what-body { font-size: 16px; line-height: 1.7; color: var(--clay); margin-bottom: 32px; }
.what-pillars { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }

.pillar { display: flex; align-items: flex-start; gap: 16px; padding: 20px; background: white; border: 2px solid var(--border); box-shadow: var(--shadow); }
.pillar-icon { font-size: 24px; flex-shrink: 0; }
.pillar strong { display: block; font-size: 15px; font-weight: 600; margin-bottom: 4px; color: var(--soil); }
.pillar span { font-size: 14px; color: var(--clay); }

.comparison-table { width: 100%; border-collapse: collapse; font-size: 14px; background: white; border: 2px solid var(--border); box-shadow: var(--shadow); }
.comparison-table th, .comparison-table td { padding: 14px 16px; text-align: left; border-bottom: 1px solid rgba(0,0,0,0.1); }
.comparison-table th { background: var(--parchment); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; font-size: 12px; }
.comparison-table .ct-highlight { background: var(--mint); }
.comparison-table .ct-bad { color: #B54A4A; font-weight: 600; }
.comparison-table .ct-good { color: var(--leaf); font-weight: 700; }

.what-visual { display: flex; flex-direction: column; gap: 32px; }

.chama-circle-diagram { position: relative; width: 300px; height: 300px; margin: 0 auto; }
.ccd-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; border-radius: 50%; background: var(--soil); border: 3px solid var(--border); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; z-index: 2; }
.ccd-center span { font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: var(--cream); }

.ccd-member { position: absolute; top: 50%; left: 50%; transform: rotate(var(--angle)) translateX(110px) rotate(calc(-1 * var(--angle))); display: flex; flex-direction: column; align-items: center; gap: 4px; margin-top: -25px; margin-left: -25px; }
.ccd-avatar { width: 50px; height: 50px; border-radius: 50%; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: white; }
.ccd-member span { font-size: 11px; font-weight: 600; color: var(--clay); }

.what-stat-row { display: flex; align-items: center; justify-content: center; gap: 32px; padding: 24px; background: white; border: 2px solid var(--border); box-shadow: var(--shadow); }
.wsr-item { text-align: center; }
.wsr-num { display: block; font-family: var(--font-mono); font-size: 28px; font-weight: 700; color: var(--leaf); margin-bottom: 4px; }
.wsr-label { font-size: 12px; color: var(--clay); text-transform: uppercase; letter-spacing: 0.08em; }
.wsr-divider { width: 1px; height: 40px; background: rgba(0,0,0,0.1); }

/* How Section */
.how-section { padding: 120px 0; background: var(--cream); }

.steps-container { position: relative; display: flex; flex-direction: column; gap: 40px; max-width: 800px; margin: 0 auto; }

.steps-line { position: absolute; left: 78px; top: 60px; bottom: 60px; width: 3px; background: rgba(107, 58, 42, 0.15); }

@media (max-width: 600px) { .steps-line { display: none; } }

.steps-progress { width: 100%; background: var(--leaf); height: 0; transition: height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }

.step-card { display: flex; gap: 32px; align-items: flex-start; padding: 32px; background: white; border: 2px solid var(--border); box-shadow: var(--shadow); transition: transform 0.25s, box-shadow 0.25s; }
.step-card:hover { transform: translate(-3px, -3px); box-shadow: 7px 7px 0 var(--border); }

@media (max-width: 600px) { .step-card { flex-direction: column; gap: 16px; } }

.step-number { font-family: var(--font-mono); font-size: 48px; font-weight: 700; color: var(--sand); line-height: 1; min-width: 60px; }

.step-content { flex: 1; }
.step-content h3 { font-size: 24px; font-weight: 700; margin-bottom: 10px; }
.step-content p { color: var(--clay); line-height: 1.6; margin-bottom: 16px; }
.step-content code { background: var(--parchment); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 13px; }

.step-badge { display: inline-block; padding: 4px 12px; background: var(--parchment); border: 2px solid var(--border); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
.step-badge.green { background: var(--mint); }
.step-badge.gold { background: #FFE58A; }

/* Mechanics Section */
.mechanics-section { padding: 120px 0; background: var(--parchment); }

.mechanics-flow { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 24px; margin-bottom: 64px; }
@media (max-width: 900px) { .mechanics-flow { grid-template-columns: 1fr; } .mf-arrow { display: none; } }

.mf-stage { background: white; border: 2px solid var(--border); padding: 28px; box-shadow: var(--shadow); }
.mf-stage-header { margin-bottom: 16px; }
.mf-stage-num { display: block; font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: var(--clay); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
.mf-stage h3 { font-size: 20px; font-weight: 700; }
.mf-stage-body p { font-size: 15px; color: var(--clay); line-height: 1.6; margin-bottom: 16px; }

.mf-items { display: flex; flex-direction: column; gap: 8px; }
.mf-item { font-size: 13px; padding: 8px 12px; background: var(--cream); border-left: 3px solid var(--leaf); }
.mf-item.mf-warn { border-left-color: #D4821A; background: #FFF8E7; }

.mf-arrow { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
.mf-arrow-line { width: 2px; height: 60px; background: var(--border); position: relative; }
.mf-arrow-line::after { content: ''; position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid var(--border); }
.mf-arrow span { font-size: 11px; font-weight: 600; color: var(--clay); text-transform: uppercase; letter-spacing: 0.08em; }

.mf-exit-options { display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; align-items: center; }
.mf-exit-opt { text-align: center; padding: 16px; background: var(--cream); border: 2px solid var(--border); }
.mf-exit-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--clay); margin-bottom: 8px; }
.mf-exit-opt code { display: block; font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: var(--leaf); margin-bottom: 8px; background: transparent; padding: 0; }
.mf-exit-opt span { font-size: 12px; color: var(--clay); }
.mf-exit-or { font-size: 11px; font-weight: 700; color: var(--clay); }

.mechanics-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
@media (max-width: 600px) { .mechanics-cards { grid-template-columns: 1fr; } }

.mc-card { background: white; border: 2px solid var(--border); padding: 28px; box-shadow: var(--shadow); }
.mc-icon { font-size: 28px; margin-bottom: 12px; }
.mc-card h4 { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.mc-card p { font-size: 14px; color: var(--clay); line-height: 1.6; margin-bottom: 16px; }

.mc-formula { background: var(--cream); padding: 12px; border-radius: 4px; }
.mc-formula code { font-family: var(--font-mono); font-size: 13px; color: var(--soil); }
.mc-formula-note { display: block; font-size: 11px; color: var(--clay); margin-top: 4px; }

/* Where Section */
.where-section { padding: 120px 0; background: var(--soil); color: var(--cream); }
.where-section .section-title { color: var(--cream); }
.where-section .section-sub { color: rgba(245, 236, 215, 0.75); }

.where-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
@media (max-width: 900px) { .where-grid { grid-template-columns: 1fr; } }

.where-card { background: rgba(255, 255, 255, 0.03); border: 2px solid rgba(255, 255, 255, 0.1); padding: 32px; transition: transform 0.3s, border-color 0.3s; position: relative; }
.where-card:hover { transform: translate(-4px, -4px); border-color: var(--mint); }

.wc-platform-badge { position: absolute; top: 16px; right: 16px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 10px; background: var(--mint); color: var(--soil); }

.wc-icon { font-size: 40px; margin-bottom: 20px; }
.where-card h3 { font-size: 22px; font-weight: 700; color: var(--cream); margin-bottom: 12px; }
.where-card p { font-size: 15px; color: rgba(245, 236, 215, 0.7); line-height: 1.6; margin-bottom: 20px; }

.wc-features { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
.wc-feature { font-size: 13px; color: rgba(245, 236, 215, 0.6); }

.wc-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; background: var(--mint); color: var(--soil); font-weight: 600; text-decoration: none; border: 2px solid var(--border); box-shadow: var(--shadow); transition: transform 0.15s, box-shadow 0.15s; }
.wc-btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--border); }

/* FAQ Section */
.faq-section { padding: 120px 0; background: var(--cream); }

.faq-list { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; }

.faq-item { border: 2px solid var(--border); margin-top: -2px; background: white; }
.faq-item:first-child { margin-top: 0; }

.faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 24px 28px; background: white; border: none; cursor: pointer; font-family: var(--font-sans); font-size: 17px; font-weight: 600; color: var(--soil); text-align: left; transition: background 0.2s; }
.faq-q:hover { background: var(--parchment); }
.faq-item.open .faq-q { background: var(--mint); }

.faq-icon { font-size: 24px; font-weight: 300; flex-shrink: 0; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); color: var(--clay); line-height: 1; }
.faq-item.open .faq-icon { transform: rotate(45deg); }

.faq-a { max-height: 0; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1); background: white; }
.faq-item.open .faq-a { max-height: 200px; }
.faq-a p { padding: 0 28px 24px; font-size: 16px; line-height: 1.7; color: var(--clay); }

/* Footer */
.footer { background: #1A1A1A; color: var(--cream); }
.footer-top { padding: 80px 0 60px; }

.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; }
@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } }

.footer-logo { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 20px; font-weight: 700; color: var(--cream); margin-bottom: 16px; }
.footer-logo svg { width: 28px; height: 28px; }

.footer-brand p { font-size: 15px; line-height: 1.6; color: rgba(245, 236, 215, 0.6); margin-bottom: 24px; }

.footer-social { display: flex; gap: 10px; }
.social-link { width: 36px; height: 36px; border: 2px solid rgba(255, 255, 255, 0.2); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: rgba(245, 236, 215, 0.7); text-decoration: none; transition: border-color 0.2s, color 0.2s, transform 0.2s; }
.social-link:hover { border-color: var(--mint); color: var(--mint); transform: translateY(-2px); }

.footer-col h4 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(245, 236, 215, 0.5); margin-bottom: 20px; }
.footer-col a { display: block; font-size: 15px; color: rgba(245, 236, 215, 0.7); text-decoration: none; margin-bottom: 10px; transition: color 0.2s; }
.footer-col a:hover { color: var(--mint); }

.footer-bottom { padding: 20px 0; border-top: 1px solid rgba(255, 255, 255, 0.1); }
.footer-bottom .container { display: flex; align-items: center; justify-content: space-between; }
.footer-bottom span { font-size: 13px; color: rgba(245, 236, 215, 0.4); }

@media (max-width: 600px) {
  .hero-title { font-size: 44px; }
  .nav-links { display: none; }
  .hero-actions { flex-direction: column; }
  .hero-actions .btn { width: 100%; justify-content: center; }
  .steps-container { padding: 0 16px; }
}
;

`;
