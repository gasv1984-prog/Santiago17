const siteRoot = document.querySelector('#site');
const detailSection = document.querySelector('#detalle');
const revealButton = document.querySelector('#reveal');
const entranceVideo = document.querySelector('#entrada');
const adventureVideo = document.querySelector('#aventura');
const soundButton = document.querySelector('#sound');

function enableAudio() {
  entranceVideo.muted = false;
  adventureVideo.muted = false;
  entranceVideo.play().catch(() => {});
  adventureVideo.play().catch(() => {});
  soundButton.textContent = '🔊';
  soundButton.setAttribute('aria-label', 'Silenciar video');
}

document.addEventListener('pointerdown', enableAudio, { once: true });

revealButton.addEventListener('click', () => {
  enableAudio();
  siteRoot.classList.add('is-open');
  revealButton.firstChild.textContent = 'La aventura te espera ';
  detailSection.scrollIntoView({ behavior: 'smooth' });
});

new IntersectionObserver(([entry]) => {
  entranceVideo.classList.toggle('active', !entry.isIntersecting);
  adventureVideo.classList.toggle('active', entry.isIntersecting);
}, { threshold: 0.35 }).observe(detailSection);

soundButton.addEventListener('click', () => {
  const muted = !entranceVideo.muted;
  entranceVideo.muted = adventureVideo.muted = muted;
  soundButton.textContent = muted ? '♫' : '🔊';
  soundButton.setAttribute('aria-label', muted ? 'Activar sonido' : 'Silenciar video');
});

const countdownIds = ['days', 'hours', 'minutes', 'seconds'];
let lastValues = ['', '', '', ''];
let countdownTimer;

function updateCountdown() {
  const target = new Date('2026-09-13T13:30:00-05:00').getTime();
  const distance = Math.max(0, target - Date.now());
  const values = [Math.floor(distance / 86400000), Math.floor(distance / 3600000) % 24, Math.floor(distance / 60000) % 60, Math.floor(distance / 1000) % 60];

  countdownIds.forEach((id, index) => {
    const element = document.getElementById(id);
    const nextValue = String(values[index]).padStart(2, '0');
    if (lastValues[index] !== nextValue) {
      element.textContent = nextValue;
      element.classList.remove('counter-flip');
      void element.offsetWidth;
      element.classList.add('counter-flip');
      lastValues[index] = nextValue;
    }
  });

  clearTimeout(countdownTimer);
  countdownTimer = setTimeout(updateCountdown, 1000 - (Date.now() % 1000) + 20);
}

document.addEventListener('visibilitychange', () => { if (!document.hidden) updateCountdown(); });
window.addEventListener('pageshow', updateCountdown);
updateCountdown();
