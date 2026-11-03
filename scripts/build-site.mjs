// Assembles the deployable site (only public files) into _site/ for GitHub Pages.
import { cpSync, rmSync } from 'node:fs';

const OUT = '_site';
const PUBLIC = ['index.html', 'impresszum.html', 'css', 'js', 'images', 'fonts'];

rmSync(OUT, { recursive: true, force: true });
for (const path of PUBLIC) {
  cpSync(path, `${OUT}/${path}`, { recursive: true });
}
console.log(`Site assembled in ${OUT}/`);
