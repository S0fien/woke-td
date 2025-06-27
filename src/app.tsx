import { useEffect, useState } from 'react';
import { useEngine } from './hooks/useEngine.ts';
import { Toaster } from './ui/components/elements/toaster.tsx';
import { GameStatus } from './ui/features/game-status.tsx';
import { GlobalOverlay } from './ui/features/global-overlay.tsx';

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
