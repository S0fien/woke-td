import { useEngine } from './hooks/useEngine.ts';
import { GameStatus } from './ui/features/game-status.tsx';
import { GlobalOverlay } from './ui/features/global-overlay.tsx';

export default function App() {
  const { engine } = useEngine();

  return (
    <div id="game-interface" className="flex w-full flex-col items-center">
      {engine?.isRunning() && <GlobalOverlay />}
      <GameStatus />
    </div>
  );
}
