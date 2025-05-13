import { GlobalOverlay } from './features/global-overlay';
import GAME_CONFIG from './constants/config';
import { useEngine } from './hooks/useEngine';
import useGameStore from './hooks/useGameStore';

export default function App() {
  const { engine } = useEngine();
  const state = useGameStore();

  return (
    <div id="game-interface" className="flex flex-col items-center">
      {engine?.isRunning && <GlobalOverlay />}
      {/* <div id="game-interface" className="absolute top-0 left-0 translate-1/2 flex flex-col items-center"> */}
      {/* <Bar /> */}
      {state && engine && (
        <>
          {state.gameOver && (
            <div className="game-over-overlay">
              <h2>Game Over</h2>
              <button
                onClick={async () => {
                  useGameStore.getState().resetGame();
                  engine.run();
                }}
              >
                Try Again
              </button>
            </div>
          )}
          {state.victory && (
            <div className="victory-overlay">
              <h2>Victory!</h2>
              <p>You&apos;ve completed all {GAME_CONFIG.maxWaves} waves!</p>
              <button
                onClick={async () => {
                  useGameStore.getState().resetGame();
                  engine.run();
                  engine.goToScene('mainMenu');
                }}
              >
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
