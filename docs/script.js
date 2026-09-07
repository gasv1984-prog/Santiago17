const siteRoot = document.querySelector('#site');
const detailSection = document.querySelector('#detalle');
const revealButton = document.querySelector('#reveal');
const entranceVideo = document.querySelector('#entrada');
const adventureVideo = document.querySelector('#aventura');
const soundButton = document.querySelector('#sound');
const startScreen = document.querySelector('#start');
const confirmButton = document.querySelector('#confirm');
const guestNameInput = document.querySelector('#guest-name');

function enableAudio() {
  entranceVideo.muted = false;
  adventureVideo.muted = false;
  entranceVideo.play().catch(() => {});
  adventureVideo.play().catch(() => {});
  soundButton.textContent = '🔊';
  soundButton.setAttribute('aria-label', 'Silenciar video');
}

document.addEventListener('pointerdown', enableAudio, { once: true });
startScreen.addEventListener('click', () => {
  enableAudio();
  startScreen.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(1.04)' }], { duration: 650, easing: 'ease', fill: 'forwards' }).finished.then(() => startScreen.remove());
});

confirmButton.addEventListener('click', () => {
  const name = guestNameInput.value.trim();
  const intro = name ? `¡Hola! Soy ${name} y ` : '¡Hola! ';
  const message = `${intro}confirmo mi asistencia al cumpleaños de Santiago Andrés Sánchez Castro en Buggy Salento, el domingo 13 de septiembre de 2026 a la 1:30 p. m., en Salento, Quindío. 🏁`;
  confirmButton.href = `https://wa.me/573113587324?text=${encodeURIComponent(message)}`;
});

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
  const finished = values.every(value => value === 0);
  document.querySelector('#countdown-wrap').classList.toggle('finished', finished);
  document.querySelector('#countdown-label').textContent = finished ? '¡Llegamos a la meta! 🏁' : 'La aventura comienza en';

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
