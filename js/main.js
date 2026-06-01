/* ===== DOCHUB - MAIN JAVASCRIPT ===== */
/* Core functionality, cursor, loading, navigation, parallax */

'use strict';

/// ===== DEFAULT DATA =====
const DOCHUB_DEFAULT_DOCS = [
  // ===== RESUMES (Real PDF Files) =====
  { id: 1,  title: "ARUNKUMAR — Resume",                   owner: "Arun Kumar",         dept: "Engineering", category: "Resumes", date: "2025-01-01", icon: "📄", color: "#00d4ff", file: "documents/ARUNKUMAR RESUME.pdf" },
  { id: 2,  title: "Aravindhan V — Resume",                owner: "Aravindhan V",       dept: "IT",          category: "Resumes", date: "2025-01-01", icon: "📄", color: "#00d4ff", file: "documents/Aravindhan_V RESUME.pdf" },
  { id: 3,  title: "Elavarasan B — Resume",                owner: "Elavarasan B",       dept: "IT",          category: "Resumes", date: "2025-01-01", icon: "📄", color: "#00d4ff", file: "documents/Elavarasan_B_Resume.pdf" },
  { id: 4,  title: "M. Gokul Raj — Resume (Single Page)",  owner: "M. Gokul Raj",      dept: "IT",          category: "Resumes", date: "2025-01-01", icon: "📄", color: "#00d4ff", file: "documents/M_Gokul_Raj_Resume_SinglePage.pdf" },
  { id: 5,  title: "Muthukrishnan — Resume",               owner: "Muthukrishnan",      dept: "IT",          category: "Resumes", date: "2025-01-01", icon: "📄", color: "#00d4ff", file: "documents/Muthukrishnan.resume.pdf" },
  { id: 6,  title: "Ranjith K — Resume",                   owner: "Ranjith K",          dept: "IT",          category: "Resumes", date: "2025-01-01", icon: "📄", color: "#00d4ff", file: "documents/Ranjith_K Resume.pdf" },
  { id: 7,  title: "Sanjai G — Resume",                    owner: "Sanjai G",           dept: "IT",          category: "Resumes", date: "2025-01-01", icon: "📄", color: "#00d4ff", file: "documents/Sanjai_G_Resume.pdf" },
  { id: 8,  title: "Thayanithimaran P — Resume",           owner: "Thayanithimaran P",  dept: "IT",          category: "Resumes", date: "2025-01-01", icon: "📄", color: "#00d4ff", file: "documents/Thayanithimaran P resume.pdf" },
  { id: 9,  title: "Suvakovan — Resume",                   owner: "Suvakovan",          dept: "IT",          category: "Resumes", date: "2025-01-01", icon: "📄", color: "#00d4ff", file: "documents/suvakovan_resume.pdf" },
  // Projects
  { id: 10, title: "Enterprise Software Architecture Plan 2025", owner: "Arun Kumar",   dept: "Engineering", category: "Projects",              date: "2025-01-15", icon: "🏗️", color: "#b400ff" },
  { id: 11, title: "Mobile App UI/UX Design System",             owner: "Priya Sharma", dept: "Design",      category: "Projects",              date: "2025-02-20", icon: "📱", color: "#b400ff" },
  { id: 12, title: "Cloud Migration Strategy Q3",                owner: "Rohan Verma",  dept: "DevOps",      category: "Projects",              date: "2025-03-10", icon: "☁️", color: "#b400ff" },
  // Reports
  { id: 13, title: "Annual Financial Performance Report 2024",   owner: "Sneha Patel",  dept: "Finance",     category: "Reports",               date: "2025-01-05", icon: "📊", color: "#00ff88" },
  { id: 14, title: "Q4 Sales Analytics & Forecasting",           owner: "Vijay Nair",   dept: "Sales",       category: "Reports",               date: "2025-02-01", icon: "📈", color: "#00ff88" },
  // Certificates
  { id: 15, title: "AWS Solutions Architect Professional",        owner: "Arun Kumar",   dept: "Engineering", category: "Certificates",          date: "2024-11-15", icon: "🏆", color: "#ff6e00" },
  { id: 16, title: "Google Cloud Professional Data Engineer",     owner: "Rohan Verma",  dept: "DevOps",      category: "Certificates",          date: "2024-12-01", icon: "🎖️", color: "#ff6e00" },
  // Assignments
  { id: 17, title: "Machine Learning Model Implementation",       owner: "Dev Chopra",   dept: "AI/ML",       category: "Assignments",           date: "2025-03-01", icon: "🤖", color: "#ff006e" },
  { id: 18, title: "Cybersecurity Threat Assessment",             owner: "Karan Mehta",  dept: "Security",    category: "Assignments",           date: "2025-03-05", icon: "🔐", color: "#ff006e" },
  // Research Papers
  { id: 19, title: "Quantum Computing Applications in Cryptography", owner: "Dr. Arun Kumar",   dept: "Research", category: "Research Papers",      date: "2025-01-30", icon: "⚛️", color: "#00ffff" },
  { id: 20, title: "Neural Architecture Search for Edge Devices",    owner: "Dr. Priya Sharma", dept: "AI/ML",    category: "Research Papers",      date: "2025-02-28", icon: "🧠", color: "#00ffff" },
  // Internship Documents
  { id: 21, title: "Summer Internship — Google Cloud Project",    owner: "Neha Gupta",   dept: "Internship",  category: "Internship Documents",  date: "2024-09-30", icon: "🎓", color: "#ff6e00" },
  { id: 22, title: "Microsoft Azure Internship Report",           owner: "Rahul Das",    dept: "Internship",  category: "Internship Documents",  date: "2024-10-15", icon: "🔷", color: "#ff6e00" },
];

