export default function App() {
  // const { engine } = useEngine();
  // const state = useLevelStore();

  // const restartGame = () => {
  //   useLevelStore.getState().resetGame();
  //   engine?.start();
  //   engine?.goToScene('mainMenu');
  // };

  // const retryLevel = () => {
  //   useLevelStore.getState().resetGame();
  //   if (engine) {
  //     engine.start();
  //     engine.goToScene(engine.currentSceneName);
  //   }
  // };
  return <></>;
  // if (!engine || engine) return <></>;

  // return (
  //   <div id="game-interface" className="flex flex-col items-center">
  //     {engine?.isRunning() && <GlobalOverlay />}
  //     {state && !engine?.isRunning() && (
  //       <>
  //         {state.gameOver ? (
  //           <div className="game-over-overlay">
  //             <h2>Game Over</h2>
  //             <button onClick={retryLevel} className="retry-button">
  //               Try Again
  //             </button>
  //           </div>
  //         ) : state.victory ? (
  //           <div className="victory-overlay">
  //             <h2>Victory!</h2>
  //             <p>You&apos;ve completed all {GAME_CONFIG.maxWaves} waves!</p>
  //             <button onClick={restartGame}>Play Again</button>
  //           </div>
  //         ) : null}
  //       </>
  //     )}
  //   </div>
  // );
}
