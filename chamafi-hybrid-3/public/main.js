/* ChamaFi Hybrid Site 3 - Full Animation JS */
(function() {
'use strict';

// ──────────────────────────────────────────────
// PAGE TRANSITION (loading screen exit)
// ──────────────────────────────────────────────
const ptWipe = document.querySelector('.pt-wipe');
const ptLogo = document.querySelector('.pt-logo');

function exitPageTransition() {
  document.body.classList.remove('loading');
  if (ptLogo) {
    setTimeout(() => ptLogo.classList.add('fade-out'), 600);
  }
  if (ptWipe) {
    setTimeout(() => {
      ptWipe.classList.add('exit');
      setTimeout(() => {
        const pt = document.getElementById('page-transition');
        if (pt) pt.style.display = 'none';
      }, 900);
    }, 800);
  }
}

// ──────────────────────────────────────────────
// SUN RAYS GENERATOR
// ──────────────────────────────────────────────
function buildSunRays() {
  const rays = document.getElementById('sun-rays');
  if (!rays) return;
  const count = 12;
  for (let i = 0; i < count; i++) {
    const ray = document.createElement('div');
    const angle = (i / count) * 360;
    const len = 28 + Math.random() * 8;
    ray.style.cssText = `
      position: absolute; width: 2px; height: ${len}px;
      background: linear-gradient(to bottom, rgba(245,166,35,0.8), transparent);
      left: 50%; top: 50%;
      transform-origin: 50% 0%;
      transform: translateX(-50%) translateY(-100%) rotate(${angle}deg);
      border-radius: 1px;
    `;
    rays.appendChild(ray);
  }
}

// ──────────────────────────────────────────────
// GRASS BLADE GENERATOR
// ──────────────────────────────────────────────
const grassColors = ['#3A6B1E','#4A8025','#5A9B30','#2D5016','#6AAF32','#7ABF42'];

function buildGrass() {
  const field = document.getElementById('grass-field');
  if (!field) return;
  const count = 120;
  for (let i = 0; i < count; i++) {
    const blade = document.createElement('div');
    blade.className = 'grass-blade';
    const h = 20 + Math.random() * 55;
    const color = grassColors[Math.floor(Math.random() * grassColors.length)];
    const skew = (Math.random() - 0.5) * 20;
    blade.style.cssText = `
      height: ${h}px;
      background: linear-gradient(to top, ${color}, ${color}cc);
      transform: skewX(${skew}deg);
      opacity: ${0.7 + Math.random() * 0.3};
    `;
    blade.dataset.baseSkew = skew;
    field.appendChild(blade);
  }
}

// ──────────────────────────────────────────────
// TREE GROWTH ANIMATION (2.5s sequence)
// ──────────────────────────────────────────────
function animateTreeGrowth() {
  const tree = document.getElementById('main-tree');
  if (!tree) return;

  const parts = tree.querySelectorAll('.tree-part');
  const sequence = [
    { selector: '.trunk', delay: 0, duration: 400 },
    { selector: '.tree-part:not(.foliage):not(.foliage-hi):not(.trunk)', delay: 350, duration: 600 },
    { selector: '.foliage', delay: 800, duration: 700 },
    { selector: '.foliage-hi', delay: 1200, duration: 500 },
  ];

  // Hide all first
  parts.forEach(p => { p.style.opacity = '0'; p.style.transition = ''; });

  // Show trunk first with path animation
  const trunk = tree.querySelector('.trunk');
  if (trunk) {
    const len = trunk.getTotalLength ? trunk.getTotalLength() : 100;
    trunk.style.strokeDasharray = len;
    trunk.style.strokeDashoffset = len;
    setTimeout(() => {
      trunk.style.opacity = '1';
      trunk.style.transition = 'stroke-dashoffset 0.5s ease-out, opacity 0.1s';
      trunk.style.strokeDashoffset = '0';
    }, 100);
  }

  // Branches
  const branches = tree.querySelectorAll('.tree-part:not(.foliage):not(.foliage-hi):not(.trunk)');
  branches.forEach((b, i) => {
    setTimeout(() => {
      b.style.opacity = '1';
      b.style.transition = 'opacity 0.3s ease';
    }, 450 + i * 80);
  });

  // Foliage clusters with scale
  const foliage = tree.querySelectorAll('.foliage');
  foliage.forEach((f, i) => {
    f.style.transform = 'scale(0)';
    f.style.transformOrigin = 'center center';
    setTimeout(() => {
      f.style.opacity = '1';
      f.style.transition = 'opacity 0.3s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
      f.style.transform = 'scale(1)';
    }, 900 + i * 120);
  });

  // Highlights
  const hi = tree.querySelectorAll('.foliage-hi');
  hi.forEach((h, i) => {
    h.style.transform = 'scale(0)';
    setTimeout(() => {
      h.style.opacity = '0.85';
      h.style.transition = 'opacity 0.4s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      h.style.transform = 'scale(1)';
    }, 1400 + i * 150);
  });

  // Enable idle sway after growth
  setTimeout(() => {
    tree.classList.add('tree-idle');
    document.querySelectorAll('.small-tree').forEach(t => t.classList.add('shown'));
  }, 2500);
}

// ──────────────────────────────────────────────
// MOUSE-INTERACTIVE GRASS
// ──────────────────────────────────────────────
let mouseX = 0;
let grassField = null;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  if (!grassField) return;
  const rect = grassField.getBoundingClientRect();
  const center = window.innerWidth / 2;
  const force = (mouseX - center) / center;
  const blades = grassField.querySelectorAll('.grass-blade');
  blades.forEach((blade, i) => {
    const pos = i / blades.length;
    const dist = Math.abs(pos - 0.5);
    const baseSkew = parseFloat(blade.dataset.baseSkew) || 0;
    const windEffect = force * 15 * (1 - dist * 0.5);
    blade.style.transform = `skewX(${baseSkew + windEffect}deg)`;
  });
});

