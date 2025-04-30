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

export interface GameState {
  money: number;
  lives: number;
  wave: number;
  gameStarted: boolean;
  gameOver: boolean;
  victory: boolean;
  selectedTower: string | null;
  setState: () => void;
  // setState: (state: Partial<GameState>) => void
}