const DOCHUB_DEFAULT_CATS = [
  { name: "Resumes",              icon: "👤", color: "#00d4ff", shadow: "rgba(0,212,255,0.3)" },
  { name: "Projects",             icon: "🗂️", color: "#b400ff", shadow: "rgba(180,0,255,0.3)" },
  { name: "Reports",              icon: "📋", color: "#00ff88", shadow: "rgba(0,255,136,0.3)" },
  { name: "Certificates",         icon: "🏆", color: "#ff6e00", shadow: "rgba(255,110,0,0.3)" },
  { name: "Assignments",          icon: "📝", color: "#ff006e", shadow: "rgba(255,0,110,0.3)" },
  { name: "Research Papers",      icon: "🔬", color: "#00ffff", shadow: "rgba(0,255,255,0.3)" },
  { name: "Internship Documents", icon: "🎓", color: "#b400ff", shadow: "rgba(180,0,255,0.3)" },
];

// ===== LOAD FROM LOCALSTORAGE (persistent storage) =====
function loadDocHubData() {
  try {
    const savedDocs = localStorage.getItem('dochub_documents');
    const savedCats = localStorage.getItem('dochub_categories');
    return {
      documents:  savedDocs ? JSON.parse(savedDocs) : DOCHUB_DEFAULT_DOCS,
      categories: savedCats ? JSON.parse(savedCats) : DOCHUB_DEFAULT_CATS,
    };
  } catch(e) {
    // If localStorage fails (e.g. private mode), use defaults
    return { documents: DOCHUB_DEFAULT_DOCS, categories: DOCHUB_DEFAULT_CATS };
  }
}

// ===== SAVE TO LOCALSTORAGE =====
function saveDocHubData() {
  try {
    localStorage.setItem('dochub_documents',  JSON.stringify(window.DocHub.documents));
    localStorage.setItem('dochub_categories', JSON.stringify(window.DocHub.categories));
  } catch(e) { /* silent fail */ }
}

// ===== RESET TO DEFAULTS (helper — callable from console) =====
function resetDocHubData() {
  localStorage.removeItem('dochub_documents');
  localStorage.removeItem('dochub_categories');
  location.reload();
}

// ===== INIT GLOBAL STATE =====
const _loaded = loadDocHubData();
window.DocHub = {
  documents:     _loaded.documents,
  categories:    _loaded.categories,
  currentFilter: 'All',
  searchQuery:   '',
};

