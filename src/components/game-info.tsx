import { useEffect } from 'react';

import { GameEngine } from '../services/GameEngine';
import { useState } from 'react';
import useGameStore from '../hooks/useGameStore';
import Counter from './Counter';
import { GiChainedHeart, GiMoneyStack, GiFist } from 'react-icons/gi';

const GameInfo = () => {
  const state = useGameStore();
  const [engine, setEngine] = useState<GameEngine | null>(null);

  useEffect(() => {
    setEngine(GameEngine.getInstance());
  }, []);

  if (!engine) {
    return <p>coucou</p>;
  }
  console.log('GameInfo', state);
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
        <GiFist color="white" className="size-6" />
        <Counter fontSize={14} value={state.wave} />
      </div>
    </div>
  );
};

export default GameInfo;
