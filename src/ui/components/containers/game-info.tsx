import useLevelStore from '#/hooks/useLevelStore.ts';
import { GiChainedHeart, GiMoneyStack, GiFist } from 'react-icons/gi';
import Counter from '../texts/Counter.tsx';
import Popover from '../elements/popover.tsx';

const GameInfo = () => {
  const state = useLevelStore();

  return (
    <div className="flex flex-col justify-end gap-1 text-white">
      <div className="flex flex-row items-center justify-end">
        <GiMoneyStack color="lime" className="size-6" />
        <Counter fontSize={14} value={state.money} />
      </div>
      <div className="flex flex-row items-center justify-end">
        <GiChainedHeart color="pink" className="size-6" />
        {/* <span>Lives</span> */}
        <Counter fontSize={14} value={state.lives} />
      </div>
      <div className="flex flex-row items-center justify-end">
        <Popover text="ddsf" title="title" trigger={<GiFist color="white" className="size-6" />} />

        <Counter fontSize={14} value={state.wave} />
      </div>
    </div>
  );
};

export default GameInfo;
