// Zero-dependency PNG encoder + on-brand hero/OG cover renderer.
//
// Used as the offline fallback for the AI hero-image step: it always produces a
// valid 1200x630 PNG that matches the Iro AI dark/cyan/gold design system, with
// the post title rendered on top. When a real image API is configured
// (see generate-hero-image.mjs) that path is preferred; this guarantees the
// pipeline never blocks on network/API access.

import zlib from 'node:zlib';
import fs from 'node:fs';

// ---- CRC32 (for PNG chunks) ----
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

// ---- RGB canvas ----
export class Canvas {
  constructor(width, height) {
    this.w = width;
    this.h = height;
    this.px = Buffer.alloc(width * height * 3);
  }
  set(x, y, r, g, b) {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const i = (y * this.w + x) * 3;
    this.px[i] = r;
    this.px[i + 1] = g;
    this.px[i + 2] = b;
  }
  fillRect(x0, y0, w, h, r, g, b) {
    for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) this.set(x, y, r, g, b);
  }
  toPNG() {
    const stride = this.w * 3;
    const raw = Buffer.alloc((stride + 1) * this.h);
    for (let y = 0; y < this.h; y++) {
      raw[y * (stride + 1)] = 0; // filter: none
      this.px.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
    }
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(this.w, 0);
    ihdr.writeUInt32BE(this.h, 4);
    ihdr[8] = 8; // bit depth
    ihdr[9] = 2; // color type: truecolor RGB
    const idat = zlib.deflateSync(raw, { level: 9 });
    return Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      chunk('IHDR', ihdr),
      chunk('IDAT', idat),
      chunk('IEND', Buffer.alloc(0)),
    ]);
  }
}

// ---- Minimal 5x7 uppercase bitmap font (enough to render titles) ----
const FONT = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '11110', '10001', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '11110', '10000', '10000', '10000', '11111'],
  F: ['11111', '10000', '11110', '10000', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10111', '10001', '10001', '01111'],
  H: ['10001', '10001', '11111', '10001', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  J: ['00111', '00010', '00010', '00010', '10010', '10010', '01100'],
  K: ['10001', '10010', '11100', '10010', '10001', '10001', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00110', '01000', '10000', '11111'],
  '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  '6': ['01110', '10000', '10000', '11110', '10001', '10001', '01110'],
  '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  '9': ['01110', '10001', '10001', '01111', '00001', '00001', '01110'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
  '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
  ',': ['00000', '00000', '00000', '00000', '01100', '01100', '11000'],
  ':': ['00000', '01100', '01100', '00000', '01100', '01100', '00000'],
  "'": ['01100', '01100', '11000', '00000', '00000', '00000', '00000'],
  '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
  '!': ['00100', '00100', '00100', '00100', '00100', '00000', '00100'],
  '?': ['01110', '10001', '00010', '00100', '00100', '00000', '00100'],
  '&': ['01100', '10010', '10100', '01000', '10101', '10010', '01101'],
  '/': ['00001', '00010', '00010', '00100', '01000', '01000', '10000'],
};

function glyph(ch) {
  return FONT[ch] || FONT[ch.toUpperCase()] || FONT['?'];
}

// Draw a single character at (x,y) scaled by `scale`.
function drawChar(c, ch, x, y, scale, [r, g, b]) {
  const rows = glyph(ch);
  for (let ry = 0; ry < 7; ry++) {
    for (let rx = 0; rx < 5; rx++) {
      if (rows[ry][rx] === '1') {
        c.fillRect(x + rx * scale, y + ry * scale, scale, scale, r, g, b);
      }
    }
  }
}

// Word-wrap UPPERCASE text to a max pixel width and draw it.
function drawText(c, text, x, y, scale, color, maxWidth, lineGap) {
  const charW = 6 * scale; // 5px glyph + 1px space
  const words = text.toUpperCase().split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (test.length * charW > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  const lineH = 7 * scale + lineGap;
  lines.forEach((ln, i) => {
    let cx = x;
    const cy = y + i * lineH;
    for (const ch of ln) {
      drawChar(c, ch, cx, cy, scale, color);
      cx += charW;
    }
  });
  return y + lines.length * lineH;
}

// Smooth radial glow blended additively onto the canvas.
function addGlow(c, cx, cy, radius, [r, g, b], intensity) {
  const r2 = radius * radius;
  for (let y = Math.max(0, cy - radius); y < Math.min(c.h, cy + radius); y++) {
    for (let x = Math.max(0, cx - radius); x < Math.min(c.w, cx + radius); x++) {
      const d2 = (x - cx) ** 2 + (y - cy) ** 2;
      if (d2 > r2) continue;
      const f = (1 - Math.sqrt(d2) / radius) * intensity;
      const i = (y * c.w + x) * 3;
      c.px[i] = Math.min(255, c.px[i] + r * f);
      c.px[i + 1] = Math.min(255, c.px[i + 1] + g * f);
      c.px[i + 2] = Math.min(255, c.px[i + 2] + b * f);
    }
  }
}

// Render the branded hero/OG cover. Returns the PNG buffer (and writes if outPath).
export function renderHeroCover({ title, eyebrow = 'IRO AI', width = 1200, height = 630, outPath }) {
  const c = new Canvas(width, height);
  // Deep navy base (#0A0E1A)
  c.fillRect(0, 0, width, height, 0x0a, 0x0e, 0x1a);
  // Ambient glows: cyan top-left, gold top-right (matches site gradients)
  addGlow(c, Math.round(width * 0.18), Math.round(height * 0.05), Math.round(width * 0.5), [0, 0xe5, 0xff], 0.22);
  addGlow(c, Math.round(width * 0.85), Math.round(height * 0.12), Math.round(width * 0.42), [0xff, 0xd7, 0x00], 0.1);
  // Subtle bottom vignette for text legibility
  for (let y = Math.round(height * 0.45); y < height; y++) {
    const f = (y - height * 0.45) / (height * 0.55);
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3;
      c.px[i] = Math.round(c.px[i] * (1 - f * 0.5));
      c.px[i + 1] = Math.round(c.px[i + 1] * (1 - f * 0.5));
      c.px[i + 2] = Math.round(c.px[i + 2] * (1 - f * 0.45));
    }
  }
  const margin = 72;
  // Brand chip + eyebrow
  c.fillRect(margin, margin, 40, 40, 0x00, 0xe5, 0xff);
  c.fillRect(margin + 12, margin + 12, 16, 16, 0x0a, 0x0e, 0x1a);
  drawText(c, eyebrow, margin + 60, margin + 8, 4, [0x9a, 0xe6, 0xff], width - margin * 2 - 60, 4);
  // Cyan accent bar above the title
  c.fillRect(margin, Math.round(height * 0.42), 90, 8, 0x00, 0xe5, 0xff);
  // Title
  drawText(c, title, margin, Math.round(height * 0.48), 7, [0xff, 0xff, 0xff], width - margin * 2, 12);
  const png = c.toPNG();
  if (outPath) fs.writeFileSync(outPath, png);
  return png;
}
