const SCROLL_TRIGGER = 100; // px

export function initBackToTop() {
  const button = document.getElementById('back-to-top');
  if (!button) return;

  const update = () => {
    const hidden = window.scrollY <= SCROLL_TRIGGER;
    button.classList.toggle('is-hidden', hidden);
    button.inert = hidden;
  };

  update();
  window.addEventListener('scroll', update, { passive: true });

  // Smoothness comes from `scroll-behavior` in CSS, which honours prefers-reduced-motion.
  button.addEventListener('click', () => window.scrollTo({ top: 0 }));
}
