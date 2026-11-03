// Key kept from the previous implementation so returning visitors are not asked again.
const STORAGE_KEY = 'showCookieBar';

function isAccepted() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

function rememberAccepted() {
  try {
    localStorage.setItem(STORAGE_KEY, 'True');
  } catch {
    // Storage unavailable (private mode, blocked cookies): the bar simply shows again next visit.
  }
}

export function initCookieBar() {
  const bar = document.querySelector('.cookie-bar');
  if (!bar || isAccepted()) return;

  bar.hidden = false;

  bar.querySelector('.cookie-btn').addEventListener('click', () => {
    rememberAccepted();

    const hide = () => {
      bar.hidden = true;
    };
    bar.classList.add('is-closing');

    if (getComputedStyle(bar).transitionDuration.split(',').every((d) => parseFloat(d) === 0)) {
      hide();
    } else {
      bar.addEventListener('transitionend', hide, { once: true });
    }
  });
}
