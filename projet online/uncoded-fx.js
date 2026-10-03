/* ─────────────────────────────────────────────────────────────
   odilon.uncoded — effets partagés (vanilla, sans dépendance)
   UFX.scramble · UFX.glitch · UFX.asciiImage · UFX.asciiText · UFX.field
   Tout respecte prefers-reduced-motion (UFX.reduced).
   ───────────────────────────────────────────────────────────── */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GLYPHS = '!<>-_\\/[]{}=+*^?#░▒▓│┤┐└┴┬├─┼▌▐';
  const RAMP = ' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

  // Styles partagés (glitch) — injectés une seule fois
  const css = `
    .ufx-glitch { position: relative; animation: ufx-jitter .18s steps(2) infinite; }
    .ufx-glitch::before, .ufx-glitch::after {
      content: attr(data-ufx-text); position: absolute; inset: 0; pointer-events: none;
      white-space: inherit; overflow: hidden;
    }
    .ufx-glitch::before { color: var(--color-phosphor, #6B9080); transform: translate(-2px, 0);
      clip-path: inset(0 0 55% 0); animation: ufx-slice .22s steps(3) infinite; }
    .ufx-glitch::after { color: var(--color-signal, #D9A441); transform: translate(2px, 0);
      clip-path: inset(55% 0 0 0); animation: ufx-slice .19s steps(3) infinite reverse; }
    @keyframes ufx-jitter { 0% { transform: translate(0) } 50% { transform: translate(1px,-1px) } 100% { transform: translate(-1px,1px) } }
    @keyframes ufx-slice {
      0% { clip-path: inset(10% 0 70% 0) } 33% { clip-path: inset(60% 0 12% 0) }
      66% { clip-path: inset(35% 0 40% 0) } 100% { clip-path: inset(80% 0 4% 0) }
    }
    .ufx-shake { animation: ufx-shake .25s steps(4); }
    @keyframes ufx-shake { 0%,100% { transform: none } 25% { transform: translate(-3px,1px) skewX(4deg) }
      50% { transform: translate(3px,-1px) skewX(-6deg) } 75% { transform: translate(-1px,0) } }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const rand = (s) => s[Math.floor(Math.random() * s.length)];

  // Décodage d'un texte : glyphes aléatoires → texte final, gauche → droite
  function scramble(el, opts = {}) {
    const final = opts.text != null ? opts.text : (el.dataset.ufxFinal || el.textContent);
    el.dataset.ufxFinal = final;
    if (reduced) { el.textContent = final; return Promise.resolve(); }
    const duration = opts.duration || 700;
    const start = performance.now();
    return new Promise((resolve) => {
      function frame(now) {
        const t = Math.min((now - start) / duration, 1);
        const revealed = Math.floor(t * final.length);
        let out = final.slice(0, revealed);
        for (let i = revealed; i < final.length; i++) {
          out += final[i] === ' ' ? ' ' : rand(GLYPHS);
        }
        el.textContent = out;
        if (t < 1) requestAnimationFrame(frame);
        else { el.textContent = final; resolve(); }
      }
      requestAnimationFrame(frame);
    });
  }

  // Rafale de glitch RGB sur un élément texte
  function glitch(el, ms = 280) {
    if (reduced || !el) return;
    el.dataset.ufxText = el.textContent;
    el.classList.add('ufx-glitch');
    clearTimeout(el._ufxT);
    el._ufxT = setTimeout(() => el.classList.remove('ufx-glitch'), ms);
  }

  // Secousse brève (erreur, transition)
  function shake(el) {
    if (reduced || !el) return;
    el.classList.remove('ufx-shake');
    void el.offsetWidth;
    el.classList.add('ufx-shake');
  }

  // Rastérise un dessin canvas en caractères ASCII
  function rasterToAscii(ctx, w, h, cols, rows, ramp, invert, gamma) {
    const data = ctx.getImageData(0, 0, w, h).data;
    const cw = w / cols, ch = h / rows;
    const lines = [];
    for (let y = 0; y < rows; y++) {
      let line = '';
      for (let x = 0; x < cols; x++) {
        let sum = 0, n = 0;
        const x0 = Math.floor(x * cw), y0 = Math.floor(y * ch);
        const x1 = Math.floor((x + 1) * cw), y1 = Math.floor((y + 1) * ch);
        for (let yy = y0; yy < y1; yy += 2) {
          for (let xx = x0; xx < x1; xx += 2) {
            const i = (yy * w + xx) * 4;
            sum += (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) * (data[i + 3] / 255);
            n++;
          }
        }
        let v = n ? sum / n / 255 : 0;
        if (invert) v = 1 - v;
        if (gamma) v = Math.pow(v, gamma);
        line += ramp[Math.min(ramp.length - 1, Math.floor(v * ramp.length))];
      }
      lines.push(line.replace(/\s+$/, ''));
    }
    return lines.join('\n');
  }

  // Image → ASCII (renvoie une Promise<string>)
  function asciiImage(src, cols = 56, opts = {}) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const ratio = img.naturalHeight / img.naturalWidth;
        const rows = Math.round(cols * ratio * (opts.cellRatio || 0.5));
        const w = cols * 4, h = Math.round(rows * 8);
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        const ctx = c.getContext('2d', { willReadFrequently: true });
        ctx.filter = `grayscale(1) contrast(${opts.contrast || 1.35}) brightness(${opts.brightness || 1.05})`;
        ctx.drawImage(img, 0, 0, w, h);
        try { resolve(rasterToAscii(ctx, w, h, cols, rows, opts.ramp || RAMP, !!opts.invert, opts.gamma)); }
        catch (e) { reject(e); }
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  // Texte → bannière en blocs (█▓▒░), rendu via canvas avec la police donnée
  function asciiText(text, opts = {}) {
    const rows = opts.rows || 7;
    const font = opts.font || '700 80px "Geist Mono", monospace';
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.font = font;
    const m = ctx.measureText(text);
    const h = 100, w = Math.ceil(m.width) + 8;
    c.width = w; c.height = h;
    ctx.font = font;
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 4, h / 2 + 4);
    const cols = Math.round(w / (h / rows) * 2);
    return rasterToAscii(ctx, w, h, cols, rows, opts.ramp || ' ░▒▓█', false);
  }

  // Champ de caractères en fond, réactif au pointeur
  function field(canvas, opts = {}) {
    const ctx = canvas.getContext('2d');
    const chars = opts.chars || '.:·+×/\\01';
    const color = opts.color || 'rgba(217,164,65,';
    let cols, rows, cell, grid, mx = -999, my = -999, raf, running = true;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = window.innerWidth < 700 ? 22 : 18;
      cols = Math.ceil(canvas.clientWidth / cell);
      rows = Math.ceil(canvas.clientHeight / cell);
      grid = Array.from({ length: cols * rows }, () => ({ c: rand(chars), p: Math.random() * 6.28 }));
      ctx.font = `${cell * 0.62}px "Geist Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
    }
    function draw(t) {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const g = grid[y * cols + x];
          const px = x * cell + cell / 2, py = y * cell + cell / 2;
          const d = Math.hypot(px - mx, py - my);
          const near = Math.max(0, 1 - d / 160);
          const base = 0.035 + 0.03 * Math.sin(t / 1400 + g.p);
          const a = base + near * 0.5;
          if (a < 0.02) continue;
          if (near > 0.2 && Math.random() < 0.08) g.c = rand(chars);
          ctx.fillStyle = color + a.toFixed(3) + ')';
          ctx.fillText(g.c, px, py);
        }
      }
    }
    function loop(t) {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
    }, { passive: true });
    if (reduced) { draw(0); return; }
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(loop); else cancelAnimationFrame(raf);
    });
    raf = requestAnimationFrame(loop);
  }

  // Ajuste la taille de police d'un <pre> pour qu'il tienne dans la largeur de son parent
  // (mesure réelle : les glyphes de bloc peuvent venir d'une police de secours plus large)
  function fitPre(pre, cols, max = 14) {
    const w = pre.parentElement.clientWidth;
    pre.style.fontSize = '10px';
    pre.style.width = 'max-content';
    const natural = pre.offsetWidth || (cols * 6);
    pre.style.width = '';
    pre.style.fontSize = Math.min(max, (w / natural) * 10 * 0.98).toFixed(2) + 'px';
  }

  // Visionneuse d'images dans la page (<dialog> en top layer, au-dessus des scanlines).
  // Délégation : marche aussi pour les liens injectés après coup (terminal).
  function lightbox(selector) {
    const css = document.createElement('style');
    css.textContent = `
      .ufx-lightbox { margin: auto; border: 0; padding: 0; background: transparent; max-width: 100vw; max-height: 100vh; overflow: visible; }
      .ufx-lightbox::backdrop { background: rgba(10,10,10,0.88); }
      .ufx-lightbox[open] { animation: ufx-lb-in 220ms ease-out; }
      @keyframes ufx-lb-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: none; } }
      .ufx-lightbox figure { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 10px; }
      .ufx-lightbox img { display: block; max-width: min(92vw, 520px); max-height: 82vh; width: auto; height: auto; border: 1px solid #3A3A38; cursor: zoom-out; }
      .ufx-lightbox figcaption { font: 11px/1.5 "Geist Mono", ui-monospace, monospace; color: #EDEAE0; text-align: center; max-width: 92vw; }
      .ufx-lightbox figcaption span { color: #8C887E; margin-left: 10px; }
      .ufx-lightbox button { all: unset; cursor: pointer; font: 11px "Geist Mono", ui-monospace, monospace; color: #D9A441; padding: 6px 10px; }
      .ufx-lightbox button:focus-visible { outline: 1px solid #D9A441; }
      .ufx-lightbox .ufx-lb-nav { display: flex; gap: 8px; align-items: center; }
      @media (prefers-reduced-motion: reduce) { .ufx-lightbox[open] { animation: none; } }`;
    document.head.appendChild(css);

    const dlg = document.createElement('dialog');
    dlg.className = 'ufx-lightbox';
    dlg.setAttribute('aria-label', 'Capture d’écran agrandie');
    dlg.innerHTML = '<figure><img alt=""><figcaption></figcaption><div class="ufx-lb-nav">' +
      '<button type="button" data-lb="prev" aria-label="Image précédente">‹ préc.</button>' +
      '<button type="button" data-lb="close">[esc] fermer</button>' +
      '<button type="button" data-lb="next" aria-label="Image suivante">suiv. ›</button></div></figure>';
    document.body.appendChild(dlg);
    const img = dlg.querySelector('img');
    const cap = dlg.querySelector('figcaption');
    let group = [], idx = 0;

    function show(i) {
      idx = (i + group.length) % group.length;
      const a = group[idx];
      const thumb = a.querySelector('img');
      img.src = a.getAttribute('href');
      img.alt = thumb ? thumb.alt : '';
      const fc = a.closest('figure') && a.closest('figure').querySelector('figcaption');
      cap.textContent = fc ? fc.textContent : img.alt;
      if (group.length > 1) {
        const n = document.createElement('span');
        n.textContent = (idx + 1) + '/' + group.length;
        cap.appendChild(n);
      }
      dlg.querySelectorAll('[data-lb="prev"],[data-lb="next"]').forEach((b) => { b.hidden = group.length < 2; });
    }

    document.addEventListener('click', (ev) => {
      const a = ev.target.closest(selector);
      if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
      ev.preventDefault();
      const box = a.parentElement.closest('.case-study-shots, .shots') || a.parentElement;
      group = Array.from(box.querySelectorAll(selector));
      show(group.indexOf(a));
      dlg.showModal();
    });
    dlg.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-lb]');
      if (b && b.dataset.lb === 'prev') return show(idx - 1);
      if (b && b.dataset.lb === 'next') return show(idx + 1);
      dlg.close();
    });
    dlg.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowLeft') show(idx - 1);
      if (ev.key === 'ArrowRight') show(idx + 1);
    });
  }

  window.UFX = { reduced, scramble, glitch, shake, asciiImage, asciiText, field, fitPre, lightbox, GLYPHS };
})();
