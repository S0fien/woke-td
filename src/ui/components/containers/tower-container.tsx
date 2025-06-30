import { TOWER_TYPES } from '#/constants/towers.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import { TowerTypes } from '#/types/game.ts';
import { Badge } from '../elements/badge.tsx';

export const TowerContainer = () => {
  const selectedTower = useLevelStore(state => state.selectedTower);

  return (
    <div className="space-between relative z-10 flex h-[125px] w-full gap-4 bg-transparent">
      {TOWER_TYPES.map((tower, index) => (
        <button
          key={'tower-' + index}
          onClick={() => {
            useLevelStore.setState(state => ({
              ...state,
              selectedTower: tower.type as TowerTypes,
            }));
          }}
          type="button"
          value={tower.type ?? undefined}
          // aria-selected={selectedTower === tower.type}
          className="hover:text-muted-foreground aria-selected:text-foreground relative inline-flex w-[125px] flex-1 flex-col items-center justify-center rounded-md p-1.5 text-sm font-medium whitespace-nowrap outline-offset-2 transition-all disabled:pointer-events-none disabled:opacity-50"
        >
          {' '}
          <div
            key={tower.type}
            className="no-repeat contain relative flex size-full cursor-pointer flex-col items-center gap-2 rounded-2xl bg-slate-300/40 px-2 transition-opacity group-data-[state=inactive]:opacity-95"
            style={{
              // background: 'transparent',
              transform: selectedTower === tower.type ? 'translateY(-16px)' : 'translateY(0)',
              transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), opacity 0.2s',
            }}
          >
            {tower.image && (
              <>
                <img src={tower.image && tower.image.path} alt={tower.type ?? undefined} className="h-[80px] w-20" />
                <div className="flex flex-col items-center gap-2">
                  <span className="text-background text-center text-sm">{tower.label}</span>
                  <div className="grid grid-cols-2">
                    <Badge className="absolute top-0 -left-2 p-2">{tower.cost}</Badge>
                    <Badge className="absolute top-0 -right-2 p-2">{tower.damage}</Badge>
                  </div>
                </div>
              </>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};
