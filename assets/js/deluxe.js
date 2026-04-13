// =============================================
// DELUXE SCRAP — SHARED JAVASCRIPT
// Red Premium Edition
// =============================================
(function(){
'use strict';

/* Sticky Header */
const header=document.getElementById('main-header');
if(header){
  window.addEventListener('scroll',()=>{
    header.classList.toggle('scrolled',window.scrollY>60);
  },{passive:true});
}

/* Hamburger / Mobile Nav */
const hamburger=document.getElementById('hamburger-btn');
const mobileNav=document.getElementById('mobile-nav');
if(hamburger&&mobileNav){
  const links=mobileNav.querySelectorAll('a, button');
  hamburger.addEventListener('click',()=>{
    const isOpen=mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open',isOpen);
    hamburger.setAttribute('aria-expanded',isOpen);
    document.body.style.overflow=isOpen?'hidden':'';
  });
  links.forEach(l=>{
    l.addEventListener('click',()=>{
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    });
  });
}

/* Scroll Reveal */
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}
  });
},{threshold:0.1});
document.querySelectorAll('.reveal,.reveal-left').forEach(el=>revealObserver.observe(el));

/* Smooth Scroll with offset */
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click',function(e){
    const target=document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      const top=target.getBoundingClientRect().top+window.scrollY-80;
      window.scrollTo({top,behavior:'smooth'});
    }
  });
});

/* FAQ Accordion */
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.closest('.faq-item');
    const wasOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!wasOpen)item.classList.add('open');
  });
});

/* Service card tilt */
document.querySelectorAll('.service-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*8;
    const y=((e.clientY-r.top)/r.height-.5)*-5;
    card.style.transform=`perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-2px)`;
  });
  card.addEventListener('mouseleave',()=>{card.style.transform='';});
});

})();
