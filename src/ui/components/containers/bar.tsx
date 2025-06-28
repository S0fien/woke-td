import { RESOURCES } from '#/constants/resources.ts';
import GameInfo from './game-info.tsx';
import { TowerContainer } from './tower-container.tsx';

const Bar = () => {
  return (
    <>
      <div className={`z-50 h-[125px] w-[800px] rounded-sm text-white`}>
        <div
          style={{
            backgroundImage: `url(${RESOURCES.backgrounds.bar.path})`,
            // backgroundSize: '108px 125px',
            // backgroundPosition: 'center',
            // backgroundRepeat: 'no-repeat',
          }}
          className={'p-toolbar h-full'}
          // className={`p-toolbar my-2 flex size-full justify-between bg-repeat-round px-6 font-medium`}
        >
          <TowerContainer />

          <GameInfo />
        </div>
      </div>
    </>
  );
};

export default Bar;
