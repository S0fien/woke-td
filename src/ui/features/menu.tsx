import { Shine } from '../components/buttons/shine.tsx';
import LevelSelector from '../components/containers/level-selector.tsx';
import { AuroraText } from '../components/texts/aurora-text.tsx';
import { SparklesText } from '../components/texts/sparkles.tsx';

export const Menu = () => {
  console.log('Menu');

  return (
    <div className="h-[100vh] text-center">
      <SparklesText className="mx-auto mt-[20vh] font-bold">
        <AuroraText className="font-[mercy] text-[8rem]">KILL THE WOKE</AuroraText>
      </SparklesText>
      <div className="row-auto mx-auto mt-[15rem] grid h-[220px] w-80 grid-rows-3 gap-8 font-[chewy] text-7xl">
        <LevelSelector />
        <Shine onClick={() => window.close()}>Exit</Shine>
      </div>
    </div>
  );
};
