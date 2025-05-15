import RESOURCES from './resources.ts';

export const LEVELS = [
  {
    name: 'The beginning',
    scene: 'gameScene',
    image: RESOURCES.backgrounds.forest.path,
    description: 'Test your skills with this intro level',
    available: true,
  },
  {
    name: '???',
    scene: 'gameScene',
    image: RESOURCES.backgrounds.menu.path,
    description: 'a description',
    available: false,
  },
] as const;
