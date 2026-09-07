const site=document.querySelector('#site'),detail=document.querySelector('#detalle'),open=document.querySelector('#open');
const entrada=document.querySelector('#entrada'),aventura=document.querySelector('#aventura'),sound=document.querySelector('#sound');
open.addEventListener('click',()=>{site.classList.add('is-open');open.firstChild.textContent='La aventura te espera ';detail.scrollIntoView({behavior:'smooth'});});
new IntersectionObserver(([e])=>{entrada.classList.toggle('active',!e.isIntersecting);aventura.classList.toggle('active',e.isIntersecting);},{threshold:.35}).observe(detail);
sound.addEventListener('click',()=>{const muted=!entrada.muted;entrada.muted=aventura.muted=muted;sound.textContent=muted?'♫':'🔊';sound.setAttribute('aria-label',muted?'Activar sonido':'Silenciar video');});
