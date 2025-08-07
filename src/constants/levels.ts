import { Dog } from '#/entities/Dog.ts';
import { Dude } from '#/entities/Dude.ts';
import { Shroom } from '#/entities/Shroom.ts';
import { TowerType } from '#/types/game.ts';
import { TiledResource } from '@excaliburjs/plugin-tiled';
import { Sound } from 'excalibur';
import { MAIN_RESOURCES, SCENE_RESOURCES } from './resources.ts';
import { CHURCH_TOWER, TRUMPER_TOWER } from './towers.ts';

export interface Ennemies {
  Dude: typeof Dude;
  Dog: typeof Dog;
  Shroom: typeof Shroom;
}

export interface LevelConfig {
  towers: TowerType[];
  name: string;
  scene: string;
  image: string;
  description: string;
  maxWaves: number;
  waveDelay: number;
  music: Sound;
  available: boolean;
  initialMoney: number;
  initialLives: number;
  baseEnemyCount: number;
  baseEnemyHp: number;
  enemyHpScaling: number;
  enemyCountScaling: number;
  enemy: Ennemies[keyof Ennemies];
  map: TiledResource;
}

export const GAME_SCENE: LevelConfig = {
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
  maxWaves: 3,
  waveDelay: 1000,
  enemyCountScaling: 2,
  music: MAIN_RESOURCES.musics.caketown,
  towers: [TRUMPER_TOWER, CHURCH_TOWER],
  map: SCENE_RESOURCES.maps.tiled,
};
export const FINAL_SCENE: LevelConfig = {
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
  maxWaves: 3,
  waveDelay: 1000,
  enemyCountScaling: 3,
  music: MAIN_RESOURCES.musics.caketown,
  towers: [TRUMPER_TOWER, CHURCH_TOWER],
  map: SCENE_RESOURCES.maps.second,
};
export const DEMO_SCENE: LevelConfig = {
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
  maxWaves: 3,
  waveDelay: 1000,
  enemyCountScaling: 1,
  music: MAIN_RESOURCES.musics.caketown,
  towers: [TRUMPER_TOWER],
  map: SCENE_RESOURCES.maps.last,
};

export const LEVELS = { DEMO_SCENE, GAME_SCENE, FINAL_SCENE } as const;
