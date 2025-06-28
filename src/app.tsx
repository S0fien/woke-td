import { lazy, useEffect, useState } from 'react';
import { useEngine } from './hooks/useEngine.ts';

const Toaster = lazy(() => import('./ui/components/elements/toaster.tsx'));
const GameStatus = lazy(() => import('./ui/features/game-status.tsx'));
const GlobalOverlay = lazy(() => import('./ui/features/global-overlay.tsx'));

export default function App() {
  const { engine } = useEngine();
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    if (engine) {
      engine?.on('initialize', () => setIsInit(true));
    }
  }, [engine]);

  if (isInit) {
    return (
      <>
        <Toaster />
        <GlobalOverlay />
        <GameStatus />
      </>
    );
  }
}
