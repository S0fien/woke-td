import { MAIN_RESOURCES } from '#/constants/resources.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import { toast } from '#/hooks/useToast.ts';
import { saveGameToFile } from '#/libs/save.ts';
import { SaveData } from '#/types/game.ts';
import { useState } from 'react';
import { BiBell } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import { GiOverdrive } from 'react-icons/gi';
import { Button } from '../components/buttons/button.tsx';
import { ModalMenu } from './modal-menu.tsx';

('use client');

interface IToggleSwitchProps {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: boolean) => void;
  defaultChecked?: boolean;
}

const ToggleSwitch = ({ onChange, defaultChecked }: IToggleSwitchProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked ?? false);
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange?.(newCheckedState);
  };

  return (
    <>
      <label className="flex cursor-pointer items-center select-none">
        <div className="relative">
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="sr-only" />
          <div className={`box block h-8 w-14 rounded-full ${isChecked ? 'bg-muted' : 'bg-muted'}`} />
          <div
            className={`absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full transition ${
              isChecked ? 'bg-foreground/75 translate-x-full' : 'bg-foreground/50'
            }`}
          />
        </div>
      </label>
    </>
  );
};

const settings = [
  {
    label: 'Allow music',
    description: 'Send notifications to device.',
    action: <ToggleSwitch />,
  },
  {
    label: 'Clear all data and cache',
    description: 'Send notifications to device.',
    action: (
      <Button
        onClick={() => {
          useGameOptionsStore.getState().resetGame();
          useLevelStore.getState().resetGame();
          toast({
            title: 'Store Cleared',
            description: 'All game data has been reset.',
            // duration: 500,
          });
        }}
        variant={'brutal'}
      >
        <GiOverdrive />
      </Button>
    ),
  },
  {
    label: 'Save my game',
    description: 'Send notifications to device.',
    action: (
      <Button
        variant={'brutal'}
        onClick={() => {
          const state = useLevelStore.getState();
          const { musicRunning } = useGameOptionsStore.getState();
          const saveData: SaveData = {
            ...state,
            musicRunning,
            levelCompleted: [],
          };
          saveGameToFile(saveData);
        }}
      >
        <GiOverdrive />
      </Button>
    ),
  },
];
const SettingsMenu = () => {
  return (
    <>
      <ModalMenu
        Trigger={
          <Button className="text-white" variant="brutal" size={'icon'}>
            {' '}
            <CiSettings size={40} color="white" />
          </Button>
        }
        title="Settings"
        description={<img src={MAIN_RESOURCES.icons.settings.path} className="w-32" />}
        modalSize="sm"
        Footer={Button}
        footerProps={{
          variant: 'brutal',
          className: 'w-full text-lg',
          children: 'Back to menu',
        }}
      >
        <div className="grid w-full gap-4">
          {settings.map((setting, index) => (
            <div
              key={`${index}-settings`}
              className="flex w-full items-center space-x-4 rounded-sm border-2 border-black p-4 dark:border-white"
            >
              <BiBell />
              <div className="flex-1 space-y-1">
                <p className="text-sm leading-none font-medium">{setting.label}</p>
                <p className="text-muted-foreground text-sm">{setting.description}</p>
              </div>
              {setting.action}
            </div>
          ))}
        </div>
      </ModalMenu>
    </>
  );
};

export default SettingsMenu;
