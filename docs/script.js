const site=document.querySelector('#site'),detail=document.querySelector('#detalle'),open=document.querySelector('#open');
const entrada=document.querySelector('#entrada'),aventura=document.querySelector('#aventura'),sound=document.querySelector('#sound');
open.addEventListener('click',()=>{site.classList.add('is-open');open.firstChild.textContent='La aventura te espera ';detail.scrollIntoView({behavior:'smooth'});});
new IntersectionObserver(([e])=>{entrada.classList.toggle('active',!e.isIntersecting);aventura.classList.toggle('active',e.isIntersecting);},{threshold:.35}).observe(detail);
sound.addEventListener('click',()=>{const muted=!entrada.muted;entrada.muted=aventura.muted=muted;sound.textContent=muted?'♫':'🔊';sound.setAttribute('aria-label',muted?'Activar sonido':'Silenciar video');});
const tick=()=>{const d=Math.max(0,new Date('2026-09-13T13:30:00-05:00')-Date.now()),v=[Math.floor(d/86400000),Math.floor(d/3600000)%24,Math.floor(d/60000)%60,Math.floor(d/1000)%60];['days','hours','minutes','seconds'].forEach((id,i)=>document.querySelector('#'+id).textContent=String(v[i]).padStart(2,'0'));};tick();setInterval(tick,1000);
