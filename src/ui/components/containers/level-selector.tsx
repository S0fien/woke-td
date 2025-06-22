import { LEVELS } from '#/constants/levels.ts';
import { cn } from '#/libs/utils.ts';
import XScroll from '#/ui/components/elements/x-scroll.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense, useState } from 'react';
import { BiLoader } from 'react-icons/bi';
import { Button } from '../buttons/button.tsx';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card.tsx';
import FlipCard from './flip-card.tsx';

export default function LevelSelector({
  modalSize = 'lg',
  Trigger,
}: {
  modalSize?: 'sm' | 'lg';
  Trigger: React.JSX.Element;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const lol = React.cloneElement(Trigger, {
    onClick: () => setIsOpen(true),
  });

  return (
    <Suspense
      fallback={
        <div className="text-4xl">
          <BiLoader size={200} /> <span>Loading...</span>
        </div>
      }
    >
      {lol}
      <AnimatePresence>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-slate-900/20 p-8 backdrop-blur"
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
              className="relative w-full max-w-2xl cursor-default"
            >
              <Card
                className={cn('flex flex-col gap-8 rounded-xl bg-black/40 px-16 py-6 text-white shadow-2xl', {
                  'max-w-sm': modalSize === 'sm',
                })}
              >
                <CardHeader>
                  <CardTitle
                    className={cn('text-center text-3xl font-bold', {
                      'text-2xl': modalSize === 'sm',
                    })}
                  >
                    Pick your battle!
                  </CardTitle>
                </CardHeader>
                <CardContent className="overflow-scroll">
                  <div className="mx-auto w-[50vw] rounded-md border border-dashed">
                    <XScroll>
                      <div className="flex gap-8 p-6">
                        {LEVELS.map((level, i) => (
                          <div key={i} className="grid size-60 shrink-0 place-items-center rounded-md shadow-md">
                            <FlipCard
                              scene={level.scene}
                              available={level.available}
                              key={level.name}
                              className={cn(!level.available && 'blur-[10px]')}
                              title={level.name}
                              description={level.description}
                              image={level.image}
                            />
                          </div>
                        ))}
                      </div>
                    </XScroll>
                  </div>
                </CardContent>
                <CardFooter>
                  {' '}
                  <Button variant={'brutal'} onClick={() => setIsOpen(false)} className="w-full text-lg">
                    Back to menu
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>{' '}
    </Suspense>
  );
}
