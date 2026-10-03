// Convertit docs/cv/cv-2026.html en SVG à texte éditable (import Figma).
// Usage, depuis la racine du repo :
//   python3 -m http.server 54550 --bind 127.0.0.1 &
//   node docs/cv/html-to-svg.mjs
// Sortie : docs/cv/cv-2026-figma.svg (une ligne = un calque texte, groupes nommés).
import { createRequire } from 'module';
import { execSync } from 'child_process';
const { chromium } = createRequire(import.meta.url)(execSync('npm root -g').toString().trim() + '/playwright');
import fs from 'fs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 794, height: 1123 } });
await p.goto('http://127.0.0.1:54550/docs/cv/cv-2026.html');
await p.emulateMedia({ media: 'print' });
await p.evaluate(() => document.fonts.ready);
const out = await p.evaluate(async () => {
  const sheet = document.querySelector('.sheet');
  sheet.style.margin = '0'; sheet.style.boxShadow = 'none';
  document.body.style.background = 'none';
  // matérialise les pseudo-éléments textuels en vrais spans
  document.querySelectorAll('.sheet *').forEach((el) => {
    for (const pos of ['before', 'after']) {
      const cs = getComputedStyle(el, '::' + pos);
      const c = cs.content;
      if (!c || c === 'none' || c === 'normal' || !/^".*"$/.test(c)) continue;
      const txt = JSON.parse(c);
      if (!txt) continue;
      const s = document.createElement('i'); s.style.fontStyle = 'normal';
      s.textContent = txt;
      s.style.color = cs.color; s.style.marginLeft = cs.marginLeft; s.style.marginRight = cs.marginRight;
      s.style.fontFamily = cs.fontFamily; s.style.fontSize = cs.fontSize;
      s.dataset.pseudo = '1';
      pos === 'before' ? el.prepend(s) : el.append(s);
    }
  });
  const st = document.createElement('style');
  st.textContent = '.sheet *::before, .sheet *::after { content: none !important; }';
  document.head.appendChild(st);
  await new Promise((r) => requestAnimationFrame(r));
  const origin = sheet.getBoundingClientRect();
  const R = (r) => ({ x: +(r.left - origin.left).toFixed(2), y: +(r.top - origin.top).toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2) });
  const GROUPS = [
    ['.photo', () => 'photo'], ['.id', () => 'identite'], ['.qrbox', () => 'qr-portfolio'],
    ['aside .blk', (el) => 'bloc-' + el.querySelector('h2').textContent.trim()],
    ['.prompt', () => 'prompt'], ['.tagline', () => 'accroche'], ['.intro', () => 'intro'],
    ['.sh', (el) => 'titre-' + el.querySelector('h2').textContent.trim()],
    ['.job', (el) => 'poste-' + el.querySelector('.dates').textContent.trim()],
    ['.case', (el) => 'produit-' + el.querySelector('h3').textContent.trim()],
    ['.foot', () => 'pied'], ['aside', () => 'colonne-identite'], ['main', () => 'colonne-principale']
  ];
  const groupOf = (el) => {
    for (const [sel, name] of GROUPS) { const g = el.closest(sel); if (g) return name(g); }
    return 'page';
  };
  const items = [];
  const cv = document.createElement('canvas').getContext('2d');
  // fonds, bordures
  [sheet, ...sheet.querySelectorAll('*')].forEach((el) => {
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const bg = cs.backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') items.push({ t: 'rect', g: el === sheet ? 'fond' : groupOf(el), ...R(r), fill: bg });
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      const w = parseFloat(cs['border' + side + 'Width']); if (!w || cs['border' + side + 'Style'] === 'none') continue;
      const c = cs['border' + side + 'Color']; const b = R(r);
      const rr = side === 'Top' ? { x: b.x, y: b.y, w: b.w, h: w } : side === 'Bottom' ? { x: b.x, y: b.y + b.h - w, w: b.w, h: w } : side === 'Left' ? { x: b.x, y: b.y, w, h: b.h } : { x: b.x + b.w - w, y: b.y, w, h: b.h };
      items.push({ t: 'rect', g: groupOf(el), ...rr, fill: c, name: 'filet' });
    }
  });
  // image et QR
  const img = sheet.querySelector('.photo');
  { const c = document.createElement('canvas'); const r = img.getBoundingClientRect(); const sc = 3; c.width = r.width * sc; c.height = r.height * sc;
    const x = c.getContext('2d'); x.filter = 'grayscale(1) contrast(1.05)';
    const ir = img.naturalWidth / img.naturalHeight, br = r.width / r.height; let sw, sh, sx, sy;
    if (ir > br) { sh = img.naturalHeight; sw = sh * br; sx = (img.naturalWidth - sw) / 2; sy = 0; } else { sw = img.naturalWidth; sh = sw / br; sx = 0; sy = (img.naturalHeight - sh) * 0.22; }
    x.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
    items.push({ t: 'image', g: 'photo', ...R(r), href: c.toDataURL('image/jpeg', 0.88) }); }
  const qr = sheet.querySelector('svg.qr');
  items.push({ t: 'svg', g: 'qr-portfolio', ...R(qr.getBoundingClientRect()), inner: qr.innerHTML, viewBox: qr.getAttribute('viewBox') });
  // texte : une ligne = un calque
  const walker = document.createTreeWalker(sheet, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (!node.textContent.trim()) continue;
    const el = node.parentElement; const cs = getComputedStyle(el);
    const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    const size = parseFloat(cs.fontSize); const weight = cs.fontWeight;
    cv.font = `${weight} ${size}px "${fam}"`;
    const asc = cv.measureText('Hg').fontBoundingBoxAscent;
    const ls = cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing);
    const upper = cs.textTransform === 'uppercase';
    const txt = node.textContent; const re = /\S+\s*/g; let m; const lines = [];
    while ((m = re.exec(txt))) {
      const rg = document.createRange(); rg.setStart(node, m.index); rg.setEnd(node, m.index + m[0].trimEnd().length);
      const rects = rg.getClientRects(); if (!rects.length) continue; const rc = rects[0];
      const last = lines[lines.length - 1];
      if (last && Math.abs(last.top - rc.top) < 2) { last.text += m[0]; } else lines.push({ top: rc.top, left: rc.left, text: m[0] });
    }
    // espace de tête éventuel (texte qui commence par un espace collé à l'élément précédent)
    const lead = /^\s/.test(txt) && lines.length ? ' ' : '';
    lines.forEach((l, i) => {
      let t = (i === 0 ? lead : '') + l.text.replace(/\s+/g, ' ').replace(/ $/, '');
      if (upper) t = t.toUpperCase();
      items.push({ t: 'text', g: groupOf(el), x: +(l.left - origin.left).toFixed(2), y: +(l.top - origin.top + asc).toFixed(2), text: t, fam, size, weight, fill: cs.color, ls });
    });
  }
  return { w: origin.width, h: origin.height, items };
});
await b.close();
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rgb = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return { f: c }; const [r, g, bl, a] = m[1].split(',').map((v) => parseFloat(v)); const hex = '#' + [r, g, bl].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase(); return a !== undefined && a < 1 ? { f: hex, o: a } : { f: hex }; };
const fill = (c) => { const k = rgb(c); return `fill="${k.f}"` + (k.o !== undefined ? ` fill-opacity="${k.o}"` : ''); };
const order = []; const groups = {};
for (const it of out.items) { if (!groups[it.g]) { groups[it.g] = []; order.push(it.g); } groups[it.g].push(it); }
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
// ordre de peinture : fond, colonnes, puis le reste
const paint = ['fond', 'colonne-identite', 'colonne-principale', ...order.filter((g) => !['fond', 'colonne-identite', 'colonne-principale'].includes(g))].filter((g) => groups[g]);
let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${out.w}" height="${out.h}" viewBox="0 0 ${out.w} ${out.h}">\n`;
for (const g of paint) {
  svg += `  <g id="${slug(g)}">\n`;
  for (const it of groups[g]) {
    if (it.t === 'rect') svg += `    <rect${it.name ? ` id="${it.name}"` : ''} x="${it.x}" y="${it.y}" width="${it.w}" height="${it.h}" ${fill(it.fill)}/>\n`;
    if (it.t === 'image') svg += `    <image x="${it.x}" y="${it.y}" width="${it.w}" height="${it.h}" preserveAspectRatio="none" xlink:href="${it.href}" href="${it.href}"/>\n`;
    if (it.t === 'svg') svg += `    <svg x="${it.x}" y="${it.y}" width="${it.w}" height="${it.h}" viewBox="${it.viewBox}">${it.inner}</svg>\n`;
    if (it.t === 'text') svg += `    <text x="${it.x}" y="${it.y}" font-family="${esc(it.fam)}" font-size="${it.size}" font-weight="${it.weight}"${it.ls ? ` letter-spacing="${it.ls.toFixed(2)}"` : ''} ${fill(it.fill)} xml:space="preserve">${esc(it.text)}</text>\n`;
  }
  svg += '  </g>\n';
}
svg += '</svg>\n';
fs.writeFileSync('docs/cv/cv-2026-figma.svg', svg);
console.log('items', out.items.length, 'groups', paint.length, 'size', out.w, out.h);
