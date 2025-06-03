import useLevelStore from '#/hooks/useLevelStore.ts';
import { GiChainedHeart, GiHumanTarget, GiMoneyStack } from 'react-icons/gi';
import Counter from '../texts/Counter.tsx';

const GameInfo = () => {
  const state = useLevelStore();

  return (
    <div className="flex h-full flex-col justify-between gap-1 pt-4 pr-2 pb-6 text-white">
      <div className="flex flex-row items-center justify-end">
        <GiMoneyStack color="lime" className="size-4" />
        <Counter fontSize={14} value={state.money} />
      </div>
      <div className="flex flex-row items-center justify-end">
        <GiChainedHeart color="pink" className="size-4" />
        {/* <span>Lives</span> */}
        <Counter fontSize={14} value={state.lives} />
      </div>
      <div className="flex flex-row items-center justify-end">
        <GiHumanTarget color="cyan" className="size-4" />
        <Counter fontSize={14} value={state.wave} />
      </div>
    </div>
  );
};

export default GameInfo;
