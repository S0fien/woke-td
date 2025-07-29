import { Button } from '../components/buttons/button.tsx';
import LevelSelector from '../components/containers/level-selector.tsx';
import { SparklesText } from '../components/texts/sparkles.tsx';

const Menu = () => {
  return (
    <>
      <SparklesText className="font-[romantic] text-[7rem] font-bold tracking-[30px] text-white text-shadow-[0_7px_7px_rgb(0_0_0_/_0.25)]">
        WOKE TD
      </SparklesText>
      <div className="pointer-events-all flex w-50 flex-col gap-8 font-[chewy] text-xl">
        <LevelSelector />
        {/* <Button
          variant={'brutal'}
          onClick={() =>
            toast({
              duration: 1000,pn
              description: 'This feature is not implemented yet.',
              title: 'Not implemented',
            })
          }
        >
          Load Save
        </Button> */}
        <Button variant={'brutal-normal'} onClick={() => window.close()}>
          Exit Game
        </Button>
      </div>
    </>
  );
};

export default Menu;
