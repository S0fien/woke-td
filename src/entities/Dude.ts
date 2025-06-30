import { SCENE_RESOURCES } from '#/constants/resources.ts';
import { Vector } from 'excalibur';
import { Enemy } from './Enemy.ts';

const DudeMeta = {
  value: 10,
  hp: 100,
  speed: 50,
};

export class Dude extends Enemy {
  constructor(hp: number, pathPoints: Vector[]) {
    super({ ...DudeMeta, hp, pathPoints });
    this.value = 10;
  }

  async onInitialize(): Promise<void> {
    const dudeAnimation = SCENE_RESOURCES.characters.Dude.toAnimation();
    this.pos = new Vector(this.pathPoints[0].x, this.pathPoints[0].y);

    if (dudeAnimation) {
      this.graphics.add(dudeAnimation);
    }
  }
}
