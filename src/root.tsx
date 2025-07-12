import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.tsx';

const container = document.getElementById('game-root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <canvas id="game" className="pointer-events-all m-auto"></canvas>
      <div className={'pointer-events-none, absolute top-0 left-0 flex size-full'} id="ui-container">
        <App />
      </div>
    </React.StrictMode>
  );
}
