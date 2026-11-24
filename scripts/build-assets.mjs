// Generates favicons and the Open Graph image from public/logo.svg.
// Run with: npm run assets   (outputs are committed, so this only runs when the logo changes)
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const pub = new URL('../public/', import.meta.url);
const logo = await readFile(new URL('logo.svg', pub), 'utf8');
const inner = logo.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<title>.*?<\/title>/, '');

const glyph = (color) =>
  `<g fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;

// Square icon: logo on a dark rounded tile.
const icon = (size, radius) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="${radius}" fill="#0b0b0b"/>
  <g transform="translate(6 39) scale(0.906)">${glyph('#f5f5f2')}</g>
</svg>`;

await sharp(Buffer.from(icon(32, 28))).resize(32, 32).png().toFile(new URL('favicon-32.png', pub).pathname);
await sharp(Buffer.from(icon(180, 0))).resize(180, 180).png().toFile(new URL('apple-touch-icon.png', pub).pathname);

// favicon.svg adapts to the browser theme.
const favSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <style>g{stroke:#121212}@media (prefers-color-scheme:dark){g{stroke:#f5f5f2}}</style>
  <g transform="translate(0 30)" fill="none" stroke-linecap="round" stroke-linejoin="round">${inner}</g>
</svg>`;
await (await import('node:fs/promises')).writeFile(new URL('favicon.svg', pub), favSvg);

// Open Graph image 1200x630.
const swatches = ['#c9433a', '#3f8f45', '#e7c23d', '#df7a2a', '#2f6fd0', '#8650c4'];
const names = ['RED', 'GREEN', 'YELLOW', 'ORANGE', 'BLUE', 'PURPLE'];
const tiles = swatches
  .map((c, i) => {
    const x = 80 + i * 180;
    return `<rect x="${x}" y="430" width="160" height="120" rx="12" fill="${c}" filter="url(#gray)"/>
      <rect x="${x + 12}" y="510" width="${names[i].length * 13 + 16}" height="28" rx="3" fill="#000" fill-opacity=".75" stroke="#9be38a"/>
      <text x="${x + 20}" y="530" font-family="Menlo, monospace" font-size="17" font-weight="700" fill="#9be38a">${names[i]}</text>`;
  })
  .join('');

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <filter id="gray"><feColorMatrix type="saturate" values="0"/></filter>
  </defs>
  <rect width="1200" height="630" fill="#0b0b0b"/>
  <g transform="translate(80 64) scale(0.75)">${glyph('#f5f5f2')}</g>
  <text x="190" y="96" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" fill="#f5f5f2">Achroma<tspan font-weight="700">Assist</tspan></text>
  <text x="80" y="228" font-family="Helvetica Neue, Arial, sans-serif" font-size="64" font-weight="700" fill="#f5f5f2" letter-spacing="-2">Building AR aids for achromatopsia</text>
  <text x="80" y="304" font-family="Helvetica Neue, Arial, sans-serif" font-size="64" font-weight="700" fill="#f5f5f2" letter-spacing="-2">and color blindness</text>
  <text x="80" y="370" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" fill="#f5f5f2">Open research project · achromaassist.app</text>
  ${tiles}
</svg>`;
await sharp(Buffer.from(og)).png({ palette: true }).toFile(new URL('og.png', pub).pathname);

console.log('assets written to public/');
