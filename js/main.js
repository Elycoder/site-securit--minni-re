/* hamburger toggle */
const btn = document.querySelector('.hamburger');
const menuContainer = document.createElement('div');
menuContainer.className = 'mobile-menu';
menuContainer.style.cssText = 'position:fixed;inset:64px 16px auto 16px;background:rgba(255,255,255,0.98);padding:14px;border-radius:12px;box-shadow:0 20px 50px rgba(0,0,0,0.12);display:none;z-index:70';
menuContainer.innerHTML = `
  <a href="index.html" style="display:block;padding:10px 0;color:#111;font-weight:700">Accueil</a>
  <a href="about.html" style="display:block;padding:10px 0;color:#111;font-weight:700">À propos</a>
  <a href="dangers.html" style="display:block;padding:10px 0;color:#111;font-weight:700">Dangers</a>
  <a href="equipment.html" style="display:block;padding:10px 0;color:#111;font-weight:700">Équipements</a>
  <a href="practices.html" style="display:block;padding:10px 0;color:#111;font-weight:700">Bonnes pratiques</a>
  <a href="docs.html" style="display:block;padding:10px 0;color:#111;font-weight:700">Documents</a>
  <a href="news.html" style="display:block;padding:10px 0;color:#111;font-weight:700">Actualités</a>
  <a href="contact.html" style="display:block;padding:10px 0;color:#111;font-weight:700">Contact</a>
`;
document.body.appendChild(menuContainer);

if(btn){
  btn.addEventListener('click',()=>{
    menuContainer.style.display = menuContainer.style.display === 'none' ? 'block' : 'none';
  });
}

/* Scroll reveal */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
},{threshold:0.12});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

/* counters (data-count attribute) */
document.querySelectorAll('[data-count]').forEach(el=>{
  const target = +el.getAttribute('data-count');
  let v = 0;
  const step = Math.max(1, Math.floor(target / 60));
  const id = setInterval(()=>{
    v += step;
    if(v >= target){v = target; clearInterval(id)}
    el.textContent = v.toLocaleString();
  },20);
});

/* lazy load video - play on visible */
const vid = document.querySelector('video.bg-video');
if(vid){
  const vObs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ if(vid.paused) vid.play(); } else { if(!vid.paused) vid.pause(); }
    });
  },{threshold:0.4});
  vObs.observe(vid);
}

/* simple form validation - if present */
const forms = document.querySelectorAll('form');
forms.forEach(f=>{
  f.addEventListener('submit',e=>{
    const submitBtn = f.querySelector('button[type="submit"]');
    if(submitBtn) submitBtn.disabled = true;
    // basic: allow action to handle it (Formspree or backend)
    setTimeout(()=>{ if(submitBtn) submitBtn.disabled = false; },3000);
  });
});
