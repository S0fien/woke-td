import RESOURCES from '#/constants/resources.ts';
import { useEngine } from '#/hooks/useEngine.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../components/buttons/button.tsx';
import { HyperText } from '../components/texts/hyper-text.tsx';

export const GameStatus = () => {
  const { engine } = useEngine();
  const state = useLevelStore();

  const restartGame = () => {
    useLevelStore.getState().resetGame();
    engine?.start();
    engine?.goToScene('mainMenu');
  };

  const retryLevel = () => {
    useLevelStore.getState().resetGame();
    if (engine) {
      engine.start();
      engine.goToScene(engine.currentSceneName);
    }
  };

  return (
    <AnimatePresence>
      {state.gameOver && (
        <div className="fixed inset-0 z-50 flex size-full cursor-pointer items-center justify-center bg-slate-900/20 p-8 backdrop-blur">
          <motion.div
            initial={{ scale: 0, rotate: '180deg' }}
            animate={{
              scale: 1,
              rotate: '0deg',
              transition: {
                type: 'spring',
                bounce: 0.25,
              },
            }}
            exit={{ scale: 0, rotate: '180deg' }}
            onClick={e => e.stopPropagation()}
            className="relative flex w-full max-w-2xl cursor-default flex-col items-center gap-4"
          >
            <img src={RESOURCES.icons.lose.path} className="w-52" />
            <HyperText>Game Over...</HyperText>
            <div className="flex w-50 flex-col gap-3">
              <Button variant="brutal" className="bg-amber-500" onClick={retryLevel}>
                Try Again
              </Button>
              <Button variant="brutal" onClick={restartGame}>
                Go to menu
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    // <div
    //   className={`absolute flex h-[${GAME_CONFIG.height}px] w-[${GAME_CONFIG.width}px] flex-col items-center justify-center gap-6 bg-black/60`}
    // >
    //   <img src={RESOURCES.icons.lose.path} className="w-52" />
    //   <HyperText>Game Over...</HyperText>
    //   <div className="flex w-50 flex-col gap-3">
    //     <Button variant="brutal" className="bg-amber-500" onClick={retryLevel}>
    //       Try Again
    //     </Button>
    //     <Button variant="brutal" onClick={restartGame}>
    //       Go to menu
    //     </Button>
    //   </div>
    // </div>
  );
};
