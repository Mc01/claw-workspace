// ============================================
// CHAMAFY HYBRID 2 — Main Animations
// Sun rise · Grass wind · Seeds · Adinkra · Stats
// ============================================

// ---- Custom Cursor ----
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--cx', e.clientX + 'px');
  document.documentElement.style.setProperty('--cy', e.clientY + 'px');
  window._mouseX = e.clientX;
  window._mouseY = e.clientY;
});

// ---- Nav scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ============================================
// GRASS FIELD GENERATOR
// ============================================
function buildGrass() {
  const field = document.getElementById('grass-field');
  if (!field) return;
  const w = window.innerWidth;
  const bladeCount = Math.floor(w / 5);

  for (let i = 0; i < bladeCount; i++) {
    const blade = document.createElement('div');
    blade.className = 'grass-blade';
    const x = (i / bladeCount) * 100;
    const height = 40 + Math.random() * 80;
    const baseRot = (Math.random() - 0.5) * 8;
    const delay = Math.random() * 3;
    const dur = 2.5 + Math.random() * 2;
    // Color variation: mix of grass shades
    const lightness = 25 + Math.random() * 20;
    const hue = 100 + Math.random() * 30;
    const color = `hsl(${hue}, 55%, ${lightness}%)`;

    blade.style.cssText = `
      left: ${x}%;
      height: ${height}px;
      background: linear-gradient(to top, ${color}, ${color}cc, transparent);
      --base-rot: ${baseRot}deg;
      animation: grass-sway ${dur}s ${delay}s ease-in-out infinite;
      transform: rotate(${baseRot}deg);
    `;
    blade._baseX = x;
    blade._baseRot = baseRot;
    field.appendChild(blade);
  }
}
buildGrass();

// ---- Mouse repulsion on grass ----
const grassField = document.getElementById('grass-field');
let grassBlades = [];
function refreshBlades() { grassBlades = Array.from(document.querySelectorAll('.grass-blade')); }
refreshBlades();

document.addEventListener('mousemove', (e) => {
  const fieldRect = grassField?.getBoundingClientRect();
  if (!fieldRect) return;
  if (e.clientY < fieldRect.top - 60) return;

  grassBlades.forEach(blade => {
    const bx = (parseFloat(blade._baseX) / 100) * window.innerWidth;
    const dist = Math.abs(e.clientX - bx);
    if (dist < 120) {
      const force = (1 - dist / 120) * 25;
      const dir = e.clientX > bx ? -1 : 1;
      const rot = (blade._baseRot || 0) + dir * force;
      blade.style.transform = `rotate(${rot}deg)`;
      blade.style.transition = 'transform 0.1s ease-out';
    } else {
      blade.style.transform = `rotate(${blade._baseRot || 0}deg)`;
      blade.style.transition = 'transform 0.4s ease-out';
    }
  });
});

// ============================================
// SUN RISE ON SCROLL — right-side positioning
// ============================================
const sunContainer = document.getElementById('sun-container');
const hero = document.getElementById('hero');

// Cap sun's upward travel so it never enters the nav zone (top ~80px)
function updateSun() {
  if (!sunContainer || !hero) return;
  const scrolled = window.scrollY;
  const heroH = hero.offsetHeight;
  // Slow, dramatic rise: full travel over 70% of hero height
  const progress = Math.min(scrolled / (heroH * 0.70), 1);
  // Ease-in-out curve for smoother feel
  const eased = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  // Sun starts at +100px below normal, rises to -80px above (stays below nav)
  const translateY = 100 - (eased * 200);
  // Subtle scale: grows slightly as it rises (perspective effect)
  const scale = 0.85 + eased * 0.25;
  // Fade out as it disappears past horizon on fast scroll
  const opacity = eased < 0.85 ? 1 : 1 - ((eased - 0.85) / 0.15) * 0.6;

  sunContainer.style.transform = `translateY(${translateY}px) scale(${scale})`;
  sunContainer.style.opacity = opacity;
}

window.addEventListener('scroll', updateSun, { passive: true });
updateSun();

