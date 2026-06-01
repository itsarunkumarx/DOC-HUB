/* ===== DOCHUB - EFFECTS JAVASCRIPT ===== */
/* Advanced visual effects: particles, 3D, light rays */

'use strict';

// ===== DYNAMIC LIGHT RAYS =====
function initLightRays() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const raysContainer = document.createElement('div');
  raysContainer.style.cssText = `
    position: absolute; inset: 0;
    overflow: hidden; pointer-events: none; z-index: 1;
  `;

  for (let i = 0; i < 6; i++) {
    const ray = document.createElement('div');
    const angle = (i * 30) + 15;
    const opacity = (Math.random() * 0.06 + 0.02).toFixed(3);
    const width = (Math.random() * 80 + 40).toFixed(0);
    const left = (Math.random() * 80 + 10).toFixed(0);
    const delay = (i * 2) + 's';

    ray.style.cssText = `
      position: absolute;
      bottom: 0;
      left: ${left}%;
      width: ${width}px;
      height: 100%;
      background: linear-gradient(to top, rgba(0,212,255,${opacity * 3}), rgba(0,212,255,${opacity}), transparent);
      transform-origin: bottom center;
      transform: rotate(${angle - 90}deg);
      animation: ray-flicker ${3 + i * 1.5}s ease-in-out ${delay} infinite;
      filter: blur(15px);
    `;
    raysContainer.appendChild(ray);
  }

  hero.appendChild(raysContainer);

  // Add keyframes if not exists
  if (!document.getElementById('ray-keyframes')) {
    const style = document.createElement('style');
    style.id = 'ray-keyframes';
    style.textContent = `
      @keyframes ray-flicker {
        0%, 100% { opacity: 0.4; transform-origin: bottom center; }
        25% { opacity: 1; }
        50% { opacity: 0.6; }
        75% { opacity: 0.9; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ===== HOVER SPARK EFFECT =====
function initHoverSparks() {
  document.querySelectorAll('.btn-primary, .folder-card, .doc-card').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      createSparkBurst(e.clientX, e.clientY, 5);
    });
  });
}

function createSparkBurst(x, y, count = 8) {
  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    const angle = (360 / count) * i;
    const distance = Math.random() * 40 + 20;
    const tx = Math.cos(angle * Math.PI / 180) * distance;
    const ty = Math.sin(angle * Math.PI / 180) * distance;
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 400 + 300;

    spark.style.cssText = `
      position: fixed;
      left: ${x}px; top: ${y}px;
      width: ${size}px; height: ${size}px;
      background: radial-gradient(circle, var(--neon-blue), var(--electric-cyan));
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      box-shadow: 0 0 6px var(--neon-blue);
      transform: translate(-50%, -50%);
      animation: spark-fly ${duration}ms ease-out forwards;
      --tx: ${tx}px; --ty: ${ty}px;
    `;

    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), duration);
  }
}

// Add spark keyframes
const sparkStyle = document.createElement('style');
sparkStyle.textContent = `
  @keyframes spark-fly {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
  }
`;
document.head.appendChild(sparkStyle);

// ===== 3D TILT ON MOUSE MOVE =====
function init3DTilt() {
  document.querySelectorAll('.doc-card, .stat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotX = (y - 0.5) * -12;
      const rotY = (x - 0.5) * 12;

      card.style.transform = `
        perspective(800px) 
        rotateX(${rotX}deg) 
        rotateY(${rotY}deg) 
        translateZ(10px)
        scale(1.02)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      setTimeout(() => {
        card.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
      }, 10);
    });
  });
}

// ===== AMBIENT GLOW FOLLOWING CURSOR =====
function initAmbientGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 2;
    transform: translate(-50%, -50%);
    transition: left 0.1s ease, top 0.1s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ===== GLASS REFLECTION EFFECT =====
function initGlassReflection() {
  document.querySelectorAll('.folder-inner, .modal-panel').forEach(el => {
    const reflection = document.createElement('div');
    reflection.style.cssText = `
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 40%;
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%);
      pointer-events: none;
      border-radius: inherit;
      z-index: 1;
    `;
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }
    el.appendChild(reflection);
  });
}

// ===== SECTION ENTER ANIMATIONS =====
function initSectionAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const cards = section.querySelectorAll('.doc-card:not(.visible), .folder-card:not(.visible)');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, i * 80);
        });
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// ===== FLOATING RINGS EFFECT =====
function initFloatingRings() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const rings = [
    { size: 300, opacity: 0.06, animDuration: '20s', animDelay: '0s', x: '50%', y: '50%' },
    { size: 500, opacity: 0.04, animDuration: '30s', animDelay: '-10s', x: '40%', y: '60%' },
    { size: 200, opacity: 0.08, animDuration: '15s', animDelay: '-5s', x: '60%', y: '40%' },
  ];

  rings.forEach(ring => {
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      width: ${ring.size}px; height: ${ring.size}px;
      border-radius: 50%;
      border: 1px solid rgba(0,212,255,${ring.opacity});
      left: ${ring.x}; top: ${ring.y};
      transform: translate(-50%, -50%);
      animation: ring-rotate ${ring.animDuration} linear ${ring.animDelay} infinite;
      pointer-events: none;
      box-shadow: 0 0 20px rgba(0,212,255,${ring.opacity * 0.5});
    `;
    hero.appendChild(el);
  });

  if (!document.getElementById('ring-keyframes')) {
    const style = document.createElement('style');
    style.id = 'ring-keyframes';
    style.textContent = `
      @keyframes ring-rotate {
        0% { transform: translate(-50%, -50%) rotateX(75deg) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotateX(75deg) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

// ===== NEON SCANLINE EFFECT =====
function initScanline() {
  const scanline = document.createElement('div');
  scanline.className = 'scan-line';
  document.body.appendChild(scanline);
}

// ===== BUTTON RIPPLE EFFECT =====
function initButtonRipples() {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
      `;
      this.style.position = 'relative';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}

// ===== ABOUT CARDS MOUSE TILT =====
function initAboutTilt() {
  document.querySelectorAll('.about-card-3d').forEach((card, i) => {
    const baseRotateY = i === 0 ? -15 : i === 1 ? 10 : 5;
    const baseRotateX = i === 0 ? 5 : i === 1 ? -5 : 10;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${baseRotateY + x * 10}deg) rotateX(${baseRotateX - y * 10}deg) translateZ(20px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotateY(${baseRotateY}deg) rotateX(${baseRotateX}deg)`;
    });
  });
}

// ===== PERFORMANCE OPTIMIZED RAF LOOP =====
let lastTime = 0;
function throttledRAF(callback, fps = 60) {
  const interval = 1000 / fps;
  function tick(time) {
    if (time - lastTime >= interval) {
      lastTime = time;
      callback();
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ===== INIT ALL EFFECTS =====
document.addEventListener('DOMContentLoaded', () => {
  initLightRays();
  initFloatingRings();
  initScanline();
  initAmbientGlow();
  initGlassReflection();
  initSectionAnimations();
  initAboutTilt();

  // Deferred effects for performance
  setTimeout(() => {
    initHoverSparks();
    init3DTilt();
    initButtonRipples();
  }, 3000);

  window.createSparkBurst = createSparkBurst;
});
