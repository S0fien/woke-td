import { Actor, Color, Vector } from 'excalibur';

export interface TowerType {
  type: string;
  cost: number;
  damage: number;
  range: number;
  color: Color;
  fireRate: number;
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
}
