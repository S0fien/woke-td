import useLevelStore from '#/hooks/useLevelStore.ts';
import { GiChainedHeart, GiHumanTarget, GiMoneyStack } from 'react-icons/gi';
import Counter from '../texts/Counter.tsx';

const GameInfo = () => {
  const state = useLevelStore();

  return (
    <div className="absolute top-0 left-0 flex h-fit flex-col justify-between gap-1 pb-8 pl-3 text-white">
      <div className="flex flex-row items-center justify-end">
        <GiMoneyStack color="lime" className="size-8" />
        <Counter fontSize={22} value={state.money} />
      </div>
      <div className="flex flex-row items-center justify-end">
        <GiChainedHeart color="pink" className="size-8" />
        {/* <span>Lives</span> */}
        <Counter fontSize={22} value={state.lives} />
      </div>
      <div className="flex flex-row items-center justify-end">
        <GiHumanTarget color="cyan" className="size-8" />
        <Counter fontSize={22} value={state.wave} />
      </div>
    </div>
  );
};

export default GameInfo;
