import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.tsx';

const domNode = document.getElementById('container');

if (domNode) {
  const root = createRoot(domNode);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
