import { Cloudinary } from '@cloudinary/url-gen';
import { TiledResource } from '@excaliburjs/plugin-tiled';
import { Gif, ImageSource, Sound } from 'excalibur';
import { API_KEY, API_SECRET } from './secrets.ts';
const client = new Cloudinary({
  cloud: {
    cloudName: 'djaxek6tl',
    apiKey: API_KEY,
    apiSecret: API_SECRET,
  },
});

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
export const ESSENTIALS = {
  backgrounds: {
    grass: new ImageSource('backgrounds/bg-grass.png'),
    bgForest: new ImageSource('backgrounds/bg-forest.png'),

    test: new ImageSource('backgrounds/menu-bg.jpg'),
    forest: new ImageSource('backgrounds/forest.svg'),
    menu: new ImageSource('backgrounds/menu.jpg'),
    circle: new ImageSource('backgrounds/circle-button.png'),
  },
  musics: {
    caketown: new Sound('sounds/caketown.mp3'),
    happy: new Sound('sounds/happy.mp3'),
  },
  weapons: {
    sword: new ImageSource(client.image('sword').toURL()),
  },
  icons: {
    settings: new ImageSource('gear.jpg'),
    level: new ImageSource('icons/icon-trump.png'),
  },
};

export const RESOURCES = {
  towers: {
    trumpTower: new ImageSource('towers/trump-tower.png'),
    church: new ImageSource('towers/church.png'),
  },
  maps: {
    tiled: new TiledResource('second.json'),
    second: new TiledResource('third.json'),
    last: new TiledResource('last.json'),
  },
  backgrounds: {
    bar: new ImageSource('bar.png'),
    towerContainer: new ImageSource(client.image('tower-container').toURL()),
  },
  characters: {
    Dude: new Gif('dude.gif'),
  },
  projectiles: {
    projectile1: new ImageSource(client.image('projectile1-1').toURL()),
    projectile2: new ImageSource(client.image('projectile1-2').toURL()),
    projectile3: new ImageSource(client.image('projectile1-3').toURL()),
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
