import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import App  from './App'
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('app'));
root.render(<BrowserRouter>
    <App />
  </BrowserRouter>)