// ──────────────────────────────────────────────
// SCROLL-BASED ANIMATIONS
// ──────────────────────────────────────────────
const sun = document.getElementById('sun');
const skyDawn = document.getElementById('sky-dawn');
const skyDay = document.getElementById('sky-day');
const stepsProgress = document.getElementById('steps-progress');

function onScroll() {
  const scrollY = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollY / docH;

  // Sun rising on scroll (hero section)
  if (sun) {
    const heroH = document.getElementById('hero').offsetHeight;
    const sunProgress = Math.min(scrollY / (heroH * 0.6), 1);
    const sunY = 200 - sunProgress * 280;
    sun.style.transform = `translateY(${sunY}px)`;

    // Sky color transitions
    if (skyDawn) skyDawn.style.opacity = sunProgress < 0.5 ? sunProgress * 2 : 2 - sunProgress * 2;
    if (skyDay) skyDay.style.opacity = sunProgress > 0.4 ? (sunProgress - 0.4) * 1.67 : 0;
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', scrollY > 60);
  }

  // Steps progress line
  if (stepsProgress) {
    const howSection = document.getElementById('how-it-works');
    if (howSection) {
      const rect = howSection.getBoundingClientRect();
      const sectionProgress = Math.max(0, Math.min(1, (-rect.top + window.innerHeight * 0.3) / (howSection.offsetHeight * 0.7)));
      stepsProgress.style.height = (sectionProgress * 100) + '%';
    }
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ──────────────────────────────────────────────
// INTERSECTION OBSERVER - REVEAL ELEMENTS
// ──────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ──────────────────────────────────────────────
// NUMBER COUNTERS (mechanical flicker)
// ──────────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target) || 0;
  const prefix = el.dataset.prefix || '';
  const duration = 2000;
  const start = performance.now();
  const chars = '0123456789';

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function format(n) {
    const suffix = el.dataset.suffix || '';
    if (n >= 1000000) return prefix + (n/1000000).toFixed(1) + 'M' + suffix;
    if (n >= 1000) return prefix + Math.floor(n/1000) + 'K' + suffix;
    return prefix + Math.floor(n).toLocaleString() + suffix;
  }

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(easeOut(progress) * target);

    // Mechanical flicker: show random chars during count
    if (progress < 1) {
      const flickerChars = Math.floor((1 - progress) * 3);
      let display = format(current);
      if (flickerChars > 0) {
        display = display.slice(0, -flickerChars) + Array(flickerChars).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
      }
      el.textContent = display;
    } else {
      el.textContent = format(target);
    }

    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Also animate hero pills
function animatePillCounters() {
  document.querySelectorAll('.pill-num').forEach(el => {
    const target = parseInt(el.dataset.target) || 0;
    const duration = 1500;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1-p, 3);
      el.textContent = Math.floor(ease * target).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target.querySelector('.counter');
      if (counter) {
        animateCounter(counter);
        const bars = entry.target.querySelectorAll('.stat-bar-fill');
        bars.forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 300);
        });
      }
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-card').forEach(card => counterObserver.observe(card));

// ──────────────────────────────────────────────
// PARTICLE SEEDS (40 particles, canvas)
// ──────────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['rgba(196,232,106,0.6)', 'rgba(122,191,66,0.5)', 'rgba(90,155,48,0.4)', 'rgba(245,166,35,0.4)', 'rgba(196,164,124,0.3)'];

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(0.4 + Math.random() * 1.2),
      size: 2 + Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.04,
      life: 0,
      maxLife: 200 + Math.random() * 300,
      isSeed: Math.random() > 0.5,
    };
  }

  for (let i = 0; i < 40; i++) {
    const p = createParticle();
    p.y = Math.random() * canvas.height;
    p.life = Math.random() * p.maxLife;
    particles.push(p);
  }

  function drawSeed(ctx, x, y, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, size * 0.4, size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + size * 0.5, y - size * 0.5, size * 0.6, size * 0.2, Math.PI * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawParticle(ctx, p) {
    const alpha = p.opacity * Math.min(p.life / 30, 1) * Math.min((p.maxLife - p.life) / 30, 1);
    ctx.globalAlpha = alpha;
    if (p.isSeed) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.wobble);
      drawSeed(ctx, 0, 0, p.size, p.color);
      ctx.restore();
    } else {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx + Math.sin(p.wobble) * 0.5;
      p.y += p.vy;
      p.wobble += p.wobbleSpeed;
      p.life++;

      drawParticle(ctx, p);

      if (p.life >= p.maxLife || p.y < -20) {
        particles[i] = createParticle();
      }
    });

    animId = requestAnimationFrame(animate);
  }

  // Start when section is visible
  const communitySection = document.getElementById('community');
  const particleObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (!animId) animate();
      } else {
        cancelAnimationFrame(animId);
        animId = null;
      }
    });
  }, { threshold: 0.1 });

  if (communitySection) particleObserver.observe(communitySection);
  else animate();
}

