import { SpriteFusionResource } from '@excaliburjs/plugin-spritefusion';
import { Gif, ImageSource, Sound } from 'excalibur';

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
    dummy: new ImageSource('./backgrounds/Dummy.svg'),
    circle: new ImageSource('./circle-button.png'),
  },
  characters: {
    Dude: new Gif('./characters/dude.gif'),
    Girl: new ImageSource('./characters/work.png'),
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
    sample: new ImageSource('./icons/sample.svg'),
    volumeOn: new ImageSource('./icons/volume.png'),
    volumeOff: new ImageSource('./icons/no-shouting.png'),
  },
  musics: {
    caketown: new Sound('./sounds/caketown.mp3'),
    lose: new Sound('./sounds/lose.mp3'),
    win: new Sound('./sounds/win.mp3'),
    main: new Sound('./sounds/happy.mp3'),
  },
} as const;

export default RESOURCES;
