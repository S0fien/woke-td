import GameInfo from './game-info.tsx';
import { TowerContainer } from './tower-container.tsx';

const Bar = () => {
  return (
    <>
      <div className={`z-50 h-[125px] w-[600px] rounded-sm text-white`}>
        <div className={'h-full rounded-4xl bg-slate-600/40 px-6 font-medium'}>
          <TowerContainer />

          <GameInfo />
        </div>
      </div>
    </>
  );
};

export default Bar;
