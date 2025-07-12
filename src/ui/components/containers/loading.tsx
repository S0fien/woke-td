import { MAIN_RESOURCES } from '#/constants/resources.ts';
import { saveGameToFile } from '#/libs/save.ts';
import { z } from 'zod';
import { Button } from '../buttons/button.tsx';
import ProgressBar from '../elements/progress-bar.tsx';
import { HyperText } from '../texts/hyper-text.tsx';

const usernameSchema = z.string().min(3).max(16).nonempty().trim();

export const Loading = ({ progress }: { progress: number }) => {
  const handleDefendClick = async () => {
    const name = prompt('Enter your username:');
    saveGameToFile({
      username: name ?? 'Player',
    });
    const result = usernameSchema.nonempty().safeParse(name);
    console.log('result', result);
    // if (!result.success) {
    //   saveGameToFile({
    //     username: result.data,
    //   });
    // } else {
    //   console.error('Invalid username. Please try again.');
    // }
  };
  return (
    <>
      <div className="pointer-events-auto flex size-full flex-col items-center justify-center gap-10 text-white">
        <HyperText className="py-20 text-[8rem] font-bold drop-shadow">Woke TD</HyperText>
        <span>Pick your battle</span>

        {progress === 1 ? (
          <div className="relative flex justify-center">
            <img src={MAIN_RESOURCES.icons.level.path} className="w-90" />
            <Button
              id="startGame"
              className="absolute bottom-0 left-1/4 h-[64px] w-[172px] px-6 py-4"
              variant={'brutal'}
              onClick={handleDefendClick}
            >
              Defend
            </Button>
          </div>
        ) : (
          <ProgressBar currentValue={progress} />
        )}
      </div>
    </>
  );
};
