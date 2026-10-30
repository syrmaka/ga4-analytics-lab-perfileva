// Разрешённые UTM-метки, которые переносим дальше на форму
const ALLOWED_UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

function buildContactsUrl() {
  const currentParams = new URLSearchParams(window.location.search);
  const forwardParams = new URLSearchParams();

  ALLOWED_UTM.forEach(key => {
    if (currentParams.has(key)) {
      forwardParams.set(key, currentParams.get(key));
    }
  });

  const query = forwardParams.toString();
  return 'contacts.html' + (query ? '?' + query : '');
}

document.addEventListener('DOMContentLoaded', () => {
  const ctaLink = document.getElementById('cta-link');
  ctaLink.href = buildContactsUrl();

  ctaLink.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'cta_click', {
        link_url: ctaLink.href
      });
    }
  });
});
