import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';

// Static import of the SSRRender function
import { SSRRender } from './dist/server/entry-server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

export async function createServer(
) {
  const resolve = (p) => path.resolve(__dirname, p);
  app.use(compression());
  app.use(
    serveStatic(resolve('dist/client'), {
      index: false
    })
  );

  app.use('*', async (req, res) => {
    const url = '/';
    const templatePath = resolve('dist/client/index.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    // Use the statically imported SSRRender function
    const appHtml = SSRRender(url); // No need to await since SSRRender is sync
    const html = template.replace('<!--app-html-->', appHtml);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  });
  app.listen(5173, () => {
    console.log('http://localhost:5173');
  })
}
createServer();
