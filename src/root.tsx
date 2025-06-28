import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.tsx';
import GAME_CONFIG from './constants/config.ts';
import useLevelStore from './hooks/useLevelStore.ts';
import { cn } from './libs/utils.ts';

const Root = () => {
  const selectedTower = useLevelStore(state => state.selectedTower);

  console.log('here');
  return (
    <React.StrictMode>
      <canvas id="game" className="pointer-events-all m-auto"></canvas>
      <div
        className={cn(selectedTower && 'pointer-events-none', 'absolute top-0 left-0 flex size-full')}
        id="ui-container"
      >
        <App />
      </div>
    </React.StrictMode>
  );
};

const domNode = document.getElementById(GAME_CONFIG.rootContainerId);
if (domNode) {
  const root = createRoot(domNode);
  root.render(<Root />);
}
