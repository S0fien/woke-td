import { useEngine } from './hooks/useEngine.ts';
import useGameOptionsStore from './hooks/useGameOptionsStore.ts';
import { Toaster } from './ui/components/elements/toaster.tsx';
import { GameStatus } from './ui/features/game-status.tsx';
import { GlobalOverlay } from './ui/features/global-overlay.tsx';

export default function App() {
  const engine = useEngine();
  console.log('engine', engine);
  const { isInitialized } = useGameOptionsStore();

  console.log('is init', isInitialized);
  if (isInitialized) {
    return (
      <div id="game-interface" className="flex h-[780px] w-[1360px] flex-col items-center">
        <Toaster />
        <GlobalOverlay />
        <GameStatus />
      </div>
    );
  }
}
