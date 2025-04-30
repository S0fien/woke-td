import { SparklesText } from './sparkles';
import { useEngine } from '#/hooks/useEngine';
import { Shine } from './shine';
import { AuroraText } from './aurora-text';
import RESOURCES from '../constants/resources';
import useGameStore from '#/hooks/useGameStore';

export const Menu = () => {
  const { engine } = useEngine();
  const store = useGameStore();

  if (!engine) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <SparklesText className="relative mx-auto mt-[20vh] font-bold">
        <AuroraText className="text-[8rem]">WOKE</AuroraText>
        <span className="absolute top-0 -right-[17vw] translate-y-[-10px] text-[12rem] text-white text-shadow-sm">
          TD
        </span>
      </SparklesText>
      <div className="row-auto mx-auto mt-[10rem] grid h-[220px] w-64 grid-rows-3 gap-8">
        <Shine
          className="oswald"
          onClick={async () => {
            console.log('Start Game');
            await engine.goToScene('gameScene');
          }}
        >
          Start Game
        </Shine>
        <Shine onClick={() => console.log('Exit')}>Options</Shine>
        <Shine onClick={() => console.log('Exit')}>Exit</Shine>
      </div>
      <div className="absolute right-16 -bottom-6 size-20 cursor-pointer">
        {store.musicRunning ? (
          <img
            src={RESOURCES.icons.volumeOn.path}
            onClick={() => {
              useGameStore.setState({ ...useGameStore.getState(), musicRunning: false });
              RESOURCES.musics.caketown.stop();
            }}
            alt="volumeOn"
          />
        ) : (
          <img
            src={RESOURCES.icons.volumeOff.path}
            onClick={() => {
              useGameStore.setState({ ...useGameStore.getState(), musicRunning: true });
              RESOURCES.musics.caketown.play();
            }}
            alt="volumeOff"
          />
        )}
      </div>
    </>
  );
};
