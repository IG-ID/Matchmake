const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.stats-inner, .steps-grid, .features-grid, .stories-grid, .testimonials-grid, .pricing-grid, .safety-features').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = i * 80;
  });
});

reveals.forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const counters = document.querySelectorAll('.stat-number');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseFloat(text.replace(/[^0-9.]/g, ''));
      const suffix = text.replace(/[0-9.]/g, '');
      let start = 0;
      const duration = 1500;
      const step = num / (duration / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, num);
        el.textContent = (Number.isInteger(num) ? Math.floor(start) : start.toFixed(1)) + suffix;
        if (start >= num) clearInterval(timer);
      }, 16);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

document.querySelector('.action-heart')?.addEventListener('click', function() {
  this.style.transform = 'scale(1.3)';
  setTimeout(() => this.style.transform = '', 300);
  const notif = document.createElement('div');
  notif.style.cssText = 'position:fixed;top:80px;right:20px;background:linear-gradient(135deg,#e8306b,#7c3aed);color:white;padding:14px 20px;border-radius:16px;font-family:DM Sans,sans-serif;font-weight:600;font-size:0.9rem;box-shadow:0 8px 30px rgba(0,0,0,0.2);z-index:9999;animation:slideIn 0.4s both;';
  notif.textContent = "It's a match!";
  document.body.appendChild(notif);
  setTimeout(() => notif.style.opacity = '0', 2500);
  setTimeout(() => notif.remove(), 3000);
});

if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}

const components = {
  navbar:              '#component-nav',
  hero:                '#component-hero',
  stats:               '#component-stats',
  how:                 '#component-how',
  features:            '#component-features',
  success:             '#component-success',
  safety:              '#component-safety',
  app:                 '#component-app',
  pricing:             '#component-pricing',
  testimonials:        '#component-testimonials',
  cta:                 '#component-cta',
  footer:              '#component-footer'
};

async function loadComponent(name, selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(`components/${name}.html`);
    if (!res.ok) throw new Error('no component');
    el.innerHTML = await res.text();
  } catch (e) {
    console.error('loadComponent', name, e);
  }
}

async function loadAllComponents() {
  await Promise.all(
    Object.entries(components).map(([name, sel]) => loadComponent(name, sel))
  );
  initObservers();
}

function initObservers() {
  document.querySelectorAll('.stats-inner, .steps-grid, .features-grid, .stories-grid, .testimonials-grid, .pricing-grid, .safety-features').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      el.dataset.delay = i * 80;
    });
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('.stat-number').forEach(c => countObserver.observe(c));

  document.querySelector('.action-heart')?.addEventListener('click', function () {
    this.style.transform = 'scale(1.3)';
    setTimeout(() => this.style.transform = '', 300);
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;top:80px;right:20px;background:linear-gradient(135deg,#e8306b,#7c3aed);color:white;padding:14px 20px;border-radius:16px;font-family:DM Sans,sans-serif;font-weight:600;font-size:0.9rem;box-shadow:0 8px 30px rgba(0,0,0,0.2);z-index:9999;animation:slideIn 0.4s both;';
    notif.textContent = "It's a match!";
    document.body.appendChild(notif);
    setTimeout(() => notif.style.opacity = '0', 2500);
    setTimeout(() => notif.remove(), 3000);
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
  loadAllComponents();
}