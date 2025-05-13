import { SparklesText } from '../components/texts/sparkles';
import { useEngine } from '#/hooks/useEngine';
import { Shine } from '../components/buttons/shine';
import { AuroraText } from '../components/texts/aurora-text';
import LevelSelector from '../components/containers/level-selector';

export const Menu = () => {
  const { engine } = useEngine();

  if (!engine) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-[100vh] text-center">
      <SparklesText className="mx-auto mt-[20vh] font-bold">
        <AuroraText className="font-[mercy] text-[8rem]">KILL THE WOKE</AuroraText>
      </SparklesText>
      <div className="row-auto mx-auto mt-[10rem] grid h-[220px] w-64 grid-rows-3 gap-8 font-[chewy]">
        <LevelSelector />
        <Shine onClick={() => console.log('Exit')}>Options</Shine>
        <Shine onClick={() => console.log('Exit')}>Exit</Shine>
      </div>
    </div>
  );
};
