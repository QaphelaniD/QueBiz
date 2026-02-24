// HEADER SCROLL EFFECT
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// MOBILE MENU TOGGLE - FIXED VERSION
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle && navMenu) {
  console.log('Mobile toggle found'); // Debug - check console
  
  mobileToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    console.log('Toggle clicked'); // Debug - check console
  });
  
  // Close menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileToggle.contains(e.target)) {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
} else {
  console.log('Mobile toggle not found'); // Debug - check console
}

// FADE-IN ON SCROLL ANIMATION
const fadeElements = document.querySelectorAll('.service-card, .pricing-card, .why-item, .project-card');

function checkFade() {
  fadeElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('visible');
    }
  });
}

// Initial check on load
window.addEventListener('load', checkFade);
// Check on scroll
window.addEventListener('scroll', checkFade);

// FORM SUBMISSION
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const original = btn.innerHTML;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;
    
    // Simulate form submission (replace with actual Formspree)
    setTimeout(() => {
      btn.innerHTML = '✓ Message sent!';
      btn.style.background = '#7f8f7a';
      
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
        this.reset();
      }, 2000);
    }, 1500);
    
    // Uncomment this for actual Formspree
    // this.submit();
  });
}

