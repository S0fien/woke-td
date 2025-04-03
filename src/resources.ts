import { SpriteFusionResource } from '@excaliburjs/plugin-spritefusion';
import { ImageSource, Loader } from 'excalibur';

// It is convenient to put your resources in one place
export const Resources = {
  Map: [new ImageSource('./map-bg.png')],
  Fusion: [new SpriteFusionResource({
    mapPath: './map/map.json',
    spritesheetPath: './map/spritesheet.png',
  })],
  Dude: [new ImageSource('./dude.gif')],
    Girl: [new ImageSource('./work.png')],
    Girly: [new ImageSource('./work-mini.png')],
    Boy: [new ImageSource('./boy/walk-1.png'),
      new ImageSource('./boy/walk-2.png'),
      new ImageSource('./boy/walk-3.png'),
      new ImageSource('./boy/walk-4.png'),
      new ImageSource('./boy/walk-5.png'),
      new ImageSource('./boy/walk-6.png'),
      new ImageSource('./boy/walk-7.png'),
      new ImageSource('./boy/walk-8.png'),
      new ImageSource('./boy/walk-9.png'),
      new ImageSource('./boy/walk-10.png'),
      new ImageSource('./boy/walk-11.png'),
      new ImageSource('./boy/walk-12.png'),
      new ImageSource('./boy/walk-13.png'),
      new ImageSource('./boy/walk-14.png'),
      new ImageSource('./boy/walk-15.png'),
      new ImageSource('./boy/run-1.png'),
      new ImageSource('./boy/run-2.png'),
      new ImageSource('./boy/run-3.png'),
      new ImageSource('./boy/run-4.png'),
      new ImageSource('./boy/run-5.png'),
      new ImageSource('./boy/run-6.png'),
      new ImageSource('./boy/run-7.png'),
      new ImageSource('./boy/run-8.png'),
      new ImageSource('./boy/run-9.png'),
      new ImageSource('./boy/run-10.png'),
      new ImageSource('./boy/run-11.png'),
      new ImageSource('./boy/run-12.png'),
      new ImageSource('./boy/run-13.png'),
      new ImageSource('./boy/run-14.png'),
      new ImageSource('./boy/run-15.png')],
  weapons: [new ImageSource('./sword.png')],
} as const; // the 'as const' is a neat typescript trick to get strong typing on your resources.
// So when you type Resources.Sword -> ImageSource

// We build a loader and add all of our resources to the boot loader
// You can build your own loader by extending DefaultLoader
export const loader = new Loader();
Object.values(Resources).forEach(r => {
  console.log('r', r);
  Object.values(r).forEach(r => loader.addResource(r));
});
