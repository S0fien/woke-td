import RESOURCES from '#/constants/resources.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import { AudioContextFactory } from 'excalibur';

export const GlobalOverlay = () => {
  const store = useGameOptionsStore();
  const kdsjds = AudioContextFactory.create();

  return (
    <div className="absolute right-[2vw] bottom-6 z-50 size-20 cursor-pointer">
      {store.musicRunning ? (
        <img
          src={RESOURCES.icons.volumeOn.path}
          onClick={() => {
            useGameOptionsStore.setState({ ...useGameOptionsStore.getState(), musicRunning: false });
            kdsjds.suspend();
            //   music.stop();
          }}
          alt="volumeOn"
        />
      ) : (
        <img
          src={RESOURCES.icons.volumeOff.path}
          onClick={() => {
            useGameOptionsStore.setState({ ...useGameOptionsStore.getState(), musicRunning: true });
            kdsjds.resume();
            //   music.play();
          }}
          alt="volumeOff"
        />
      )}
    </div>
  );
};
