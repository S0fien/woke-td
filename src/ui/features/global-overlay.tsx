import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import { AudioContextFactory } from 'excalibur';
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import SettingsMenu from './settings-menu.tsx';

const GlobalOverlay = () => {
  const kdsjds = AudioContextFactory.create();

  const gameOptions = useGameOptionsStore();

  return (
    <div
      className={`pointers-event-all absolute right-0 bottom-0 z-90 mt-auto ml-auto flex cursor-pointer gap-3 pr-10 pb-5 text-white text-shadow-[0_6x_6x_rgb(0_0_0_/_0.75)]`}
    >
      <SettingsMenu />
      {gameOptions.musicRunning ? (
        <BiVolumeFull
          className="size-14 transition-all text-shadow-[0_6x_6x_rgb(0_0_0_/_0.75)] hover:animate-[pulse_2s_ease-in-out_infinite] hover:fill-amber-300"
          onClick={() => {
            useGameOptionsStore.setState({ ...useGameOptionsStore.getState(), musicRunning: false, musicVolume: -1 });
            kdsjds.suspend();
          }}
        />
      ) : (
        <BiVolumeMute
          className="size-14 transition-all text-shadow-[0_6x_6x_rgb(0_0_0_/_0.75)] hover:animate-[pulse_2s_ease-in-out_infinite] hover:fill-amber-300"
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
    </div>
  );
};

export default GlobalOverlay;
