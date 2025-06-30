import { TiledResource } from '@excaliburjs/plugin-tiled';
import { Gif, ImageSource, Sound } from 'excalibur';

export interface ResourcesType {
  towers: {
    trumpTower: ImageSource;
    church: ImageSource;
  };
  maps: {
    tiled: TiledResource;
    second: TiledResource;
  };
  backgrounds: {
    test: ImageSource;
    forest: ImageSource;
    menu: ImageSource;
    bar: ImageSource;
    towerContainer: ImageSource;
    circle: ImageSource;
  };
  characters: {
    Dude: Gif;
  };
  projectiles: {
    projectile1: ImageSource;
    projectile2: ImageSource;
    projectile3: ImageSource;
  };
  weapons: {
    sword: ImageSource;
  };
  musics: {
    caketown: Sound;
    happy: Sound;
    lose: Sound;
    win: Sound;
  };
  icons: {
    winning: ImageSource;
    lose: ImageSource;
  };
}
export const MAIN_RESOURCES = {
  backgrounds: {
    grass: new ImageSource('backgrounds/bg-grass.png'),
    bgForest: new ImageSource('backgrounds/bg-forest.png'),

    test: new ImageSource('backgrounds/menu-bg.jpg'),
    forest: new ImageSource('backgrounds/forest.svg'),
    menu: new ImageSource('backgrounds/bg.png'),
    circle: new ImageSource('backgrounds/circle-button.png'),
  },
  musics: {
    caketown: new Sound('sounds/caketown.mp3'),
    happy: new Sound('sounds/happy.mp3'),
  },
  icons: {
    settings: new ImageSource('icons/gear.jpg'),
    level: new ImageSource('icons/icon-trump.png'),
  },
};

export const SCENE_RESOURCES = {
  towers: {
    trumpTower: new ImageSource('towers/trump-tower.png'),
    church: new ImageSource('towers/church.png'),
  },
  maps: {
    tiled: new TiledResource('levels/second.json'),
    second: new TiledResource('levels/third.json'),
    last: new TiledResource('levels/lol.json'),
  },
  backgrounds: {
    bar: new ImageSource('ui/fullbar.png'),
    redIn: new ImageSource('ui/red-in.png'),
    redOut: new ImageSource('ui/red-out.png'),
    // towerContainer: new ImageSource('ui/tower-container'),
    disabled: new ImageSource('ui/disabled.png'),
    coast: new ImageSource('ui/coast.png'),
  },
  characters: {
    Dude: new Gif('characters/dude.gif'),
    dogWalk: new Gif('characters/dog/sprite-walk.gif'),
    dogDie: new Gif('characters/dog/sprite-die.gif'),

    shroom: new Gif('characters/shroom/shroom-walk.gif'),
  },
  projectiles: {
    projectile1: new ImageSource('projectiles/projectile1-1.png'),
    projectile2: new ImageSource('projectiles/projectile1-2.png'),
    projectile3: new ImageSource('projectiles/projectile1-3.png'),
  },
  musics: {
    lose: new Sound('sounds/lose.mp3'),
    win: new Sound('sounds/win.mp3'),
  },
  icons: {
    winning: new ImageSource('icons/win.png'),
    lose: new ImageSource('icons/loser.png'),
  },
} as const;
