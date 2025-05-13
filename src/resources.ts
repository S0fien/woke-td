import { SpriteFusionResource } from '@excaliburjs/plugin-spritefusion';
import { ImageSource, Loader, Sound } from 'excalibur';

// It is convenient to put your resources in one place
export const Resources = {
  towers: {
    trumpTower: new ImageSource('./towers/trump-tower.png'),
    church: new ImageSource('./towers/church.png'),
  },
  maps: {
    begin: new ImageSource('./maps/map.jpg'),
    fusion: new SpriteFusionResource({
      mapPath: './maps/map.json',
      spritesheetPath: './maps/spritesheet.png',
    }),
  },
  backgrounds: {
    forest: new ImageSource('./backgrounds/forest.svg'),
    menu: new ImageSource('./backgrounds/menu.jpg'),
    bar: new ImageSource('./backgrounds/bar.png'),
    dummy: new ImageSource('./backgrounds/Dummy.svg'),
    circle: new ImageSource('./circle-button.png'),
  },
  characters: {
    Dude: new ImageSource('./characters/dude.gif'),
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
    lose: new Sound('./sounds/lose.ogg'),
    win: new Sound('./sounds/win.wav'),
    main: new Sound('./sounds/happy.mp3'),
  },
} as const; // the 'as const' is a neat typescript trick to get strong typing on your resources.
// So when you type Resources.Sword -> ImageSource

// We build a loader and add all of our resources to the boot loader
// You can build your own loader by extending DefaultLoader
export const loader = new Loader();
Object.values(Resources).forEach(r => {
  Object.values(r).forEach(resource => {
    loader.addResource(resource);
  });
});
