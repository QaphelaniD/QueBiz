// ── Custom Cursor ──────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (follower) {
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// ── Header scroll shadow ───────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile menu ────────────────────────────────────
const toggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
}

// ── Counter animation ──────────────────────────────
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = 'true';

  const target = parseInt(el.dataset.target);
  const isRand = el.classList.contains('stat-rand');
  const isPercent = el.classList.contains('stat-percent');
  const isHour = el.classList.contains('stat-hour');
  const steps = 60;
  const interval = 1800 / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += target / steps;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const display = Math.round(current).toLocaleString('en-ZA');
    if (isRand)         el.textContent = 'R' + display;
    else if (isPercent) el.textContent = display + '%';
    else if (isHour)    el.textContent = '<' + display + 'hr';
    else                el.textContent = display;
  }, interval);
}

// ── Smooth scroll ──────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Everything on page load ────────────────────────
window.addEventListener('load', () => {

  // 1. Enable CSS scroll animations
  document.documentElement.classList.add('js-ready');

  // 2. Immediately show elements already in viewport
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 30) {
      el.classList.add('visible');
    }
  });

  // 3. Reveal rest on scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => {
    if (!el.classList.contains('visible')) {
      revealObserver.observe(el);
    }
  });

  // 4. Counters — fire immediately if in view, else on scroll
  const statEls = document.querySelectorAll('.stat-num[data-target]');

  statEls.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      animateCounter(el);
    }
  });

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  statEls.forEach(el => {
    if (!el.dataset.animated) {
      statObserver.observe(el);
    }
  });

});