// ============================================
// FLOATING SEEDS PARTICLE SYSTEM
// ============================================
const canvas = document.getElementById('seed-canvas');
const ctx = canvas.getContext('2d');
let seeds = [];
let animFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createSeed() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    vx: (Math.random() - 0.5) * 0.8,
    vy: -(0.4 + Math.random() * 0.8),
    size: 1.5 + Math.random() * 3,
    opacity: 0.3 + Math.random() * 0.5,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.02 + Math.random() * 0.03,
    tail: Math.random() > 0.5,
    color: Math.random() > 0.5 ? '#D4A017' : '#E8D5A3',
    life: 0,
    maxLife: 180 + Math.random() * 200,
  };
}

// Init 40 seeds
for (let i = 0; i < 40; i++) {
  const s = createSeed();
  s.y = Math.random() * canvas.height; // scatter initial positions
  s.life = Math.random() * s.maxLife;
  seeds.push(s);
}

function drawSeed(s) {
  const lifeRatio = s.life / s.maxLife;
  const fadeIn = Math.min(s.life / 30, 1);
  const fadeOut = lifeRatio > 0.8 ? 1 - (lifeRatio - 0.8) / 0.2 : 1;
  const alpha = s.opacity * fadeIn * fadeOut;

  ctx.save();
  ctx.globalAlpha = alpha;

  if (s.tail) {
    // Dandelion seed with tail
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
    ctx.stroke();

    // Seed head (small starburst)
    ctx.fillStyle = s.color;
    for (let a = 0; a < 6; a++) {
      const angle = (a / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + Math.cos(angle) * s.size, s.y + Math.sin(angle) * s.size);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size * 0.4, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Simple glowing dot
    const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 2);
    grad.addColorStop(0, s.color);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size * 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function animateSeeds() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  seeds = seeds.filter(s => s.life < s.maxLife);

  while (seeds.length < 40) {
    seeds.push(createSeed());
  }

  seeds.forEach(s => {
    s.wobble += s.wobbleSpeed;
    s.x += s.vx + Math.sin(s.wobble) * 0.3;
    s.y += s.vy;
    s.life++;
    drawSeed(s);
  });

  animFrame = requestAnimationFrame(animateSeeds);
}
animateSeeds();

// ============================================
// STATS COUNTER + RING ANIMATION
// ============================================
function formatNumber(n, prefix, suffix) {
  let formatted;
  if (n >= 1000000) formatted = '$' + (n / 1000000).toFixed(1) + 'M';
  else if (n >= 1000) formatted = (n / 1000).toFixed(1) + 'K';
  else formatted = n.toString();

  if (prefix && prefix !== '$') formatted = prefix + formatted;
  if (suffix) formatted += suffix;
  return formatted;
}

function animateCounter(el, target, prefix, suffix) {
  const start = performance.now();
  const dur = 2500;
  function step(now) {
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 4);
    const val = Math.round(target * ease);
    el.textContent = formatNumber(val, prefix, suffix || '');
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = formatNumber(target, prefix, suffix || '');
  }
  requestAnimationFrame(step);
}