// ===== LOADING SCREEN =====
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  // Hide loading screen after 2.8s
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      // Trigger hero animations
      document.body.classList.add('loaded');
    }, 800);
  }, 2800);
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const light = document.getElementById('cursor-light');
  if (!dot || !ring) return;

  // Trail elements
  const trailCount = 8;
  const trails = [];
  for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `opacity: ${(trailCount - i) / trailCount * 0.4};`;
    document.body.appendChild(trail);
    trails.push({ el: trail, x: 0, y: 0 });
  }

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';

    if (light) {
      light.style.left = mouseX + 'px';
      light.style.top = mouseY + 'px';
    }
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    // Trail follow
    for (let i = trails.length - 1; i > 0; i--) {
      trails[i].x += (trails[i - 1].x - trails[i].x) * 0.35;
      trails[i].y += (trails[i - 1].y - trails[i].y) * 0.35;
      trails[i].el.style.left = trails[i].x + 'px';
      trails[i].el.style.top = trails[i].y + 'px';
      trails[i].el.style.opacity = ((trails.length - i) / trails.length * 0.35);
    }

    trails[0].x += (mouseX - trails[0].x) * 0.5;
    trails[0].y += (mouseY - trails[0].y) * 0.5;
    trails[0].el.style.left = trails[0].x + 'px';
    trails[0].el.style.top = trails[0].y + 'px';

    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover interactions
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .folder-card, .doc-card, .filter-tab, .nav-search-btn, .hamburger');
    if (target) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .folder-card, .doc-card, .filter-tab, .nav-search-btn, .hamburger');
    if (target) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Click ripple
  document.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY);
  });
}

// ===== CLICK RIPPLE =====
function createRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 800);
}

// ===== PARTICLE CANVAS =====
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  let mouseX = W / 2, mouseY = H / 2;

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Stars
  const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    speed: Math.random() * 0.3 + 0.05,
    opacity: Math.random() * 0.8 + 0.2,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.03 + 0.01,
    color: Math.random() > 0.8 ? '#b400ff' : Math.random() > 0.6 ? '#00ffff' : '#00d4ff',
  }));

  // Floating particles
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? 'rgba(0,212,255,' : 'rgba(180,0,255,',
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw stars
    stars.forEach(star => {
      star.twinkle += star.twinkleSpeed;
      const twinkleOpacity = star.opacity * (0.7 + 0.3 * Math.sin(star.twinkle));

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = star.color.replace(')', `, ${twinkleOpacity})`).replace('#', 'rgba(')
        // Simple approach:
      ctx.globalAlpha = twinkleOpacity;
      ctx.fillStyle = star.color;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Mouse repulsion
      const dx = mouseX - star.x;
      const dy = mouseY - star.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        star.x -= dx / dist * 0.3;
        star.y -= dy / dist * 0.3;
      }

      // Drift
      star.y += star.speed;
      if (star.y > H) {
        star.y = 0;
        star.x = Math.random() * W;
      }
    });

    // Draw particles
    particles.forEach(p => {
      // Mouse attraction
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        p.vx += dx / dist * 0.03;
        p.vy += dy / dist * 0.03;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.99;
      p.vy *= 0.99;

      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();

      // Glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = p.color + (p.opacity * 0.2) + ')';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// ===== NAVIGATION =====
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(0, 3, 15, 0.92)';
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
    } else {
      navbar.style.background = 'rgba(0, 5, 20, 0.6)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Mobile menu
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      const isOpen = mobileNav.classList.contains('open');
      spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity = isOpen ? '0' : '1';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '1';
        });
      });
    });
  }

  // Active link highlighting
  function setActiveNav() {
    const sections = document.querySelectorAll('section[id], #hero');
    const scrollY = window.scrollY + 80;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id ||
              link.getAttribute('href')?.includes(id)) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== FLOATING GEOMETRIC SHAPES =====
