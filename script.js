const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const links = Array.from(document.querySelectorAll('.main-nav a'));
const sections = links
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActiveLink = (id) => {
  links.forEach((link) => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', active);
  });
};

if (sections.length > 0 && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => observer.observe(section));
} else if (sections.length > 0) {
  setActiveLink(sections[0].id);
}
