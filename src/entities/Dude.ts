import RESOURCES from '#/constants/resources.ts';
import { Vector } from 'excalibur';
import { Enemy } from './Enemy.ts';

export class Dude extends Enemy {
  constructor(hp: number, pathPoints: Vector[]) {
    super(hp, pathPoints);
    this.value = 10;
  }

  async onInitialize(): Promise<void> {
    const dudeAnimation = RESOURCES.characters.Dude.toAnimation();
    this.pos = new Vector(this.pathPoints[0].x, this.pathPoints[0].y);

    if (dudeAnimation) {
      this.graphics.add(dudeAnimation);
    }
  }
}
