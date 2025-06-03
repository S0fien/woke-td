import GameInfo from './game-info.tsx';
import { TowerContainer } from './tower-container.tsx';

const Bar = () => {
  return (
    <div
      className={`fixed bottom-0 left-1/4 z-50 h-[125px] w-[800px] rounded-sm border-t border-gray-200 text-white dark:border-gray-600`}
    >
      <div
        className={'p-toolbar h-full'}
        // className={`p-toolbar my-2 flex size-full justify-between bg-repeat-round px-6 font-medium`}
      >
        <TowerContainer />

        <GameInfo />
      </div>
    </div>
  );
};

export default Bar;
