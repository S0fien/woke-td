import { LEVELS } from '#/constants/levels.ts';
import { Actor, Color, ImageSource } from 'excalibur';

export type TowerTypes = 'trump-tower' | 'church';

export interface TowerType {
  type: TowerTypes;
  label: string;
  cost: number;
  damage: number;
  range: number;
  color: Color;
  fireRate: number;
  image: ImageSource;
}

export interface Tower extends Actor {
  towerType: TowerType;
  lastFireTime: number;
}

export interface Enemy extends Actor {
  health: number;
  maxHealth: number;
  value: number;
  currentPathIndex: number;
  speed: number;
}

export interface Projectile extends Actor {
  damage: number;
  target: Enemy;
  speed: number;
}

export type LevelConfig = (typeof LEVELS)[number];

export interface LevelState {
  money: number;
  lives: number;
  wave: number;
  gameOver: boolean;
  victory: boolean;
  selectedTower: TowerTypes | null;
  level: LevelConfig | undefined;
}

export interface GameOptions {
  isInitialized: boolean;
  gameStarted: boolean;
  musicRunning: boolean;
  musicVolume: number;
  resources: any;
}
