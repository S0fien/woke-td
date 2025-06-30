import ProgressBar from '../elements/progress-bar.tsx';

export const Loading = ({ progress }: { progress: number }) => {
  return (
    <div className="pointer-events-auto flex size-full flex-col items-center justify-center gap-10 text-white">
      <HyperText className="py-20 text-[8rem] font-bold drop-shadow">Woke TD</HyperText>
      <span>Pick your battle</span>

      {progress === 1 ? (
        <div className="relative flex justify-center">
          <img src={MAIN_RESOURCES.icons.level.path} className="w-90" />
          <Button id="startGame" className="absolute bottom-0 left-1/4 h-[64px] w-[172px] px-6 py-4" variant={'ghost'}>
            Defend
          </Button>
        </div>
      ) : (
        <ProgressBar currentValue={progress} />
      )}
    </div>
  );
};

import { MAIN_RESOURCES } from '#/constants/resources.ts';
import { Button } from '../buttons/button.tsx';
import { HyperText } from '../texts/hyper-text.tsx';
