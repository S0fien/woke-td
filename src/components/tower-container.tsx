import { TowerTypes } from '#/types/game';
import { useEngine } from '#/hooks/useEngine';
import RESOURCES from '#/constants/resources';
import { TOWER_TYPES } from '#/constants/towers';
export const TowerContainer = () => {
  const { gameManager } = useEngine();

  const select = (type: TowerTypes) => {
    if (gameManager) {
      gameManager.setSelectedTower(type);
    }
  };

  return (
    <>
      {TOWER_TYPES.map(tower => (
        <div
          key={tower.type}
          className="no-repeat contain relative flex h-[125px] w-[108px] cursor-pointer flex-col items-center gap-2 px-2 py-1"
          style={{
            backgroundImage: `url(${RESOURCES.backgrounds.dummy.path})`,
            backgroundSize: '108px 125px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <img onClick={() => select(tower.type)} src={tower.image.path} alt={tower.type} className="w-20" />
          <div className="flex flex-col items-center gap-2">
            <span className="text-center text-sm">{tower.label}</span>
            <div className="grid grid-cols-2">
              <div
                style={{
                  backgroundImage: `url(${RESOURCES.backgrounds.circle.path})`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                className="absolute top-0 -left-2 p-3"
              >
                <p className="text-xs">{tower.cost}</p>
              </div>
              <div
                style={{
                  backgroundImage: `url(${RESOURCES.backgrounds.circle.path})`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                className="absolute top-0 -right-2 p-3"
              >
                <p className="text-xs">{tower.damage}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
