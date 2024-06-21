import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';
import { SSRRender } from './dist/server/entry-server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const resolve = (p) => path.resolve(__dirname, p);

const isProd = process.env.NODE_ENV === 'production';

// Middleware for serving static files and compression
app.use(compression());
app.use(serveStatic(resolve('dist/client'), { index: false }));

// Function to handle HTML generation
const generateHtml = (url) => {
  const template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
  const appHtml = SSRRender(url);
  return template.replace('<!--app-html-->', appHtml);
};

// Route to handle all requests
app.use('*', async (req, res) => {
  const url = req.originalUrl;
  const filePath = resolve(`dist/client${url === '/' ? '/index' : url}.html`);

  if (fs.existsSync(filePath)) {
    // Serve pre-rendered file if it exists (SSG)
    res.sendFile(filePath);
  } else {
    // Generate HTML on the fly (ISG)
    const html = generateHtml(url);
    fs.writeFileSync(filePath, html, 'utf-8'); // Save the generated file for future requests
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  }
});

app.listen(5173, () => {
  console.log('Server is listening on http://localhost:5173');
});
