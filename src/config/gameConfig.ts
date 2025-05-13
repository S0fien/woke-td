import { Color } from 'excalibur';
import { TowerType } from '../types/game';
import Resources from '../constants/resources';

export const GAME_CONFIG = {
  width: window.innerWidth,
  height: window.innerHeight,

  backgroundColor: Color.Blue,
  gridSize: 80, // Size of each grid cell
  pathPoints: [
    { x: 160, y: 0 },
    { x: 160, y: 425 },
    { x: 1300, y: 425 },
  ],

  pathBuffer: 30,
  maxWaves: 3,
  initialMoney: 500,
  initialLives: 10,
  baseEnemyCount: 3,
  baseEnemyHp: 20,
  enemyHpScaling: 10,
  enemyCountScaling: 2,
  waveDelay: 3000,
  updateInterval: 100,
  projectileSpeed: 300,
  enemySpeed: 100,
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
    image: Resources.towers.trumpTower,
  },
  {
    type: 'church',
    label: 'Church',
    cost: 50,
    damage: 25,
    range: 200,
    color: Color.Red,
    fireRate: 2000,
    image: Resources.towers.church,
  },
];

export const TOWER_TYPES_MAP = TOWER_TYPES.reduce((acc, tower) => {
  acc = { ...acc, [tower.type]: tower.type };
  return acc;
}, {});
