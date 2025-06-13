import { useEngine } from '#/hooks/useEngine.ts';
import { cn } from '#/libs/utils.ts';
import { Shine } from '../components/buttons/shine.tsx';
import LevelSelector from '../components/containers/level-selector.tsx';
import { AuroraText } from '../components/texts/aurora-text.tsx';
import { SparklesText } from '../components/texts/sparkles.tsx';

export const Menu = () => {
  const truc = useEngine();

  console.log('Menu', truc.engine?.canvas.height, truc.engine?.canvas.width);

  return (
    <div className={cn(`flex size-full flex-col items-center justify-between py-30`)}>
      <SparklesText className="font-bold">
        <AuroraText className="font-[mercy] text-[7rem]">Woke TD</AuroraText>
      </SparklesText>
      <div className="flex flex-col gap-8 font-[chewy] text-7xl">
        <LevelSelector />
        <Shine className="bg-purple-500 text-2xl" onClick={() => window.close()}>
          Exit Game
        </Shine>
      </div>
    </div>
  );
};
