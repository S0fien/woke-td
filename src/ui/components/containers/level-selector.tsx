import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LEVELS } from '#/constants/levels.ts';
import { cn } from '#/libs/utils.ts';
import { Shine } from '../buttons/shine.tsx';
import FlipCard from './flip-card.tsx';

export default function LevelSelector({ modalSize = 'lg' }: { modalSize?: 'sm' | 'lg' }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log('LevelSelector', isOpen, LEVELS);
  return (
    <>
      {/* <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-indigo-800 p-2 font-medium text-white transition-opacity hover:opacity-90"
      >
        Open Modal
      </button> */}
      <Shine
        onClick={() => setIsOpen(true)}

        //   onClick={async () => {
        //     console.log('Start Game');
        //     await engine.goToScene('gameScene');
        //   }}
      >
        Start Game
      </Shine>
      <AnimatePresence>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center overflow-y-scroll bg-slate-900/20 p-8 backdrop-blur"
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
              className={cn(
                'relative w-full max-w-lg cursor-default overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 p-6 text-white shadow-2xl',
                {
                  'max-w-sm': modalSize === 'sm',
                }
              )}
            >
              <div className="flex flex-col gap-5">
                <h3
                  className={cn('text-center text-3xl font-bold', {
                    'text-2xl': modalSize === 'sm',
                  })}
                >
                  Pick your battle!
                </h3>

                {LEVELS.map(level => (
                  <FlipCard
                    scene={level.scene}
                    available={level.available}
                    key={level.name}
                    className={cn(!level.available && 'blur-[5px]')}
                    title={level.name}
                    description={level.description}
                    image={level.image}
                  />
                  //             <div key={level.name} className={cn(!level.available && 'blur-[3px]')}>
                  //                         <p className="mb-1 text-center">
                  //           {level.name}
                  //         </p>
                  // <p className="mb-1 text-center">
                  //           {level.description}
                  //         </p>
                  //             </div>
                ))}
                <div className="flex justify-center">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded bg-white py-2 font-semibold text-indigo-600 transition-opacity hover:opacity-80"
                  >
                    Back to menu
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
