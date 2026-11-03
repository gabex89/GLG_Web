// Gives every service card title (and every lead) the height of the tallest one,
// so the cards line up across both columns. Below MIN_WIDTH the cards stack and keep natural height.
const MIN_WIDTH = 473; // px
const GROUPS = ['.service-item-title', '.service-item-lead'];
const RESIZE_DELAY = 150; // ms

function equalize(selector, enabled) {
  const elements = [...document.querySelectorAll(selector)];
  elements.forEach((el) => {
    el.style.height = '';
  });
  if (!enabled) return;

  const tallest = Math.max(...elements.map((el) => el.getBoundingClientRect().height));
  elements.forEach((el) => {
    el.style.height = `${tallest}px`;
  });
}

export function initEqualHeights() {
  if (!document.querySelector(GROUPS[0])) return;

  const query = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);
  const run = () => GROUPS.forEach((selector) => equalize(selector, query.matches));

  // Heights depend on the web fonts, so measure once they are in.
  document.fonts.ready.then(run);

  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(run, RESIZE_DELAY);
  });
}
