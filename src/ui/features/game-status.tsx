import { SCENE_RESOURCES } from '#/constants/resources.ts';
import { useEngine } from '#/hooks/useEngine.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import { cn } from '#/libs/utils.ts';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../components/buttons/button.tsx';
import { HyperText } from '../components/texts/hyper-text.tsx';

const GameStatus = () => {
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
      <div
        className={cn(
          'fixed inset-0 z-50 flex size-full cursor-pointer items-center justify-center bg-slate-900/20 p-8 backdrop-blur',
          !state.gameOver && !state.victory && 'hidden'
        )}
      >
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
          {state.gameOver ? (
            <>
              <img src={SCENE_RESOURCES.icons.lose.path} className="w-52" />
              <HyperText>Game Over...</HyperText>
              <div className="flex w-50 flex-col gap-3">
                <Button variant="brutal" className="bg-amber-500" onClick={retryLevel}>
                  Try Again
                </Button>
                <Button variant="brutal" onClick={restartGame}>
                  Go to menu
                </Button>
              </div>
            </>
          ) : state.victory ? (
            <>
              <img src={SCENE_RESOURCES.icons.winning.path} className="w-52" />
              <HyperText
                className="text-center"
                children={`You've completed all ${useLevelStore.getState().wave} waves!`}
              />
              <div className="flex w-50 flex-col gap-3">
                <Button variant="brutal" className="bg-emerald-600" onClick={restartGame}>
                  Play Again
                </Button>
                <Button variant="brutal" onClick={restartGame}>
                  Go to menu
                </Button>
              </div>{' '}
            </>
          ) : null}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GameStatus;
