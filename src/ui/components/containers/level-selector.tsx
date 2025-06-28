import { LEVELS } from '#/constants/levels.ts';
import { ESSENTIALS } from '#/constants/resources.ts';
import { cn } from '#/libs/utils.ts';
import XScroll from '#/ui/components/elements/x-scroll.tsx';
import { ModalMenu } from '#/ui/features/modal-menu.tsx';
import { lazy, Suspense } from 'react';
import { BiLoader } from 'react-icons/bi';
import { Button } from '../buttons/button.tsx';

const FlipCard = lazy(() => import('./flip-card.tsx'));

export default function LevelSelector() {
  return (
    <Suspense
      fallback={
        <div className="text-4xl">
          <BiLoader size={200} /> <span>Loading...</span>
        </div>
      }
    >
      <ModalMenu
        description={<img src={ESSENTIALS.icons.level.path} className="w-32" />}
        cardClassName="bg-black/40 text-white max-w-[800px]"
        Trigger={<Button>Choose Level</Button>}
        title="Pick your battle!"
        modalSize="lg"
        Footer={Button}
        footerProps={{
          variant: 'brutal',
          className: 'w-full text-lg',
          children: 'Back to menu',
        }}
      >
        <div className="mx-auto w-full rounded-md border border-dashed">
          <XScroll>
            <div className="flex gap-8 overflow-visible p-6">
              {LEVELS.map((level, i) => (
                <div key={i} className="grid size-60 shrink-0 place-items-center rounded-md shadow-md">
                  <FlipCard
                    index={i}
                    scene={level.scene}
                    available={level.available}
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
      </ModalMenu>
    </Suspense>
  );
}
