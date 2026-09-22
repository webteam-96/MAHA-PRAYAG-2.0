/* Maha Prayag 2.0 — main.js (vanilla, no deps) */
(() => {
  'use strict';
  const doc = document, root = doc.documentElement;
  root.classList.remove('no-js');
  const $ = (s, c = doc) => c.querySelector(s);
  const $$ = (s, c = doc) => Array.from(c.querySelectorAll(s));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- elements ---------- */
  const head = $('.site-head');
  // skip nav items whose section is hidden
  const navLinks = $$('.nav a').filter(a => { const s = $(a.hash); return s && !s.hidden; });
  const sections = navLinks.map(a => $(a.hash));
  const hero = $('.hero'), reg = $('#register'), foot = $('footer');
  const sticky = $('.sticky-cta');
  const sunpath = $('#sunpath'), sun = $('#sun'), arc = $('.arc'), path = $('#arc-path');
  const items = $$('#agenda li');
  const ts = items.map(li => parseFloat(li.style.getPropertyValue('--t')));

  /* ---------- single shared IntersectionObserver ---------- */
  const pending = new Set($$('.reveal'));
  const vis = { hero: true, reg: false, foot: false };
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const t = e.target;
      if (pending.has(t)) {
        // clip-path-hidden (wipe) targets always report ratio 0, so isIntersecting alone reveals them
        if (e.isIntersecting && (e.intersectionRatio >= .2 || t.classList.contains('wipe') || t.classList.contains('sweep') || e.boundingClientRect.height > innerHeight * .5)) show(t);
      } else if (t === hero) vis.hero = e.intersectionRatio >= .3;
      else if (t === reg) vis.reg = e.isIntersecting;
      else if (t === foot) vis.foot = e.isIntersecting;
    });
    const on = !vis.hero && !vis.reg && !vis.foot;
    sticky.classList.toggle('is-on', on);
    sticky.setAttribute('aria-hidden', String(!on));
    sticky.tabIndex = on ? 0 : -1;
  }, { threshold: [0, .2, .3], rootMargin: '0px 0px -10% 0px' });
  function show(el) { el.classList.add('in'); pending.delete(el); io.unobserve(el); }
  pending.forEach(el => io.observe(el));
  [hero, reg, foot].forEach(el => io.observe(el));

  /* ---------- sun path geometry ---------- */
  let pts = [], W = 0, H = 0, rail = false, thresholds = [];
  function sunLayout() {
    const r = sunpath.getBoundingClientRect(); W = r.width; H = r.height;
    rail = getComputedStyle(arc).display === 'none';
    if (rail) {
      thresholds = items.map(li => (li.getBoundingClientRect().top + 15 - r.top) / H);
    } else {
      const L = path.getTotalLength(); pts = [];
      for (let i = 0; i <= 100; i++) { const p = path.getPointAtLength(L * i / 100); pts.push([p.x / 1200, p.y / 420]); }
      thresholds = ts;
    }
  }
  const schedule = $('#schedule');
  function sunFrame(rect) {
    let p;
    if (rail) { p = (innerHeight - rect.top) / (innerHeight + rect.height); p = Math.min(1, Math.max(0, (p - .15) / .7)); }
    else { const s = schedule.getBoundingClientRect(); const travel = s.height - innerHeight; p = travel > 0 ? Math.min(1, Math.max(0, -s.top / travel)) : 1; }
    if (reduced) p = 1;
    // snap to the nearest marker: the sun hops dot to dot as you scroll
    const n = items.length, step = rail ? Math.min(n - 1, Math.floor(p * n)) : Math.round(p * (n - 1));
    const li = items[step];
    let x = 0, y = 0, fx = 0;
    if (rail) { y = li.getBoundingClientRect().top + 15 - rect.top; fx = thresholds[step]; }
    else { const t = ts[step]; const k = pts.reduce((b, q, i) => Math.abs(q[0] - t) < Math.abs(pts[b][0] - t) ? i : b, 0); x = pts[k][0] * W; y = pts[k][1] * H; fx = t; }
    sun.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
    items.forEach((el, i) => el.classList.toggle('is-past', i <= step));
  }

  /* ---------- one rAF for all scroll work ---------- */
  let ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  function frame() {
    ticking = false;
    // reads
    const y = scrollY, mark = innerHeight * .4;
    let cur = -1;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= mark) cur = i; });
    const passed = [];
    const atEnd = innerHeight + y >= document.documentElement.scrollHeight - 2;
    const line = innerHeight * .88;
    pending.forEach(el => { const r = el.getBoundingClientRect(); if (r.bottom < 0 || (r.top < line && r.bottom > 0 && r.width) || (atEnd && r.top < innerHeight)) passed.push(el); });
    const sr = sunpath.getBoundingClientRect();
    // writes
    head.classList.toggle('is-condensed', y > 80);
    navLinks.forEach((a, i) => a.classList.toggle('is-active', i === cur));
    passed.forEach(show);
    sunFrame(sr);
  }
  addEventListener('scroll', onScroll, { passive: true });
  let rt;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { sunLayout(); frame(); }, 120); });

  /* ---------- mobile menu ---------- */
  const btn = $('.menu-btn'), sheet = $('#menu');
  function setMenu(open, viaLink) {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    sheet.classList.toggle('is-open', open);
    sheet.setAttribute('aria-hidden', String(!open));
    doc.body.classList.toggle('menu-open', open);
    if (open) $('a', sheet).focus(); else if (!viaLink) btn.focus();
  }
  btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
  sheet.addEventListener('click', e => {
    if (e.target.closest('a')) setMenu(false, true);
    else if (e.target === sheet) setMenu(false);
  });
  doc.addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('is-open')) setMenu(false); });

  /* ---------- countdowns ---------- */
  const EVENT = Date.parse('2026-10-24T14:00:00+05:30');
  const REG = Date.parse('2026-10-10T23:59:59+05:30');
  const DRAW = Date.parse('2026-09-30T23:59:59+05:30');
  const DAY = 864e5, IST = 198e5;
  const dayKey = t => Math.floor((t + IST) / DAY);
  const pad = n => String(n).padStart(2, '0');
  const count = $('#event-count'), row = $('.count-row', count);
  const num = { d: $('[data-u=d]', count), h: $('[data-u=h]', count), m: $('[data-u=m]', count), s: $('[data-u=s]', count) };
  function setNum(el, v) {
    if (el.textContent === v) return;
    el.textContent = v;
    if (reduced) return;
    el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick');
  }
  function deadline(el, at, verb) {
    const now = Date.now();
    if (now > at) { el.hidden = true; return; }
    const n = dayKey(at) - dayKey(now);
    $('.txt', el).innerHTML = verb + (n === 0 ? ' <strong>today</strong>' : n === 1 ? ' <strong>tomorrow</strong>' : ' in <strong>' + n + ' days</strong>');
  }
  function tick() {
    const now = Date.now(), diff = EVENT - now;
    if (diff > 0) {
      setNum(num.d, String(Math.floor(diff / DAY)));
      setNum(num.h, pad(Math.floor(diff / 36e5) % 24));
      setNum(num.m, pad(Math.floor(diff / 6e4) % 60));
      setNum(num.s, pad(Math.floor(diff / 1e3) % 60));
      count.hidden = false;
    } else if (dayKey(now) === dayKey(EVENT)) { row.textContent = 'Today'; count.hidden = false; }
    else count.hidden = true;
    deadline($('#dl-reg'), REG, 'Registration closes');
    deadline($('#dl-draw'), DRAW, 'Lucky draw closes');
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- dialogs / direct links ---------- */
  let opener = null;
  $$('[data-open]').forEach(b => {
    const holder = b.closest('[data-register-url],[data-sponsor-url]');
    const url = holder && (holder.dataset.registerUrl || holder.dataset.sponsorUrl);
    if (url) {
      const a = doc.createElement('a');
      a.className = b.className; a.href = url; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = b.textContent; a.dataset.cta = b.dataset.cta;
      b.replaceWith(a);
      return;
    }
    b.addEventListener('click', () => { opener = b; $('#' + b.dataset.open).showModal(); });
  });
  $$('.dlg').forEach(d => {
    d.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) return d.close();
      const r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
    });
    d.addEventListener('close', () => { if (opener) opener.focus(); });
  });

  /* ---------- magnetic buttons (desktop, fine pointer) ---------- */
  if (fine && !reduced) $$('.btn').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
      b.style.setProperty('--mx', (dx * 12).toFixed(1) + 'px');
      b.style.setProperty('--my', (dy * 12).toFixed(1) + 'px');
    });
    b.addEventListener('pointerleave', () => { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
  });

  /* ---------- init ---------- */
  sunLayout(); frame();
  addEventListener('load', () => { sunLayout(); frame(); });
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(() => { sunLayout(); frame(); });
})();
