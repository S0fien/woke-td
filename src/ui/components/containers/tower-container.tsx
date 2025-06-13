import RESOURCES from '#/constants/resources.ts';
import { TOWER_TYPES } from '#/constants/towers.ts';
import { useEngine } from '#/hooks/useEngine.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import { TowerTypes } from '#/types/game.ts';
import { Badge } from './badge.tsx';
import { Tabs, TabsList, TabsTrigger } from './tabs.tsx';

export const TowerContainer = () => {
  const { gameManager } = useEngine();
  const selectedTower = useLevelStore(state => state.selectedTower);
  const select = (type: TowerTypes) => {
    if (gameManager) {
      gameManager.setSelectedTower(type);
    }
  };

  console.log('selected', selectedTower);
  return (
    <div className="flex gap-4">
      <Tabs
        onValueChange={() => {
          //
          const sddsqdsqqds = document.querySelectorAll('.tabs-trigger');
          sddsqdsqqds.forEach((el: Element) => {
            if (el.getAttribute('data-state') === 'active' && !selectedTower) el.setAttribute('data-state', 'inactive');
          });
        }}
        defaultValue="tab-1"
      >
        <TabsList className="mx-auto flex h-[125px] bg-transparent">
          {TOWER_TYPES.map((tower, index) => (
            <TabsTrigger
              key={tower.label}
              value={`tab-${index + 1}`}
              className="tabs-trigger group data-[state=active]:bg-muted flex-1 flex-col px-3 text-xs data-[state=active]:shadow-none"
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
                <img onClick={() => select(tower.type)} src={tower.image.path} alt={tower.type} className="w-20" />
                <div className="flex flex-col items-center gap-2">
                  <span className="text-background text-center text-sm">{tower.label}</span>
                  <div className="grid grid-cols-2">
                    <Badge className="absolute top-0 -left-2 p-3">{tower.cost}</Badge>

                    <Badge className="absolute top-0 -right-2 p-3">{tower.damage}</Badge>
                  </div>
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        {/* <TabsContent value="tab-1">
          <p className="text-muted-foreground p-4 text-center text-xs">Content for Tab 1</p>
        </TabsContent>
        <TabsContent value="tab-2">
          <p className="text-muted-foreground p-4 text-center text-xs">Content for Tab 2</p>
        </TabsContent>
        <TabsContent value="tab-3">
          <p className="text-muted-foreground p-4 text-center text-xs">Content for Tab 3</p>
        </TabsContent> */}
      </Tabs>
      {/* {TOWER_TYPES.map(tower => (
        <div
          key={tower.type}
          className="no-repeat contain relative flex h-[125px] w-[108px] cursor-pointer flex-col items-center gap-2 px-2 py-1"
          style={{
            backgroundImage: `url(${RESOURCES.backgrounds.towerContainer.path})`,
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
      ))} */}
    </div>
  );
};
