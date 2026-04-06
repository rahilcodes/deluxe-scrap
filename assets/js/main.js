/**
 * main.js — Application Entry Point
 * Scrapwala Hyderabad
 * Initializes all modules after DOM is ready
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Nav !== 'undefined') Nav.init();
  if (typeof Calculator !== 'undefined') Calculator.init();
  if (typeof FAQ !== 'undefined') FAQ.init();
  if (typeof Form !== 'undefined') Form.init();
  if (typeof Animations !== 'undefined') Animations.init();

  // ---- Smart Price Timestamp ----
  const priceTimestamp = document.getElementById('price-timestamp');
  if (priceTimestamp) {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    priceTimestamp.textContent = `Prices updated: Today, ${hours}:${minutes} ${ampm}`;
  }

  // ---- Interactive WA Widget ----
  const waFab = document.getElementById('wa-fab');
  const waPopup = document.getElementById('wa-popup');
  const waClose = document.getElementById('wa-close');
  const waBadge = document.getElementById('wa-badge');
  const waTime = document.getElementById('wa-time');

  if (waFab && waPopup) {
    if (waTime) {
      const now = new Date();
      waTime.textContent = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    }
    
    waFab.addEventListener('click', () => {
      waPopup.classList.add('show');
      if (waBadge) waBadge.style.opacity = '0';
    });
    
    if (waClose) {
      waClose.addEventListener('click', () => {
        waPopup.classList.remove('show');
      });
    }
  }

  // ---- WhatsApp area-page pre-fill ----
  // If page has data-area attribute, pre-fill area in booking form
  const bodyArea = document.body.dataset.area;
  if (bodyArea) {
    const areaInput = document.getElementById('form-area');
    if (areaInput) areaInput.value = bodyArea;
  }

  // ---- Area pill links (make them navigate) ----
  document.querySelectorAll('.area-pill[data-href]').forEach(pill => {
    pill.addEventListener('click', () => {
      window.location.href = pill.dataset.href;
    });
    pill.style.cursor = 'pointer';
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('main-nav')?.offsetHeight || 66;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Copy phone on click ----
  document.querySelectorAll('[data-copy-phone]').forEach(el => {
    el.addEventListener('click', () => {
      navigator.clipboard.writeText('+919392901664').then(() => {
        const original = el.textContent;
        el.textContent = 'Copied!';
        setTimeout(() => { el.textContent = original; }, 1500);
      }).catch(() => {});
    });
  });
  // ---- Background Audio Logic ----
  const AudioHelper = (() => {
    const audio = document.getElementById('bg-audio');
    const toggleBtn = document.getElementById('audio-toggle');
    if (!audio || !toggleBtn) return;

    const iconMute = toggleBtn.querySelector('.icon-mute');
    const iconUnmute = toggleBtn.querySelector('.icon-unmute');
    
    // Check user preference
    const isMuted = localStorage.getItem('scrapwala_audio_muted') === 'true';
    if (isMuted) {
      audio.muted = true;
      iconMute.style.display = 'none';
      iconUnmute.style.display = 'block';
    } else {
      audio.volume = 0.4; // gentle volume
    }

    // Play on first interaction if not muted
    const tryPlay = () => {
      if (!audio.muted) {
        audio.play().catch(() => {});
      }
      ['click', 'scroll', 'touchstart'].forEach(evt => document.removeEventListener(evt, tryPlay));
    };
    ['click', 'scroll', 'touchstart'].forEach(evt => document.addEventListener(evt, tryPlay, { once: true, passive: true }));

    // Toggle button logic
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (audio.muted || audio.paused) {
        audio.muted = false;
        audio.play().catch(() => {});
        iconUnmute.style.display = 'none';
        iconMute.style.display = 'block';
        localStorage.setItem('scrapwala_audio_muted', 'false');
      } else {
        audio.muted = true;
        audio.pause();
        iconMute.style.display = 'none';
        iconUnmute.style.display = 'block';
        localStorage.setItem('scrapwala_audio_muted', 'true');
      }
    });
  })();
});
