import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import { AudioContextFactory } from 'excalibur';
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { Button } from '../components/buttons/button.tsx';
import SettingsMenu from './settings-menu.tsx';

const GlobalOverlay = () => {
  const kdsjds = AudioContextFactory.create();

  const gameOptions = useGameOptionsStore();

  return (
    <div
      style={{ pointerEvents: 'all' }}
      className={`absolute right-0 bottom-0 z-90 mt-auto ml-auto flex cursor-pointer gap-3 pr-10 pb-5 text-white text-shadow-[0_6x_6x_rgb(0_0_0_/_0.75)]`}
    >
      <SettingsMenu />
      <Button variant="brutal" size="icon" className="text-white">
        {gameOptions.musicRunning ? (
          <BiVolumeFull
            size={40}
            onClick={() => {
              useGameOptionsStore.setState({ ...useGameOptionsStore.getState(), musicRunning: false, musicVolume: -1 });
              kdsjds.suspend();
            }}
          />
        ) : (
          <BiVolumeMute
            size={40}
            onClick={() => {
              useGameOptionsStore.setState({
                ...useGameOptionsStore.getState(),
                musicRunning: true,
                musicVolume: useGameOptionsStore.getState().musicVolume,
              });
              kdsjds.resume();
            }}
          />
        )}
      </Button>
    </div>
  );
};

export default GlobalOverlay;
