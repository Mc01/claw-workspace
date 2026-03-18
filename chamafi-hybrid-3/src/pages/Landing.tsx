import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface GrassBlade {
  height: number;
  color: string;
  skew: number;
  opacity: number;
}

interface SunRay {
  angle: number;
  length: number;
}

interface FaqItem {
  q: string;
  a: string;
}

function Counter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        const startTime = performance.now();
        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / 2000, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, started]);

  const fmt = (n: number): string => {
    if (n >= 1_000_000) return prefix + (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return prefix + Math.floor(n / 1_000) + 'K';
    return prefix + n.toLocaleString() + suffix;
  };

  return <span ref={ref}>{fmt(count)}</span>;
}

export function Landing() {
  const heroRef = useRef<HTMLElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const skyDawnRef = useRef<HTMLDivElement>(null);
  const skyDayRef = useRef<HTMLDivElement>(null);
  const grassFieldRef = useRef<HTMLDivElement>(null);
  const stepsProgressRef = useRef<HTMLDivElement>(null);

  const [grassBlades, setGrassBlades] = useState<GrassBlade[]>([]);
  const [sunRays, setSunRays] = useState<SunRay[]>([]);
  const [treeAnimated, setTreeAnimated] = useState(false);
  const [smallTreesShown, setSmallTreesShown] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const grassColors = ['#3A6B1E', '#4A8025', '#5A9B30', '#2D5016', '#6AAF32', '#7ABF42'];

  // Initialise grass + sun rays + tree timers
  useEffect(() => {
    setGrassBlades(Array.from({ length: 120 }, () => ({
      height: 20 + Math.random() * 55,
      color: grassColors[Math.floor(Math.random() * grassColors.length)],
      skew: (Math.random() - 0.5) * 20,
      opacity: 0.7 + Math.random() * 0.3,
    })));
    setSunRays(Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * 360,
      length: 28 + Math.random() * 8,
    })));
    const t1 = setTimeout(() => setTreeAnimated(true), 1000);
    const t2 = setTimeout(() => setSmallTreesShown(true), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll: sun + sky + steps-progress
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (sunRef.current && heroRef.current) {
        const heroH = heroRef.current.offsetHeight;
        const p = Math.min(scrollY / (heroH * 0.6), 1);
        sunRef.current.style.transform = `translateY(${200 - p * 280}px)`;
        if (skyDawnRef.current) skyDawnRef.current.style.opacity = String(p < 0.5 ? p * 2 : 2 - p * 2);
        if (skyDayRef.current) skyDayRef.current.style.opacity = String(p > 0.4 ? (p - 0.4) * 1.67 : 0);
      }
      if (stepsProgressRef.current) {
        const sec = document.getElementById('how-it-works');
        if (sec) {
          const r = sec.getBoundingClientRect();
          const sp = Math.max(0, Math.min(1, (-r.top + window.innerHeight * 0.3) / (sec.offsetHeight * 0.7)));
          stepsProgressRef.current.style.height = `${sp * 100}%`;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mouse: interactive grass wind
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!grassFieldRef.current) return;
      const force = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      grassFieldRef.current.querySelectorAll<HTMLElement>('.grass-blade').forEach((el, i) => {
        const base = parseFloat(el.dataset.baseSkew ?? '0');
        const dist = Math.abs(i / grassBlades.length - 0.5);
        el.style.transform = `skewX(${base + force * 15 * (1 - dist * 0.5)}deg)`;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [grassBlades]);

  // IntersectionObserver: scroll-reveal
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt((entry.target as HTMLElement).dataset.delay ?? '0');
          setTimeout(() => entry.target.classList.add('visible'), delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const faqs: FaqItem[] = [
    { q: 'What is a chama?', a: 'A chama is a traditional savings group common in East and West Africa. Members pool regular contributions and either take turns receiving the full pot or save collectively. ChamaFi brings this practice on-chain for transparency and yield generation.' },
    { q: 'What happens if the Chama deadline is missed?', a: 'If a Chama fails to reach 100% funding before its on-chain deadline, the smart contract automatically refunds all contributors. No admin action needed, no funds lost, no trust required.' },
    { q: 'How do LP tokens work?', a: 'When a Chama graduates (reaches 100%), LP tokens are minted and distributed to members proportional to their contribution. LP tokens represent a claim on the pool plus ongoing yield from rehypothecation. You can hold them to accumulate yield, or sell them on the bonding curve.' },
    { q: 'What currency does ChamaFi use?', a: 'ChamaFi uses cUSD (Celo Dollar) — a stablecoin pegged 1:1 to the US Dollar. This protects your savings from crypto volatility while keeping fees near-zero.' },
    { q: 'How do I exit my position?', a: 'Two paths: call remove_liquidity to redeem your LP tokens directly for cUSD plus accrued yield, or sell your LP tokens on the bonding curve to immediate buyers. No lockup, no waiting period, no admin approval required.' },
    { q: 'Which platforms can I use ChamaFi on?', a: 'ChamaFi runs on three surfaces: the full Web App, a simplified MiniPay interface for Opera MiniPay mobile users, and an embedded Farcaster Mini App. All three connect to the same on-chain protocol.' },
  ];

  const treeVisibleStyle = (delay: number) => ({
    opacity: treeAnimated ? 1 : 0,
    transition: `opacity 0.4s ease ${delay}s`,
  });

  const foliageStyle = (delay: number) => ({
    opacity: treeAnimated ? 1 : 0,
    transform: treeAnimated ? 'scale(1)' : 'scale(0)',
    transformOrigin: 'center center' as const,
    transition: `opacity 0.3s ease ${delay}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
  });

  return (
    <div className="landing-page">

      {/* ───────── HERO ───────── */}
      <section id="hero" ref={heroRef} className="hero">
        <div className="sun-container">
          <div className="sun" ref={sunRef}>
            <div className="sun-rays">
              {sunRays.map((ray, i) => (
                <div key={i} style={{
                  position: 'absolute', width: 2, height: ray.length,
                  background: 'linear-gradient(to bottom, rgba(245,166,35,0.8), transparent)',
                  left: '50%', top: '50%', borderRadius: 1,
                  transformOrigin: '50% 0%',
                  transform: `translateX(-50%) translateY(-100%) rotate(${ray.angle}deg)`,
                }} />
              ))}
            </div>
            <div className="sun-core" />
            <div className="sun-glow" />
          </div>
        </div>
        <div className="sky-layer sky-dawn" ref={skyDawnRef} />
        <div className="sky-layer sky-day" ref={skyDayRef} />

        <div className="hero-content">
          <div className="hero-badge reveal-up" data-delay="200">
            <span className="badge-dot" />
            Community Savings &middot; Celo Blockchain
          </div>
          <h1 className="hero-title">
            <span className="title-line reveal-up" data-delay="300">Savings circles,</span>
            <span className="title-line title-green reveal-up" data-delay="450">reimagined on Celo</span>
          </h1>
          <p className="hero-sub reveal-up" data-delay="600">
            Higher yield than traditional Chamas.<br />Instant access, no lockups.
          </p>
          <div className="hero-actions reveal-up" data-delay="750">
            <Link to="/app" className="btn btn-primary">
              <span className="btn-text">Start Your Chama</span>
              <span className="btn-fill" />
            </Link>
            <a href="#how-it-works" className="btn btn-ghost">
              See How It Works <span className="btn-arrow">↓</span>
            </a>
          </div>
        </div>

        <div className="hero-scene">
          <svg className={`main-tree${treeAnimated ? ' tree-idle' : ''}`} viewBox="0 0 200 300" fill="none">
            <path d="M100 280 L100 180" stroke="#6B3A2A" strokeWidth="12" strokeLinecap="round" style={treeVisibleStyle(0)} />
            <path d="M100 220 Q80 200 60 190" stroke="#6B3A2A" strokeWidth="7" strokeLinecap="round" style={treeVisibleStyle(0.35)} />
            <path d="M100 210 Q120 195 145 185" stroke="#6B3A2A" strokeWidth="7" strokeLinecap="round" style={treeVisibleStyle(0.43)} />
            <path d="M100 195 Q75 175 55 165" stroke="#6B3A2A" strokeWidth="5" strokeLinecap="round" style={treeVisibleStyle(0.51)} />
            <path d="M100 190 Q125 170 148 162" stroke="#6B3A2A" strokeWidth="5" strokeLinecap="round" style={treeVisibleStyle(0.59)} />
            <path d="M100 185 L100 155" stroke="#6B3A2A" strokeWidth="5" strokeLinecap="round" style={treeVisibleStyle(0.67)} />
            <ellipse cx="45" cy="162" rx="28" ry="22" fill="#2D5016" style={foliageStyle(0.9)} />
            <ellipse cx="160" cy="158" rx="28" ry="22" fill="#3A6B1E" style={foliageStyle(1.02)} />
            <ellipse cx="78" cy="128" rx="24" ry="20" fill="#4A8025" style={foliageStyle(1.14)} />
            <ellipse cx="122" cy="128" rx="24" ry="20" fill="#3D7020" style={foliageStyle(1.26)} />
            <ellipse cx="100" cy="108" rx="32" ry="28" fill="#5A9B30" style={foliageStyle(1.38)} />
            <ellipse cx="100" cy="100" rx="20" ry="16" fill="#7ABF42" style={{ ...foliageStyle(1.4), opacity: treeAnimated ? 0.85 : 0 }} />
            <ellipse cx="82" cy="122" rx="14" ry="11" fill="#6AAF32" style={{ ...foliageStyle(1.55), opacity: treeAnimated ? 0.85 : 0 }} />
          </svg>

          <div className="grass-field" ref={grassFieldRef}>
            {grassBlades.map((blade, i) => (
              <div key={i} className="grass-blade"
                data-base-skew={blade.skew}
                style={{
                  height: blade.height,
                  background: `linear-gradient(to top, ${blade.color}, ${blade.color}cc)`,
                  transform: `skewX(${blade.skew}deg)`,
                  opacity: blade.opacity,
                }} />
            ))}
          </div>

          <div className="small-trees">
            <svg className={`small-tree st-left${smallTreesShown ? ' shown' : ''}`} viewBox="0 0 60 100" fill="none">
              <path d="M30 95 L30 50" stroke="#6B3A2A" strokeWidth="5" strokeLinecap="round" />
              <ellipse cx="20" cy="52" rx="16" ry="13" fill="#2D5016" />
              <ellipse cx="40" cy="52" rx="16" ry="13" fill="#3A6B1E" />
              <ellipse cx="30" cy="40" rx="20" ry="16" fill="#4A8025" />
              <ellipse cx="30" cy="34" rx="12" ry="10" fill="#6AAF32" />
            </svg>
            <svg className={`small-tree st-right${smallTreesShown ? ' shown' : ''}`} viewBox="0 0 60 100" fill="none">
              <path d="M30 95 L30 55" stroke="#6B3A2A" strokeWidth="4" strokeLinecap="round" />
              <ellipse cx="22" cy="57" rx="14" ry="11" fill="#2D5016" />
              <ellipse cx="38" cy="57" rx="14" ry="11" fill="#3A6B1E" />
              <ellipse cx="30" cy="45" rx="18" ry="14" fill="#5A9B30" />
              <ellipse cx="30" cy="39" rx="10" ry="8" fill="#7ABF42" />
            </svg>
          </div>
        </div>

        <div className="scroll-hint reveal-up" data-delay="1200" style={{ textAlign: 'center' }}>
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ───────── STATS ───────── */}
      <section id="stats" className="stats-section">
        <div className="stats-bg-pattern" />
        <div className="container">
          <div className="stats-grid">
            {[
              { icon: '🌿', target: 2847, label: 'Active Members', width: 82 },
              { icon: '🏦', target: 142, label: 'Chama Groups', width: 65 },
              { icon: '💰', target: 890000, label: 'Total Saved (cUSD)', prefix: '$', width: 91 },
              { icon: '📈', target: 18, label: 'Average APY Earned', suffix: '%', width: 72 },
            ].map((s, i) => (
              <div key={i} className="stat-card reveal-up" data-delay={i * 100}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-num"><Counter target={s.target} prefix={s.prefix} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${s.width}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHAT IS CHAMAFI ───────── */}
      <section id="what-is-chamafi" className="what-section">
        <div className="container">
          <div className="what-inner">
            <div className="what-text">
              <div className="section-header reveal-up" style={{ textAlign: 'left', marginBottom: 40 }}>
                <span className="section-tag">Mission</span>
                <h2 className="section-title">What is <span className="text-green">ChamaFi?</span></h2>
              </div>
              <p className="what-lead reveal-up" data-delay="100">
                ChamaFi digitizes existing Chama savings groups across Africa — bringing the trust of community finance onto the Celo blockchain.
              </p>
              <p className="what-body reveal-up" data-delay="200">
                300 million+ Africans participate in savings circles (Chamas, Susus, Tontines). These informal groups work — but they're limited by cash, geography, and trust. ChamaFi keeps the human element while replacing the limitations with smart contracts.
              </p>
              <div className="what-pillars reveal-up" data-delay="300">
                {[
                  { icon: '📈', title: 'Higher Yield', desc: 'Capital earns while incubating — rehypothecated in DeFi protocols' },
                  { icon: '⚡', title: 'Instant Access', desc: 'Graduate at 100% — no waiting periods, no lockups, no permission' },
                  { icon: '🌍', title: '300M+ Africans', desc: 'Already in savings circles — we bring them on-chain, not replace them' },
                ].map((p, i) => (
                  <div key={i} className="pillar">
                    <div className="pillar-icon">{p.icon}</div>
                    <div><strong>{p.title}</strong><span>{p.desc}</span></div>
                  </div>
                ))}
              </div>
              <div className="what-comparison reveal-up" data-delay="350">
                <table className="comparison-table">
                  <thead>
                    <tr><th>Feature</th><th>Traditional Chama</th><th className="ct-highlight">ChamaFi</th></tr>
                  </thead>
                  <tbody>
                    {[
                      ['Yield on idle capital', '0%', '8%+ APY'],
                      ['Exit flexibility', 'Wait for rotation', 'Instant, any time'],
                      ['Lockup period', 'Months to years', 'No lockup'],
                      ['Transparency', 'Cash / trust-based', 'On-chain'],
                      ['Auto-refund on failure', 'Manual, disputed', 'Guaranteed by contract'],
                    ].map(([feat, bad, good], i) => (
                      <tr key={i}><td>{feat}</td><td className="ct-bad">{bad}</td><td className="ct-good">{good}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="what-visual reveal-up" data-delay="150">
              <div className="chama-circle-diagram">
                <div className="ccd-center">
                  <svg viewBox="0 0 60 60" fill="none" width="48" height="48">
                    <circle cx="30" cy="30" r="28" stroke="#C4E86A" strokeWidth="2.5" />
                    <path d="M30 46 L30 18 M30 18 L20 28 M30 18 L40 28 M30 32 L18 26 M30 32 L42 26" stroke="#C4E86A" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>ChamaFi</span>
                </div>
                {([
                  { angle: '0deg', bg: '#C4E86A', initials: 'AW', name: 'Amara', color: '#1A1A1A' },
                  { angle: '60deg', bg: '#D4821A', initials: 'KA', name: 'Kwame' },
                  { angle: '120deg', bg: '#6B3A2A', initials: 'FO', name: 'Fatima' },
                  { angle: '180deg', bg: '#3A6B1E', initials: 'BO', name: 'Bola' },
                  { angle: '240deg', bg: '#7ABF42', initials: 'TM', name: 'Tau', color: '#1A1A1A' },
                  { angle: '300deg', bg: '#5A9B30', initials: 'NJ', name: 'Njeri' },
                ] as Array<{ angle: string; bg: string; initials: string; name: string; color?: string }>).map((m, i) => (
                  <div key={i} className="ccd-member" style={{ '--angle': m.angle } as React.CSSProperties}>
                    <div className="ccd-avatar" style={{ background: m.bg, color: m.color ?? 'white' }}>{m.initials}</div>
                    <span>{m.name}</span>
                  </div>
                ))}
              </div>
              <div className="what-stat-row">
                <div className="wsr-item"><span className="wsr-num">300M+</span><span className="wsr-label">Chama Participants</span></div>
                <div className="wsr-divider" />
                <div className="wsr-item"><span className="wsr-num">$180B</span><span className="wsr-label">Annual Savings Volume</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section id="how-it-works" className="how-section">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Process</span>
            <h2 className="section-title">Five Steps to <span className="text-green">Graduate</span></h2>
            <p className="section-sub">From creation to yield — powered by smart contracts on Celo.</p>
          </div>
          <div className="steps-container">
            <div className="steps-line"><div className="steps-progress" ref={stepsProgressRef} /></div>
            {[
              { n: '01', title: 'Create or Join a Chama', desc: 'Start a new savings circle or join an existing one. Set your contribution amount, member cap, and deadline. Every rule is encoded in a smart contract — immutable and transparent.', badge: 'Smart Contract Deployed', cls: '', dir: 'left' },
              { n: '02', title: 'Contribute Capital', desc: 'Each member deposits their share in cUSD. During incubation, pooled capital earns yield through DeFi rehypothecation — your savings work while you wait.', badge: 'Capital Earns Yield', cls: 'green', dir: 'right' },
              { n: '03', title: 'Graduate Instantly at 100%', desc: 'Once the Chama is fully funded, it graduates automatically. No waiting, no admin approval. Missed deadline? All contributions are auto-refunded.', badge: 'Instant Graduation', cls: 'gold', dir: 'left' },
              { n: '04', title: 'Earn LP Tokens + Yield', desc: 'On graduation, members receive LP tokens representing their share of the pool. These LP tokens continue earning yield from rehypothecation — your stake keeps growing.', badge: 'LP Tokens Issued', cls: 'green', dir: 'right' },
              { n: '05', title: 'Exit Anytime', desc: 'Two exit paths: redeem LP tokens for cUSD plus yield, or sell your LP tokens on the bonding curve for instant liquidity. Full sovereignty, zero lockup.', badge: 'No Lockup', cls: '', dir: 'left' },
            ].map((s, i) => (
              <div key={i} className={`step-card reveal-${s.dir}`}>
                <div className="step-number">{s.n}</div>
                <div className="step-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className={`step-badge${s.cls ? ' ' + s.cls : ''}`}>{s.badge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── MECHANICS ───────── */}
      <section id="mechanics" className="mechanics-section">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Protocol</span>
            <h2 className="section-title">The <span className="text-green">Mechanics</span></h2>
            <p className="section-sub">Under the hood — how ChamaFi actually works on-chain.</p>
          </div>
          <div className="mechanics-flow">
            <div className="mf-stage reveal-up" data-delay="0">
              <div className="mf-stage-header"><span className="mf-stage-num">Phase 1</span><h3>Incubation</h3></div>
              <div className="mf-stage-body">
                <p>Members join and contribute capital. The pool is deployed into yield-bearing DeFi positions via rehypothecation — earning while the Chama fills up.</p>
                <div className="mf-items">
                  <div className="mf-item">💰 Capital pooled in smart contract</div>
                  <div className="mf-item">📈 Rehypothecated for yield</div>
                  <div className="mf-item">⏰ Deadline enforced on-chain</div>
                  <div className="mf-item mf-warn">⚠️ Miss deadline → auto-refund</div>
                </div>
              </div>
            </div>
            <div className="mf-arrow reveal-up" data-delay="100"><div className="mf-arrow-line" /><span>100% filled</span></div>
            <div className="mf-stage reveal-up" data-delay="200">
              <div className="mf-stage-header"><span className="mf-stage-num">Phase 2</span><h3>Graduation</h3></div>
              <div className="mf-stage-body">
                <p>When fully funded, the contract graduates instantly — no admin needed. LP tokens are minted and distributed proportional to contribution.</p>
                <div className="mf-items">
                  <div className="mf-item">🎉 Instant graduation, no delay</div>
                  <div className="mf-item">📋 LP tokens minted & distributed</div>
                  <div className="mf-item">📈 Yield accumulation continues</div>
                </div>
              </div>
            </div>
            <div className="mf-arrow reveal-up" data-delay="300"><div className="mf-arrow-line" /><span>LP tokens in hand</span></div>
            <div className="mf-stage reveal-up" data-delay="400">
              <div className="mf-stage-header"><span className="mf-stage-num">Phase 3</span><h3>Exit</h3></div>
              <div className="mf-stage-body">
                <p>LP holders choose how to exit. No lockup, no permission required — full sovereignty over your capital.</p>
                <div className="mf-exit-options">
                  <div className="mf-exit-opt"><div className="mf-exit-label">Option A</div><code>remove_liquidity</code><span>Redeem LP → cUSD + accrued yield</span></div>
                  <div className="mf-exit-or">OR</div>
                  <div className="mf-exit-opt"><div className="mf-exit-label">Option B</div><code>sell on bonding curve</code><span>Sell LP tokens instantly</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── WHERE TO USE ───────── */}
      <section id="where-to-use" className="where-section">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Platforms</span>
            <h2 className="section-title">Where to <span className="text-green">Use ChamaFi</span></h2>
            <p className="section-sub">One protocol. Three surfaces. Meet users where they already are.</p>
          </div>
          <div className="where-grid">
            <div className="where-card reveal-up" data-delay="0">
              <div className="wc-platform-badge">Full Experience</div>
              <div className="wc-icon">💻</div>
              <h3>Web App</h3>
              <p>The full ChamaFi experience. Create, manage, and monitor Chamas. Access LP positions, bonding curve trades, and protocol analytics.</p>
              <div className="wc-features">
                <div className="wc-feature">✓ Create and manage Chamas</div>
                <div className="wc-feature">✓ LP token management</div>
                <div className="wc-feature">✓ Bonding curve trading</div>
                <div className="wc-feature">✓ Full protocol analytics</div>
              </div>
              <Link to="/app" className="wc-btn">Open Web App →</Link>
            </div>
            <div className="where-card reveal-up" data-delay="100">
              <div className="wc-platform-badge">Simplified</div>
              <div className="wc-icon">📱</div>
              <h3>MiniPay</h3>
              <p>Optimized for Opera MiniPay on mobile. Simplified flows designed for African users with limited data and screen space. No wallet setup needed.</p>
              <div className="wc-features">
                <div className="wc-feature">✓ Auto-connect via MiniPay</div>
                <div className="wc-feature">✓ Mobile-first, low-data UX</div>
                <div className="wc-feature">✓ cUSD contributions</div>
                <div className="wc-feature">✓ Celo network only</div>
              </div>
              <Link to="/app" className="wc-btn">Open in MiniPay →</Link>
            </div>
            <div className="where-card reveal-up" data-delay="200">
              <div className="wc-platform-badge">Embedded</div>
              <div className="wc-icon">🟣</div>
              <h3>Farcaster Mini App</h3>
              <p>Embedded inside Farcaster clients. Share Chama invites as casts, contribute directly from your feed, and let your network join without leaving the app.</p>
              <div className="wc-features">
                <div className="wc-feature">✓ Embedded in Warpcast</div>
                <div className="wc-feature">✓ Share Chama links as casts</div>
                <div className="wc-feature">✓ Quick Auth via Farcaster</div>
                <div className="wc-feature">✓ 424×695 modal UX</div>
              </div>
              <a href="https://warpcast.com/~/mini-apps/chamafi" className="wc-btn">Open on Farcaster →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="faq" className="faq-section">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Common <span className="text-green">Questions</span></h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item reveal-up${openFaq === i ? ' open' : ''}`} data-delay={String(i * 80)}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-a"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="footer">
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-brand">
              <div className="footer-logo">
                <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
                  <circle cx="16" cy="16" r="14" stroke="#C4E86A" strokeWidth="2" />
                  <path d="M16 26 L16 10 M16 10 L10 17 M16 10 L22 17 M16 18 L9 14 M16 18 L23 14" stroke="#C4E86A" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                ChamaFi
              </div>
              <p>Savings circles, reimagined on Celo. Higher yield, instant access, rooted in African tradition.</p>
              <div className="footer-social">
                <a href="https://x.com/chamafi_xyz" className="social-link">X</a>
                <a href="https://warpcast.com/chamafi" className="social-link">FC</a>
                <a href="https://t.me/chamafi" className="social-link">TG</a>
                <a href="https://github.com/chamafi-xyz" className="social-link">GH</a>
              </div>
            </div>
            <span>© 2025 ChamaFi Protocol. Built on Celo.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
