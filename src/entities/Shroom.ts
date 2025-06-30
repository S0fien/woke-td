import { SCENE_RESOURCES } from '#/constants/resources.ts';
import { Vector } from 'excalibur';
import { Enemy } from './Enemy.ts';

const ShroomMeta = {
  value: 15,
  hp: 150,
  speed: 35,
};

export class Shroom extends Enemy {
  constructor(hp: number, pathPoints: Vector[]) {
    super({ ...ShroomMeta, hp, pathPoints });
    this.value = 10;
  }

  async onInitialize(): Promise<void> {
    const shroomAnimation = SCENE_RESOURCES.characters.shroom.toAnimation();
    this.pos = new Vector(this.pathPoints[0].x, this.pathPoints[0].y);

    if (shroomAnimation) {
      this.graphics.add(shroomAnimation);
    }
  }
}