function animateRing(ring, pct) {
  const circumference = 251;
  const offset = circumference - (pct / 100) * circumference;
  ring.style.strokeDashoffset = offset;
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const cards = entry.target.querySelectorAll('.stat-card');
    cards.forEach((card, i) => {
      setTimeout(() => {
        const valueEl = card.querySelector('.stat-value');
        const ring = card.querySelector('.ring-fill');
        const target = parseInt(valueEl.dataset.target);
        const prefix = valueEl.dataset.prefix || '';
        const suffix = valueEl.dataset.suffix || '';
        animateCounter(valueEl, target, prefix, suffix);
        if (ring) animateRing(ring, 78 - i * 12);
      }, i * 200);
    });
    statsObserver.disconnect();
  });
}, { threshold: 0.3 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// ============================================
// STEP REVEAL (HOW IT WORKS)
// ============================================
const stepObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const steps = entry.target.querySelectorAll('.step');
      steps.forEach((step, i) => {
        setTimeout(() => step.classList.add('visible'), i * 200);
      });
      stepObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

const stepsContainer = document.querySelector('.steps-container');
if (stepsContainer) stepObserver.observe(stepsContainer);

// ============================================
// GENERIC REVEAL OBSERVER
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.stat-card, .problem-card, .solution-card, .feature-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ============================================
// ADINKRA PATTERN FEATURE CARDS BG
// ============================================
const adinkraPatterns = [
  // Concentric circles (Adinkra Gye Nyame style)
  `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='none' stroke='%23D4A017' stroke-width='2'/><circle cx='50' cy='50' r='30' fill='none' stroke='%23D4A017' stroke-width='2'/><circle cx='50' cy='50' r='15' fill='none' stroke='%23D4A017' stroke-width='2'/><path d='M50 5 L50 95 M5 50 L95 50' stroke='%23C4622D' stroke-width='1'/></svg>`,
  // Hexagon pattern
  `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><polygon points='50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5' fill='none' stroke='%23C4622D' stroke-width='2'/><polygon points='50,20 78,35 78,65 50,80 22,65 22,35' fill='none' stroke='%23C4622D' stroke-width='2'/><circle cx='50' cy='50' r='10' fill='none' stroke='%23C4622D' stroke-width='2'/></svg>`,
  // Diamond cross
  `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect x='15' y='15' width='70' height='70' fill='none' stroke='%234A7C3F' stroke-width='2' transform='rotate(45 50 50)'/><rect x='28' y='28' width='44' height='44' fill='none' stroke='%234A7C3F' stroke-width='1.5' transform='rotate(45 50 50)'/><circle cx='50' cy='50' r='8' fill='none' stroke='%234A7C3F' stroke-width='2'/></svg>`,
  // Star of eight
  `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><path d='M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z' fill='none' stroke='%23D4A017' stroke-width='2'/><circle cx='50' cy='50' r='12' fill='none' stroke='%23D4A017' stroke-width='2'/></svg>`,
  // Cross hatched square (Adinkra Nkyinkyim)
  `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><path d='M50 5 L95 50 L50 95 L5 50 Z' fill='none' stroke='%23C4622D' stroke-width='2'/><path d='M5 50 L95 50 M50 5 L50 95' stroke='%23C4622D' stroke-width='1.5'/><path d='M20 20 L80 80 M80 20 L20 80' stroke='%23C4622D' stroke-width='1' opacity='0.5'/></svg>`,
  // Triple circle (Community)
  `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='30' cy='35' r='22' fill='none' stroke='%234A7C3F' stroke-width='2'/><circle cx='70' cy='35' r='22' fill='none' stroke='%234A7C3F' stroke-width='2'/><circle cx='50' cy='68' r='22' fill='none' stroke='%234A7C3F' stroke-width='2'/></svg>`,
];

document.querySelectorAll('.feature-adinkra-bg').forEach(el => {
  const idx = parseInt(el.dataset.adinkra || '0') % adinkraPatterns.length;
  const svgData = adinkraPatterns[idx];
  const encoded = svgData.replace(/'/g, '%27').replace(/#/g, '%23');
  el.style.background = `url("data:image/svg+xml,${encoded}") no-repeat center`;
  el.style.backgroundSize = 'contain';
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// MINIPAY CTA — detect MiniPay environment
// ============================================
if (window.ethereum?.isMiniPay) {
  const ctaBtn = document.querySelector('.btn-minipay');
  if (ctaBtn) {
    ctaBtn.textContent = '✓ Already in MiniPay — Start Saving';
    ctaBtn.href = '#';
  }
}

// ============================================
// REVEAL: Add new card types to observer
// ============================================
document.querySelectorAll('.mech-card, .platform-card, .pillar').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ============================================
// LIFECYCLE FLOW: stagger animate on scroll
// ============================================
const lcObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const steps = entry.target.querySelectorAll('.lifecycle-step');
    const arrows = entry.target.querySelectorAll('.lifecycle-arrow');
    steps.forEach((step, i) => {
      setTimeout(() => {
        step.style.opacity = '1';
        step.style.transform = 'translateY(0)';
      }, i * 120);
    });
    arrows.forEach((arrow, i) => {
      setTimeout(() => { arrow.style.opacity = '0.6'; }, i * 120 + 60);
    });
    lcObserver.disconnect();
  });
}, { threshold: 0.2 });

const lcFlow = document.querySelector('.lifecycle-flow');
if (lcFlow) {
  // Initial state
  lcFlow.querySelectorAll('.lifecycle-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  lcFlow.querySelectorAll('.lifecycle-arrow').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.3s ease';
  });
  lcObserver.observe(lcFlow);
}
