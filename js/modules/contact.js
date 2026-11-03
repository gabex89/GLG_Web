// The address is kept base64-encoded so it does not appear in the HTML source for scrapers.
const ENCODED_EMAIL = 'aW5mb0BnbGdjb25zdWx0aW5nLmh1';

export function initContactEmail() {
  const link = document.getElementById('email-protect');
  if (!link) return;

  const email = atob(ENCODED_EMAIL);
  link.textContent = email;
  link.href = `mailto:${email}`;
}

export function initCopyrightYear() {
  const year = document.getElementById('spanYear');
  if (year) year.textContent = String(new Date().getFullYear());
}
