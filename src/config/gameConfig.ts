import { Color } from 'excalibur';
import { TowerType } from '../types/game';

export const GAME_CONFIG = {
  width: 800,
  height: 600,
  backgroundColor: Color.Blue,
  gridSize: 40, // Size of each grid cell
  pathPoints: [
    { x: 0, y: 200 },
    { x: 200, y: 200 },
    { x: 200, y: 400 },
    { x: 600, y: 400 },
    { x: 600, y: 100 },
    { x: 850, y: 100 },
  ],
  pathBuffer: 30,
  maxWaves: 5,
  initialMoney: 500,
  initialLives: 10,
  baseEnemyCount: 5,
  baseEnemyHp: 20,
  enemyHpScaling: 10,
  enemyCountScaling: 2,
  waveDelay: 3000,
  updateInterval: 100,
  projectileSpeed: 300,
  enemySpeed: 100,
};

export const TOWER_TYPES: TowerType[] = [
  { type: 'basic', cost: 20, damage: 10, range: 100, color: Color.Blue, fireRate: 1000 },
  { type: 'sniper', cost: 50, damage: 25, range: 200, color: Color.Red, fireRate: 2000 },
  { type: 'rapid', cost: 30, damage: 5, range: 80, color: Color.Green, fireRate: 500 },
];
