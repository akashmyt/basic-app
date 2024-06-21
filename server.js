import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

export async function createServer(
  isProd = process.env.NODE_ENV === 'production',

) {
  const resolve = (p) => path.resolve(__dirname, p);

  let vite = null;
    app.use(compression());
    app.use(serveStatic(resolve('dist/client'), { index: false }));

  app.use('*', async (req, res) => {
    const url = '/';
    const templatePath = resolve(isProd ? 'dist/client/index.html' : 'index.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    const renderModule = await import('./dist/server/entry-server.js')

    const appHtml = renderModule.SSRRender(url);
    const html = template.replace('<!--app-html-->', appHtml);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(5173, () => {
    console.log('http://localhost:5173');
  })
);
