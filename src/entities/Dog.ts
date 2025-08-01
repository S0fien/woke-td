import { SCENE_RESOURCES } from '#/constants/resources.ts';
import { Vector } from 'excalibur';
import { Enemy } from './Enemy.ts';

const DogMeta = {
  value: 5,
  hp: 60,
  speed: 150,
};

export class Dog extends Enemy {
  constructor(hp: number, pathPoints: Vector[]) {
    super({ ...DogMeta, hp, pathPoints });
    this.value = 10;
  }

  async onInitialize(): Promise<void> {
    const dogAnimation = SCENE_RESOURCES.characters.dogWalk.toAnimation();
    this.pos = new Vector(this.pathPoints[0].x, this.pathPoints[0].y);

    if (dogAnimation) {
      this.graphics.add(dogAnimation);
    }
  }
}
