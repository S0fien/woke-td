import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.tsx';
import GAME_CONFIG from './constants/config.ts';

const domNode = document.getElementById(GAME_CONFIG.containerId);

if (domNode) {
  const root = createRoot(domNode);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
