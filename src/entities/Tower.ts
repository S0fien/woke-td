import { Actor, Vector } from 'excalibur';
import { TowerType } from '../types/game';

export class Tower extends Actor {
  towerType: TowerType;
  lastFireTime: number;

  constructor(pos: Vector, towerType: TowerType) {
    super({
      x: pos.x,
      y: pos.y,
      width: 30,
      height: 30,
      color: towerType.color,
    });

    this.towerType = towerType;
    this.lastFireTime = 0;
  }
}