function initFloatingShapes() {
  const container = document.querySelector('.floating-shapes');
  if (!container) return;

  const shapes = [
    { type: 'cube', x: '10%', y: '15%', dur: '20s', delay: '0s' },
    { type: 'cube', x: '85%', y: '25%', dur: '25s', delay: '-5s' },
    { type: 'cube', x: '70%', y: '75%', dur: '18s', delay: '-10s' },
    { type: 'ring', x: '25%', y: '60%', dur: '28s', delay: '-8s' },
    { type: 'ring', x: '75%', y: '50%', dur: '22s', delay: '-3s' },
    { type: 'ring', x: '5%', y: '80%', dur: '20s', delay: '-12s' },
    { type: 'triangle', x: '50%', y: '20%', dur: '15s', delay: '-6s' },
    { type: 'triangle', x: '90%', y: '60%', dur: '22s', delay: '-15s' },
    { type: 'doc', x: '15%', y: '35%', dur: '12s', delay: '0s', emoji: '📄' },
    { type: 'doc', x: '88%', y: '40%', dur: '14s', delay: '-4s', emoji: '📁' },
    { type: 'doc', x: '60%', y: '88%', dur: '10s', delay: '-7s', emoji: '📊' },
    { type: 'doc', x: '3%', y: '50%', dur: '16s', delay: '-9s', emoji: '🗂️' },
  ];

  shapes.forEach(shape => {
    let el;
    if (shape.type === 'cube') {
      el = document.createElement('div');
      el.className = 'geo-shape geo-cube';
    } else if (shape.type === 'ring') {
      el = document.createElement('div');
      el.className = 'geo-shape geo-ring';
    } else if (shape.type === 'triangle') {
      el = document.createElement('div');
      el.className = 'geo-shape geo-triangle';
    } else if (shape.type === 'doc') {
      el = document.createElement('div');
      el.className = 'geo-shape hero-doc-float';
      el.textContent = shape.emoji;
      el.style.cssText = `
        --float-dur: ${shape.dur};
        --float-delay: ${shape.delay};
        left: ${shape.x}; top: ${shape.y};
        animation: float ${shape.dur} ease-in-out ${shape.delay} infinite;
      `;
      container.appendChild(el);
      return;
    }

    el.style.cssText = `left: ${shape.x}; top: ${shape.y}; animation-duration: ${shape.dur}; animation-delay: ${shape.delay};`;
    container.appendChild(el);
  });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  const aurora = document.querySelectorAll('.aurora');

  document.addEventListener('mousemove', (e) => {
    const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

    aurora.forEach((el, i) => {
      const speed = (i + 1) * 8;
      el.style.transform = `translate(${xPercent * speed}px, ${yPercent * speed}px) scale(${i === 1 ? 1.1 : 1})`;
    });

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 5;
      el.style.transform = `translate(${xPercent * speed}px, ${yPercent * speed}px)`;
    });

    // Tilt cards on mouse move
    document.querySelectorAll('.stat-card, .folder-inner').forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - cardCenterX) / rect.width;
      const deltaY = (e.clientY - cardCenterY) / rect.height;
      const rotX = deltaY * -8;
      const rotY = deltaX * 8;

      if (Math.abs(deltaX) < 1.5 && Math.abs(deltaY) < 1.5) {
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(5px)`;
      }
    });
  });

  document.addEventListener('mouseleave', () => {
    document.querySelectorAll('.stat-card, .folder-inner').forEach(card => {
      card.style.transform = '';
    });
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .timeline-item').forEach(el => {
    observer.observe(el);
  });
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;

        el.classList.add('counting');

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + suffix;
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'info', icon = '💡') {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// ===== NAV SEARCH BUTTON =====
function initNavSearch() {
  const btn = document.getElementById('nav-search-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const searchSection = document.getElementById('search-section');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const input = document.getElementById('search-input');
          if (input) input.focus();
        }, 500);
      }
    });
  }
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
  const el = document.querySelector('.typewriter');
  if (!el) return;

  const texts = [
    'Your Digital Document Universe',
    'Where Files Come Alive',
    'The Future of Document Management',
    'Experience 3D Document Space',
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      el.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(type, isDeleting ? 60 : 90);
  }

  type();
}

// ===== DOCUMENT VIEWER MODAL =====
function openDocViewer(docId) {
  const doc = DocHub.documents.find(d => d.id === docId);
  if (!doc) return;

  const modal = document.getElementById('viewer-modal');
  if (!modal) return;

  // Store current doc globally for all actions
  modal._currentDoc = doc;
  window._activeDoc = doc;

  // Populate metadata sidebar
  const setEl = (id, val) => { const el = modal.querySelector('#' + id); if (el) el.textContent = val; };
  setEl('modal-doc-title', doc.title);
  setEl('modal-meta-title', doc.title);
  setEl('modal-meta-owner', doc.owner);
  setEl('modal-meta-dept', doc.dept);
  setEl('modal-meta-category', doc.category);
  setEl('modal-meta-date', new Date(doc.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));

  // ===== BUILD PREVIEW AREA =====
  const previewArea = modal.querySelector('.modal-preview');

  if (doc.file) {
    // PDF Resume — show rich preview card + open button
    const filename = doc.file.split('/').pop();
    const fileSizeKB = '—';
    previewArea.innerHTML = `
      <div style="
        width:100%; height:100%;
        display:flex; flex-direction:column;
        align-items:center; justify-content:center;
        padding:30px; text-align:center; gap:20px;
      ">
        <!-- Big animated PDF icon -->
        <div style="
          width:110px; height:140px;
          background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05));
          border: 2px solid rgba(0,212,255,0.4);
          border-radius: 16px;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          gap:8px;
          box-shadow: 0 0 40px rgba(0,212,255,0.2), 0 20px 40px rgba(0,0,0,0.3);
          animation: float 4s ease-in-out infinite;
          position:relative; overflow:hidden;
        ">
          <div style="position:absolute; top:0; left:0; right:0; height:3px;
            background: linear-gradient(90deg, transparent, #00d4ff, transparent);"></div>
          <span style="font-size:3rem; line-height:1;">📄</span>
          <div style="
            background: rgba(220,50,50,0.9);
            color:white; font-family:var(--font-display);
            font-size:0.6rem; font-weight:800; letter-spacing:2px;
            padding:3px 10px; border-radius:4px;
          ">PDF</div>
        </div>

        <!-- File name -->
        <div style="max-width:300px;">
          <div style="
            font-family:var(--font-ui); font-size:0.7rem;
            letter-spacing:3px; text-transform:uppercase;
            color:var(--neon-blue); margin-bottom:8px;
          ">Document Ready</div>
          <div style="
            font-family:var(--font-body); font-size:0.95rem;
            font-weight:600; color:var(--text-primary);
            line-height:1.4; margin-bottom:6px;
          ">${doc.title}</div>
          <div style="font-size:0.78rem; color:var(--text-muted); font-family:var(--font-ui);">
            📁 ${filename}
          </div>
        </div>

        <!-- Open PDF Button — most reliable action -->
        <button onclick="viewPDFInNewTab()" style="
          display:inline-flex; align-items:center; gap:10px;
          padding:14px 32px;
          background: linear-gradient(135deg, #00d4ff, #b400ff);
          border:none; border-radius:12px;
          font-family:var(--font-ui); font-size:0.95rem;
          font-weight:700; letter-spacing:2px; text-transform:uppercase;
          color:#fff; cursor:pointer;
          box-shadow: 0 0 30px rgba(0,212,255,0.5), 0 8px 25px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        " onmouseover="this.style.transform='translateY(-3px) scale(1.03)'; this.style.boxShadow='0 0 50px rgba(0,212,255,0.8), 0 12px 30px rgba(0,0,0,0.4)';"
           onmouseout="this.style.transform=''; this.style.boxShadow='0 0 30px rgba(0,212,255,0.5), 0 8px 25px rgba(0,0,0,0.3)';">
          🔍 Open & View PDF
        </button>

        <div style="
          font-size:0.75rem; color:var(--text-muted);
          font-family:var(--font-ui); letter-spacing:1px;
          padding:10px 20px;
          background:rgba(0,212,255,0.04);
          border:1px solid rgba(0,212,255,0.1);
          border-radius:10px; max-width:280px;
        ">
          💡 PDF opens in a new browser tab.<br>Use ⬇️ Download to save it.
        </div>
      </div>
    `;
  } else {
    // No file — info placeholder
    previewArea.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;gap:16px;">
        <span style="font-size:5rem;filter:drop-shadow(0 0 20px var(--neon-blue));animation:float 5s ease-in-out infinite;">${doc.icon}</span>
        <div style="font-family:var(--font-ui);font-size:0.9rem;font-weight:700;color:var(--neon-blue);letter-spacing:2px;text-transform:uppercase;">Document Entry</div>
        <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;max-width:280px;">${doc.title}</p>
        <div style="padding:14px 20px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.1);border-radius:10px;">
          <p style="font-size:0.8rem;color:var(--text-muted);font-family:var(--font-ui);">📋 This is a metadata-only entry with no attached file.</p>
        </div>
      </div>
    `;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ===== OPEN PDF IN NEW TAB (most reliable for file://) =====
function viewPDFInNewTab() {
  const doc = window._activeDoc;
  if (!doc || !doc.file) return;
  window.open(doc.file, '_blank');
  showToast('PDF opened in new tab!', 'success', '🔍');
}

function closeDocViewer() {
  const modal = document.getElementById('viewer-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  const previewArea = modal.querySelector('.modal-preview');
  if (previewArea) previewArea.innerHTML = '';
  window._activeDoc = null;
}

// ===== DOWNLOAD DOCUMENT =====
function downloadDocument() {
  const doc = window._activeDoc;
  if (doc && doc.file) {
    // Method 1: anchor click download
    const a = document.createElement('a');
    a.href = doc.file;
    a.target = '_blank';           // fallback: open in tab if download blocked
    a.download = doc.file.split('/').pop();
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 200);
    showToast('Download started: ' + a.download, 'success', '⬇️');
  } else {
    showToast('No file available to download.', 'info', 'ℹ️');
  }
}

// ===== PRINT DOCUMENT =====
function printDocument() {
  const doc = window._activeDoc;
  if (doc && doc.file) {
    showToast('Opening PDF to print...', 'info', '🖨️');
    // Open in new tab — user can Ctrl+P from there
    window.open(doc.file, '_blank');
  } else {
    showToast('Nothing to print.', 'info', '🖨️');
  }
}

// ===== SHARE DOCUMENT =====
function shareDocument() {
  const doc = window._activeDoc;
  if (!doc) { showToast('No document selected.', 'info', 'ℹ️'); return; }

  // Remove any existing share dialog
  const existing = document.getElementById('share-dialog');
  if (existing) existing.remove();

  // Build the absolute file link URL
  const fileLink = doc.file
    ? new URL(doc.file, window.location.href).href
    : window.location.href;

  // Create share dialog
  const dialog = document.createElement('div');
  dialog.id = 'share-dialog';
  dialog.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(0,0,10,0.75);
    backdrop-filter: blur(10px);
    animation: fade-in 0.3s ease forwards;
  `;

  dialog.innerHTML = `
    <div style="
      width: 100%;
      max-width: 480px;
      background: rgba(2, 8, 35, 0.98);
      border: 1px solid rgba(0,212,255,0.35);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 0 60px rgba(0,212,255,0.15), 0 30px 80px rgba(0,0,0,0.6);
      animation: modal-open 0.4s cubic-bezier(0.23,1,0.32,1) forwards;
    ">
      <!-- Header -->
      <div style="
        padding: 20px 24px;
        border-bottom: 1px solid rgba(0,212,255,0.1);
        background: rgba(0,212,255,0.04);
        display: flex; align-items: center; justify-content: space-between;
      ">
        <div style="font-family:var(--font-display);font-size:0.85rem;font-weight:700;letter-spacing:3px;color:var(--neon-blue);text-transform:uppercase;">
          🔗 Share Document
        </div>
        <button onclick="document.getElementById('share-dialog').remove()" style="
          width:32px;height:32px;border-radius:8px;
          background:rgba(255,100,100,0.1);border:1px solid rgba(255,100,100,0.3);
          color:#ff6464;font-size:1rem;cursor:pointer;
          display:flex;align-items:center;justify-content:center;
          transition:all 0.2s ease;
        " onmouseover="this.style.background='rgba(255,100,100,0.25)'"
           onmouseout="this.style.background='rgba(255,100,100,0.1)'">✕</button>
      </div>

      <!-- Document Info Card -->
      <div style="padding: 20px 24px;">
        <div style="
          display:flex;align-items:center;gap:14px;
          padding:16px;
          background:rgba(0,212,255,0.04);
          border:1px solid rgba(0,212,255,0.12);
          border-radius:12px;
          margin-bottom:20px;
        ">
          <span style="font-size:2.5rem;flex-shrink:0;">${doc.icon}</span>
          <div>
            <div style="font-family:var(--font-body);font-size:0.9rem;font-weight:600;color:var(--text-primary);line-height:1.4;margin-bottom:4px;">${doc.title}</div>
            <div style="font-size:0.78rem;color:var(--neon-blue);font-family:var(--font-ui);letter-spacing:1px;">${doc.category} · ${doc.owner}</div>
          </div>
        </div>

        <!-- Link Box -->
        <div style="margin-bottom:16px;">
          <div style="font-family:var(--font-ui);font-size:0.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--neon-blue);margin-bottom:8px;font-weight:700;">
            📎 Document Link
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <input id="share-link-input" type="text" readonly value="${fileLink}" style="
              flex:1;
              padding:11px 14px;
              background:rgba(0,10,40,0.7);
              border:1px solid rgba(0,212,255,0.25);
              border-radius:10px;
              color:var(--text-secondary);
              font-family:var(--font-ui);
              font-size:0.78rem;
              outline:none;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
              cursor:text;
            " onclick="this.select()"/>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex;gap:10px;flex-wrap:wrap;">

          <!-- COPY LINK BUTTON -->
          <button id="copy-share-btn" onclick="copyFileLink()" style="
            flex:1; min-width:120px;
            padding:13px 20px;
            background:linear-gradient(135deg,var(--neon-blue),var(--neon-purple));
            border:none;border-radius:10px;
            font-family:var(--font-ui);font-size:0.85rem;font-weight:700;
            letter-spacing:1.5px;text-transform:uppercase;
            color:#fff;cursor:pointer;
            box-shadow:0 0 20px rgba(0,212,255,0.3);
            transition:all 0.3s ease;
            display:flex;align-items:center;justify-content:center;gap:8px;
          " onmouseover="this.style.boxShadow='0 0 40px rgba(0,212,255,0.6)';this.style.transform='translateY(-2px)'"
             onmouseout="this.style.boxShadow='0 0 20px rgba(0,212,255,0.3)';this.style.transform=''">
            🔗 Copy Link
          </button>

          <!-- OPEN IN DOCHUB BUTTON -->
          ${doc.file ? `
          <button onclick="openPDFInDocHub();document.getElementById('share-dialog').remove();" style="
            flex:1; min-width:120px;
            padding:13px 20px;
            background:transparent;
            border:1px solid rgba(0,212,255,0.35);
            border-radius:10px;
            font-family:var(--font-ui);font-size:0.85rem;font-weight:600;
            letter-spacing:1.5px;text-transform:uppercase;
            color:var(--neon-blue);cursor:pointer;
            transition:all 0.3s ease;
            display:flex;align-items:center;justify-content:center;gap:8px;
          " onmouseover="this.style.background='rgba(0,212,255,0.1)';this.style.transform='translateY(-2px)'"
             onmouseout="this.style.background='transparent';this.style.transform=''">
            🌐 Open in DocHub
          </button>` : ''}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);

  // Close on backdrop click
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.remove();
  });

  // Close on ESC
  const escHandler = (e) => {
    if (e.key === 'Escape') { dialog.remove(); document.removeEventListener('keydown', escHandler); }
  };
  document.addEventListener('keydown', escHandler);
}

