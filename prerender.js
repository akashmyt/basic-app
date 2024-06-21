import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { SSRRender } from './dist/server/entry-server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);
const routesToPrerender = ['/', '/about', '/contact']; // Add your routes here

routesToPrerender.forEach(route => {
  const html = SSRRender(route);
  const template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
  const finalHtml = template.replace('<!--app-html-->', html);
  const filePath = resolve(`dist/client${route === '/' ? '/index' : route}.html`);
  fs.writeFileSync(filePath, finalHtml, 'utf-8');
});

console.log('Static files generated.');