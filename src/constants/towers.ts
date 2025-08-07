import { TowerType } from '#/types/game.ts';
import { Color } from 'excalibur';
import { SCENE_RESOURCES } from './resources.ts';

export const TRUMPER_TOWER: TowerType = {
  type: 'trump-tower',
  label: 'Trump Tower',
  cost: 20,
  damage: 10,
  range: 100,
  color: Color.Blue,
  fireRate: 1000,
  image: SCENE_RESOURCES.towers.trumpTower,
};

export const CHURCH_TOWER: TowerType = {
  type: 'church',
  label: 'Church',
  cost: 50,
  damage: 25,
  range: 200,
  color: Color.Red,
  fireRate: 2000,
  image: SCENE_RESOURCES.towers.church,
};

export const TOWER_TYPES: TowerType[] = [
  {
    type: 'trump-tower',
    label: 'Trump Tower',
    cost: 20,
    damage: 10,
    range: 100,
    color: Color.Blue,
    fireRate: 1000,
    image: SCENE_RESOURCES.towers.trumpTower,
  },
  {
    type: 'church',
    label: 'Church',
    cost: 50,
    damage: 25,
    range: 200,
    color: Color.Red,
    fireRate: 2000,
    image: SCENE_RESOURCES.towers.church,
  },
  {
    type: null,
    label: '',
    cost: 50,
    damage: 25,
    range: 200,
    color: Color.Red,
    fireRate: 2000,
    image: null,
  },
  {
    type: null,
    label: '',
    cost: 50,
    damage: 25,
    range: 200,
    color: Color.Red,
    fireRate: 2000,
    image: null,
  },
];

export const TOWER_TYPES_MAP = TOWER_TYPES.reduce((acc, tower) => {
  acc = { ...acc, [String(tower.type ?? '')]: tower.type ?? '' };
  return acc;
}, {});