// ===== COPY SHARE TEXT (always works on file://) =====
function copyShareText() {
  const box = document.getElementById('share-text-box');
  if (!box) return;

  // Select all text in textarea
  box.focus();
  box.select();
  box.setSelectionRange(0, 99999); // mobile fix

  let copied = false;

  // Try modern clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(box.value).then(() => {
      flashCopySuccess();
    }).catch(() => {
      // Fallback to execCommand
      copied = document.execCommand('copy');
      if (copied) flashCopySuccess();
    });
  } else {
    // execCommand fallback — works on file://
    copied = document.execCommand('copy');
    if (copied) flashCopySuccess();
  }
}

function flashCopySuccess() {
  const btn = document.getElementById('copy-share-btn');
  if (btn) {
    btn.textContent = '✅ Copied!';
    btn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
    setTimeout(() => {
      btn.innerHTML = '📋 Copy Info';
      btn.style.background = 'linear-gradient(135deg,var(--neon-blue),var(--neon-purple))';
    }, 2000);
  }
  showToast('Document info copied to clipboard!', 'success', '📋');
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initCustomCursor();
  initParticles();
  initNavigation();
  initFloatingShapes();
  initScrollReveal();
  initCounters();
  initNavSearch();
  initMagneticButtons();
  initTypewriter();
  initParallax();

  // Modal close
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close');
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeDocViewer);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDocViewer);

  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDocViewer();
  });

  // Expose globals
  window.openDocViewer = openDocViewer;
  window.closeDocViewer = closeDocViewer;
  window.printDocument = printDocument;
  window.shareDocument = shareDocument;
  window.downloadDocument = downloadDocument;
  window.viewPDFInNewTab = viewPDFInNewTab;
  window.copyFileLink = copyFileLink;
  window.openPDFInDocHub = openPDFInDocHub;
  window.flashCopySuccess = flashCopySuccess;
  window.copyShareText = copyShareText;
  window.showToast = showToast;
});
