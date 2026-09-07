'use client';

import { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronDown, Clock3, MapPin, MessageCircle, Volume2, VolumeX } from 'lucide-react';

const getCountdown = () => {
  const distance = Math.max(0, new Date('2026-09-13T13:30:00-05:00').getTime() - Date.now());
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
};

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(true);
  const [activeVideo, setActiveVideo] = useState<'entrada' | 'aventura'>('entrada');
  const [countdown, setCountdown] = useState(getCountdown);
  const adventureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!opened) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActiveVideo(entry.isIntersecting ? 'aventura' : 'entrada'),
      { threshold: 0.35 },
    );
    if (adventureRef.current) observer.observe(adventureRef.current);
    return () => observer.disconnect();
  }, [opened]);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const openInvitation = () => {
    setOpened(true);
    requestAnimationFrame(() => adventureRef.current?.scrollIntoView({ behavior: 'smooth' }));
  };

  const confirmUrl = 'https://wa.me/573113587324?text=' + encodeURIComponent('¡Hola! Confirmo mi asistencia al cumpleaños de Santiago Andrés Sánchez Castro en Buggy Salento, el domingo 13 de septiembre de 2026 a la 1:30 p. m., en Salento, Quindío. 🏁');

  return (
    <main className={`site-shell ${opened ? 'is-open' : ''}`}>
      <div className="video-stage" aria-hidden="true">
        <video className={activeVideo === 'entrada' ? 'active' : ''} src="/media/entrada.mp4" autoPlay loop muted={muted} playsInline />
        <video className={activeVideo === 'aventura' ? 'active' : ''} src="/media/aventura.mp4" autoPlay loop muted={muted} playsInline />
        <div className="video-wash" />
        <div className="film-grain" />
      </div>
      <div className="cinema-bar cinema-bar-top" />
      <div className="cinema-bar cinema-bar-bottom" />

      <button className="sound-button" onClick={() => setMuted((value) => !value)} aria-label={muted ? 'Activar sonido' : 'Silenciar video'}>
        {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
      </button>

      <section className="hero" aria-label="Invitación de cumpleaños">
        <div className="scene-tag"><span>Buggy Salento</span><span>Una celebración original</span></div>
        <p className="eyebrow">Una aventura está por comenzar</p>
        <div className="number">13</div>
        <p className="month">Septiembre · 2026</p>
        <div className="title-wrap">
          <span>Cumpleaños de</span>
          <h1>Santiago<br />Andrés</h1>
          <strong>Sánchez Castro</strong>
        </div>
        <p className="intro">Ajusta tu cinturón. Nos vamos a celebrar entre montañas, caminos y mucha adrenalina.</p>
        <button className="reveal-button" onClick={openInvitation}>
          <span>{opened ? 'La aventura te espera' : 'Desplegar invitación'}</span><ChevronDown size={20} />
        </button>
        <span className="scroll-hint">Desliza para entrar a la ruta</span>
      </section>

      <section ref={adventureRef} className="adventure">
        <div className="route-line"><span>01</span><i /><span>Meta</span></div>
        <div className="glass-card">
          <p className="stamp">Estás invitado</p>
          <h2>Vamos a divertirnos<br />a lo grande.</h2>
          <p className="body-copy">Celebremos a Santiago Andrés Sánchez Castro en una experiencia sobre ruedas por los paisajes de Salento.</p>
          <div className="countdown-wrap">
            <p>La aventura comienza en</p>
            <div className="countdown" aria-label="Cuenta regresiva">
              {[
                ['Días', countdown.days], ['Horas', countdown.hours], ['Min', countdown.minutes], ['Seg', countdown.seconds],
              ].map(([label, value]) => <div key={String(label)}><b>{String(value).padStart(2, '0')}</b><small>{label}</small></div>)}
            </div>
          </div>
          <div className="details">
            <div><CalendarDays /><span><small>Cuándo</small>Domingo 13 de septiembre</span></div>
            <div><Clock3 /><span><small>Hora</small>1:30 p. m.</span></div>
            <div><MapPin /><span><small>Dónde</small>Buggy Salento · Salento, Quindío</span></div>
          </div>
          <a className="confirm-button" href={confirmUrl} target="_blank" rel="noreferrer"><MessageCircle size={21} />Confirmar asistencia</a>
          <p className="note">Ven con ropa cómoda y ganas de vivir una gran aventura.</p>
        </div>
        <p className="signature">Nos vemos en la ruta <span>🏁</span></p>
      </section>
    </main>
  );
}
