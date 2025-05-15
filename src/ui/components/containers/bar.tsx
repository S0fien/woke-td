import { Toolbar } from 'primereact/toolbar';
import GameInfo from './game-info.tsx';
import { TowerContainer } from './tower-container.tsx';

const Bar = () => {
  return (
    <Toolbar
      className="h-[125px] w-[800px] rounded-sm text-white"
      ptOptions={{
        classNameMergeFunction: className => `flex-row ${className}`,
      }}
      end={<GameInfo />}
      start={<TowerContainer />}
    />
  );
};

export default Bar;
