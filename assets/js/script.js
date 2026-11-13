// Rastreamento de cliques no WhatsApp (evento "whatsapp_click" no GA4)
document.addEventListener('click', (e) => {
  const link = e.target.closest && e.target.closest('a[href^="https://wa.me/"]');
  if (!link || typeof window.gtag !== 'function') return;
  const path = location.pathname;
  window.gtag('event', 'whatsapp_click', {
    link_text: ((link.textContent || '').trim() || link.getAttribute('aria-label') || 'icone').replace(/\s+/g, ' ').slice(0, 80),
    market: path.indexOf('/br/') === 0 ? 'br' : 'pt',
    page_path: path,
    transport_type: 'beacon'
  });
}, true);

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle?.addEventListener('click', () => {
  nav.classList.toggle('is-open');
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('is-open'));
});

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 8px 24px -12px #00000080' : 'none';
});

// Reveal on scroll
const revealEls = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Newsletter form (placeholder submit)
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = newsletterForm.querySelector('input');
  input.value = '';
  const btn = newsletterForm.querySelector('button');
  const original = btn.textContent;
  btn.textContent = 'Subscrito!';
  setTimeout(() => { btn.textContent = original; }, 2200);
});
