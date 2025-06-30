import { Dog } from '#/entities/Dog.ts';
import { Dude } from '#/entities/Dude.ts';
import { Shroom } from '#/entities/Shroom.ts';
import { MAIN_RESOURCES } from './resources.ts';

export const LEVELS = [
  {
    name: 'Tutorial',
    scene: 'demoScene',
    image: MAIN_RESOURCES.backgrounds.bgForest.path,
    enemy: Dude,
    description: 'Test your skills with this intro level',
    available: true,
    initialMoney: 100,
    initialLives: 5,
    baseEnemyCount: 5,
    baseEnemyHp: 20,
    enemyHpScaling: 5,
    enemyCountScaling: 1,
  },
  {
    name: 'The beginning',
    scene: 'gameScene',
    image: MAIN_RESOURCES.backgrounds.grass.path,
    enemy: Dog,
    description: 'A step up in difficulty!',
    available: true,
    initialMoney: 80,
    initialLives: 4,
    baseEnemyCount: 8,
    baseEnemyHp: 35,
    enemyHpScaling: 10,
    enemyCountScaling: 2,
  },
  {
    name: 'Final',
    scene: 'finalScene',
    image: MAIN_RESOURCES.backgrounds.forest.path,
    enemy: Shroom,
    description: 'Only for the brave...',
    available: true,
    initialMoney: 60,
    initialLives: 3,
    baseEnemyCount: 12,
    baseEnemyHp: 50,
    enemyHpScaling: 15,
    enemyCountScaling: 3,
  },
] as const;