// ──────────────────────────────────────────────
// FAQ ACCORDION
// ──────────────────────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// ──────────────────────────────────────────────
// TESTIMONIAL CAROUSEL
// ──────────────────────────────────────────────
function initTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.test-dot');
  let current = 0;
  let timer;

  function show(idx) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    if (testimonials[idx]) testimonials[idx].classList.add('active');
    if (dots[idx]) dots[idx].classList.add('active');
    current = idx;
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      show(parseInt(dot.dataset.idx));
      timer = setInterval(() => show((current + 1) % testimonials.length), 4500);
    });
  });

  timer = setInterval(() => show((current + 1) % testimonials.length), 4500);
}

// ──────────────────────────────────────────────
// SMOOTH ANCHOR SCROLL
// ──────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ──────────────────────────────────────────────
// HERO PILL COUNTERS (trigger on page load)
// ──────────────────────────────────────────────
function initHeroPills() {
  setTimeout(() => {
    document.querySelectorAll('.pill-num').forEach(el => {
      const target = parseInt(el.dataset.target) || 0;
      const duration = 1800;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1-p, 3);
        const val = Math.floor(ease * target);
        el.textContent = val >= 1000 ? (val/1000).toFixed(val >= 10000 ? 0 : 1) + (target >= 1000000 ? 'M' : 'K') : val;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target >= 1000 ? (target/1000).toFixed(0) + 'K' : target;
      }
      requestAnimationFrame(tick);
    });
  }, 1600);
}

// ──────────────────────────────────────────────
// INIT ALL
// ──────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  buildSunRays();
  buildGrass();
  grassField = document.getElementById('grass-field');

  // Start page transition exit
  setTimeout(exitPageTransition, 200);

  // Tree growth after transition
  setTimeout(animateTreeGrowth, 1000);

  // Other inits
  initFAQ();
  initTestimonials();
  initSmoothScroll();
  initParticles();
  initHeroPills();

  // Initial scroll check
  onScroll();
});

})();
