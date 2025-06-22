import { useEngine } from '#/hooks/useEngine.ts';
import { toast } from '#/hooks/useToast.ts';
import { cn } from '#/libs/utils.ts';
import React from 'react';
import { Button } from '../components/buttons/button.tsx';
import { SparklesText } from '../components/texts/sparkles.tsx';

const LevelSelector = React.lazy(() => import('#/ui/components/containers/level-selector.tsx'));

const Menu = () => {
  const truc = useEngine();

  console.log('Menu', truc.engine?.canvas.height, truc.engine?.canvas.width);

  return (
    <div className={cn(`flex h-[780px] w-[1360px] flex-col items-center justify-between py-30`)}>
      <SparklesText className="font-[romantic] text-[7rem] font-bold tracking-[30px] text-white text-shadow-[0_7px_7px_rgb(0_0_0_/_0.25)]">
        WOKE TD
      </SparklesText>
      <div className="flex w-50 flex-col gap-8 font-[chewy] text-xl">
        <LevelSelector
          Trigger={
            <Button variant={'brutal'} className="bg-orange-500">
              Start Game
            </Button>
          }
        />
        <Button
          variant={'brutal'}
          onClick={() =>
            toast({
              duration: 1000,
              description: 'This feature is not implemented yet.',
              title: 'Not implemented',
            })
          }
        >
          Load Save
        </Button>
        <Button variant={'brutal-normal'} onClick={() => window.close()}>
          Exit Game
        </Button>
      </div>
    </div>
  );
};

export default Menu;
