import { MAIN_RESOURCES } from '#/constants/resources.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import { ModalMenu } from '#/ui/features/modal-menu.tsx';
import { useRef, useState } from 'react';
import { z } from 'zod';
import { Button } from '../buttons/button.tsx';
import { Input } from '../elements/input.tsx';
import { Label } from '../elements/label.tsx';
import ProgressBar from '../elements/progress-bar.tsx';
import { HyperText } from '../texts/hyper-text.tsx';

const usernameSchema = z.string().min(2).max(16).nonempty('Username should not be empty.').trim();

export const Loading = ({ progress }: { progress: number }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleDefendClick = async () => {
    const name = inputValue;
    const result = usernameSchema.nonempty().safeParse(name);
    if (result.error) {
      setError(result.error.message);
      return false;
    }
    if (result.success) {
      // valid username
      useGameOptionsStore.setState({
        ...useGameOptionsStore.getState(),
        username: result.data,
      });
      startRef.current?.click();
    } else {
      // invalid username
      console.error('Invalid username. Please try again.');
    }
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
              className="absolute bottom-0 left-1/4 h-[64px] w-[172px] px-6 py-4"
              variant={'brutal'}
              onClick={() => btnRef.current?.click()}
            >
              Defend
            </Button>
            <Button
              ref={startRef}
              id="startGame"
              className="hidden"
              variant={'brutal'}
              // onClick={() => btnRef.current?.click()}
            >
              Defend
            </Button>
          </div>
        ) : (
          <ProgressBar currentValue={progress} />
        )}

        <ModalMenu
          cardClassName="bg-black/40 text-white"
          Trigger={<Button ref={btnRef} className="hidden" />}
          modalSize="sm"
          Footer={Button}
          footerProps={{
            variant: 'brutal',
            className: 'w-full text-lg',
            onClick: handleDefendClick,
            children: 'Confirm Username',
          }}
        >
          <div className="mx-auto flex size-full shrink-0 flex-col gap-8 rounded-md p-6 shadow-md">
            <Label htmlFor="input-story">Username</Label>
            <Input
              onChange={e => setInputValue(e.target.value)}
              isValid={inputValue.length > 2}
              value={inputValue}
              id="input-story"
              ref={inputRef}
              placeholder="Enter username"
            />
            {error && <span className="text-red-500">{error}</span>}
          </div>
        </ModalMenu>
      </div>
    </>
  );
};
