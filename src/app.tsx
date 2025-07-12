import Toaster from './ui/components/elements/toaster.tsx';
import GameStatus from './ui/features/game-status.tsx';
import GlobalOverlay from './ui/features/global-overlay.tsx';

export default function App() {
  return (
    <div id="ui-container" className="pointer-events-none absolute top-0 left-0 flex size-full">
      <Toaster />
      <GlobalOverlay key="global-overlay" />
      <GameStatus key="game-status" />
    </div>
  );
}
