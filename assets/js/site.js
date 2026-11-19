/* Portfolio interactions — vanilla JS, no dependencies. */
(() => {
  'use strict';
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => Array.from(r.querySelectorAll(q));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('has-js');

  /* Header state + scroll progress (one rAF per frame) */
  const header = $('#site-header'), meter = $('.scroll-meter');
  let queued = false;
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      const y = scrollY || 0;
      header.classList.toggle('is-scrolled', y > 40);
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      meter.style.width = Math.min(100, (y / max) * 100) + '%';
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* Mobile menu (button + aria-expanded + inert + Esc + focus return) */
  const toggle = $('.menu-toggle'), nav = $('#mobile-nav');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    nav.inert = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    document.body.classList.toggle('nav-open', open);
    header.classList.toggle('menu-open', open);
    if (open) $('a', nav).focus({ preventScroll: true });
    else toggle.focus({ preventScroll: true });
  };
  nav.inert = true;
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false);
  });
  addEventListener('resize', () => {
    if (innerWidth > 820 && toggle.getAttribute('aria-expanded') === 'true') setMenu(false);
  });

  /* Reveal on scroll */
  const reveals = $$('[data-reveal]');
  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('in-view'));

  /* Current-section highlight in the desktop nav */
  const links = $$('.desktop-nav a');
  if ('IntersectionObserver' in window) {
    const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(l => l.removeAttribute('aria-current'));
      const a = map.get(en.target.id);           // hero / approach have no link → cleared
      if (a) a.setAttribute('aria-current', 'true');
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section').forEach(s => spy.observe(s));
  }

  /* Work filter */
  const chips = $$('.filter'), cards = $$('.card[data-cat]'), status = $('#filter-status');
  chips.forEach(chip => chip.addEventListener('click', () => {
    const cat = chip.dataset.filter;
    chips.forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
    let shown = 0;
    cards.forEach(card => {
      const ok = cat === 'all' || card.dataset.cat === cat;
      card.hidden = !ok;
      if (ok) shown++;
    });
    if (status) status.textContent = `${chip.textContent.trim()} · ${shown}개 프로젝트`;
  }));

  /* Copy e-mail (works without a configured mail client) */
  const copyBtn = $('[data-copy-email]'), copyMsg = $('.copy-status');
  copyBtn?.addEventListener('click', async () => {
    const email = copyBtn.dataset.copyEmail;
    let ok = false;
    try { await navigator.clipboard.writeText(email); ok = true; } catch (_) {}
    if (!ok) {
      const t = document.createElement('textarea');
      t.value = email; t.style.cssText = 'position:fixed;opacity:0';
      document.body.append(t); t.select();
      try { ok = document.execCommand('copy'); } catch (_) {}
      t.remove();
    }
    if (copyMsg) copyMsg.textContent = ok ? '이메일 주소를 복사했습니다.' : '주소를 직접 복사해 주세요: ' + email;
  });

  /* Optional hero video. Set data-video-src on .portrait (e.g. "assets/video/hero.mp4").
     If the file is missing or fails, the still image simply stays. */
  const portrait = $('.portrait[data-video-src]');
  const src = portrait?.dataset.videoSrc;
  if (src && !reduced) {
    const frame = $('.portrait-frame', portrait);
    const v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
    v.setAttribute('aria-hidden', 'true'); v.tabIndex = -1;
    v.style.cssText = 'position:absolute;inset:0;opacity:0;transition:opacity .8s';
    v.src = src;
    frame.append(v);
    v.addEventListener('playing', () => { v.style.opacity = '1'; }, { once: true });
    v.addEventListener('error', () => v.remove());
    v.play().catch(() => v.remove());
  }
})();
