import { Actor, Engine, ImageSource, Vector } from 'excalibur';
import { TowerType } from '../types/game.ts';

export class Tower extends Actor {
  towerType: TowerType;
  lastFireTime: number;
  background: ImageSource | null = null;

  constructor(pos: Vector, towerType: TowerType) {
    super({
      x: pos.x,
      y: pos.y,
      width: 30,
      height: 30,
      color: towerType.color,
      name: towerType.type ?? 'unknown',
      z: 9999999999, // Ensure the tower is always on top
    });
    this.towerType = towerType;
    this.lastFireTime = 0;
    this.background = towerType.image;
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    if (this.background) {
      const tower = this.background.toSprite();
      tower.width = 100;
      tower.height = 100;
      this.graphics.add(tower);
    }
  }
}
