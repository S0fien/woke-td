import RESOURCES from '#/constants/resources.ts';
import { TOWER_TYPES } from '#/constants/towers.ts';
import { useEngine } from '#/hooks/useEngine.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import { TowerTypes } from '#/types/game.ts';
import { Badge } from './badge.tsx';

export const TowerContainer = () => {
  const { gameManager } = useEngine();
  const selectedTower = useLevelStore(state => state.selectedTower);

  return (
    <div className="flex gap-4">
      <div className="mx-auto flex h-[125px] bg-transparent">
        {TOWER_TYPES.map((tower, index) => (
          <button
            key={'tower-' + index}
            onClick={() => {
              gameManager?.setSelectedTower(tower.type as TowerTypes);
            }}
            type="button"
            value={tower.type}
            aria-selected={selectedTower === tower.type}
            className="tabs-trigger group hover:text-muted-foreground focus-visible:outline-ring/70 aria-selected:text-foreground inline-flex flex-1 flex-col items-center justify-center rounded-md px-3 py-1.5 text-sm text-xs font-medium whitespace-nowrap outline-offset-2 transition-all focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:bg-pink-300/40 aria-selected:shadow-none aria-selected:shadow-sm aria-selected:shadow-black/5"
          >
            <div
              key={tower.type}
              className="no-repeat contain relative flex w-[108px] cursor-pointer flex-col items-center gap-2 px-2 transition-opacity group-data-[state=inactive]:opacity-95"
              style={{
                backgroundImage: `url(${RESOURCES.backgrounds.towerContainer.path})`,
                backgroundSize: '108px 125px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <img src={tower.image.path} alt={tower.type} className="w-20" />
              <div className="flex flex-col items-center gap-2">
                <span className="text-background text-center text-sm">{tower.label}</span>
                <div className="grid grid-cols-2">
                  <Badge className="absolute top-0 -left-2 p-3">{tower.cost}</Badge>

                  <Badge className="absolute top-0 -right-2 p-3">{tower.damage}</Badge>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
