import Toolbar from '#/assets/bar.png';
import { SpriteFusionResource } from '@excaliburjs/plugin-spritefusion';
import { TiledResource } from '@excaliburjs/plugin-tiled';
import { Gif, ImageSource, Sound } from 'excalibur';

const cloudResources = {
  // Fonts
  chewy: 'https://res.cloudinary.com/djaxek6tl/raw/upload/v1748939105/chewy_of8iy3.ttf',
  mercy: 'https://res.cloudinary.com/djaxek6tl/raw/upload/v1748939107/mercy_rnjxqo.ttf',
  panic: 'https://res.cloudinary.com/djaxek6tl/raw/upload/v1748939108/panic_y2geja.ttf',
  romantic: 'https://res.cloudinary.com/djaxek6tl/raw/upload/v1748939110/romantic_sd0azc.ttf',
  barriecito: 'https://res.cloudinary.com/djaxek6tl/raw/upload/v1748939103/barriecito_agsoyc.ttf',

  // Audio
  win: 'https://res.cloudinary.com/djaxek6tl/video/upload/v1748939099/win_tz2f35.mp3',
  lose: 'https://res.cloudinary.com/djaxek6tl/video/upload/v1748939096/lose_nsppre.mp3',
  happy: 'https://res.cloudinary.com/djaxek6tl/video/upload/v1748939096/happy_ub6wxw.mp3',
  caketown: 'https://res.cloudinary.com/djaxek6tl/video/upload/v1748939095/caketown_x865xn.mp3',

  // Characters
  dude: 'https://res.cloudinary.com/djaxek6tl/image/upload/v1748938074/dude_kv6vji.gif',
  girlSpriteSheet: 'https://res.cloudinary.com/djaxek6tl/image/upload/v1748938150/work_fmhcdm.png',

  // Images / Icons
  sample: 'https://res.cloudinary.com/djaxek6tl/image/upload/v1748938151/sample_toqll3.svg',
  volume: 'https://res.cloudinary.com/djaxek6tl/image/upload/v1748938153/volume_k9wpej.png',
  volumeOff: 'https://res.cloudinary.com/djaxek6tl/image/upload/v1748938151/no-shouting_asjwa7.png',
};

const RESOURCES = {
  towers: {
    trumpTower: new ImageSource('./towers/trump-tower.png'),
    church: new ImageSource('./towers/church.png'),
  },
  maps: {
    simple: new ImageSource('./maps/map-bg.png'),
    begin: new ImageSource('./maps/map.jpg'),
    fusion: new SpriteFusionResource({
      mapPath: './maps/map.json',
      spritesheetPath: './maps/spritesheet.png',
    }),
  },
  backgrounds: {
    test: new ImageSource('./backgrounds/test.jpg'),
    forest: new ImageSource('./backgrounds/forest.svg'),
    menu: new ImageSource('./backgrounds/menu.jpg'),
    bar: new ImageSource('./backgrounds/bar.png'),
    toolbar: new ImageSource(Toolbar),
    dummy: new ImageSource('./backgrounds/Dummy.svg'),
    circle: new ImageSource('./circle-button.png'),
    tiled: new TiledResource('./untitled.tmx', {}),
  },
  characters: {
    Dude: new Gif(cloudResources.dude),
    Girl: new ImageSource(cloudResources.girlSpriteSheet),
  },
  projectiles: {
    projectile1: new ImageSource('./animations/projectiles/projectile8-1.png'),
    projectile2: new ImageSource('./animations/projectiles/projectile8-2.png'),
    projectile3: new ImageSource('./animations/projectiles/projectile8-3.png'),
  },
  weapons: {
    sword: new ImageSource('./icons/sword.png'),
  },
  icons: {
    sample: new ImageSource(cloudResources.sample),
    volumeOn: new ImageSource(cloudResources.volume),
    volumeOff: new ImageSource(cloudResources.volumeOff),
  },
  musics: {
    caketown: new Sound(cloudResources.caketown),
    happy: new Sound(cloudResources.happy),
    lose: new Sound(cloudResources.lose),
    win: new Sound(cloudResources.win),
  },
} as const;

export default RESOURCES;
