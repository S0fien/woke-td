import type { Engine } from 'excalibur';
import { Actor, Color, Rectangle, Vector } from 'excalibur';

export class Enemy extends Actor {
  health: number;
  maxHealth: number;
  value: number;
  currentPathIndex: number;
  speed: number;
  pathPoints: Vector[];

  constructor({ hp, pathPoints, value, speed }: { hp: number; pathPoints: Vector[]; speed: number; value: number }) {
    super({
      x: 0,
      y: 200,
      width: 40,
      height: 40,
      color: Color.Transparent,
    });

    this.health = hp;
    this.pathPoints = pathPoints;
    this.maxHealth = hp;
    this.value = value;
    this.currentPathIndex = 1;
    this.speed = speed;
  }

  onPostUpdate(_: Engine, elapsed: number) {
    this.updateMovement(elapsed);
    this.updateHealthBar();
  }

  private updateMovement(delta: number): void {
    const pathPoints = this.pathPoints.map(point => new Vector(point.x, point.y));

    if (this.currentPathIndex >= pathPoints.length) {
      // this.kill();
      return;
    }

    const targetPoint = pathPoints[this.currentPathIndex];
    const direction = targetPoint.sub(new Vector(this.pos.x, this.pos.y)).normalize();

    this.pos.x += (direction.x * this.speed * delta) / 1000;
    this.pos.y += (direction.y * this.speed * delta) / 1000;

    const distance = Vector.distance(this.pos, targetPoint);
    if (distance < 5) {
      this.currentPathIndex++;
    }
  }

  private updateHealthBar(): void {
    if (this.health < this.maxHealth) {
      const healthPercentage = this.health / this.maxHealth;
      const healthBarWidth = 20 * healthPercentage;

      this.graphics.add(
        new Rectangle({
          width: 20,
          height: 3,
          origin: new Vector(-10, -15),
          color: Color.Red,
        })
      );

      this.graphics.add(
        new Rectangle({
          width: healthBarWidth,
          height: 3,
          origin: new Vector(-10, -35),
          color: Color.Green,
        })
      );
    }
  }
}
