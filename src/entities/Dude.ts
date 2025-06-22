import GAME_CONFIG from '#/constants/config.ts';
import RESOURCES from '#/constants/resources.ts';
import { Actor, Color, Engine, Rectangle, Vector } from 'excalibur';

export class Dude extends Actor {
  health: number;
  maxHealth: number;
  value: number;
  currentPathIndex: number;
  speed: number;

  constructor(hp: number) {
    super({
      x: 0,
      y: 200,
      width: 40,
      height: 40,
      color: Color.Transparent,
    });

    this.health = hp;
    this.maxHealth = hp;
    this.value = 10;
    this.currentPathIndex = 1;
    this.speed = GAME_CONFIG.enemySpeed;
  }

  onEnterViewport(): void {
    console.log('Dude entered viewport');
  }

  onPostUpdate(_: Engine, elapsed: number): void {
    this.updateMovement(elapsed);
    this.updateHealthBar();
  }

  async onInitialize(): Promise<void> {
    const dudeAnimation = RESOURCES.characters.Dude.toAnimation();

    this.pos = new Vector(GAME_CONFIG.pathPoints[0].x, GAME_CONFIG.pathPoints[0].y);

    if (dudeAnimation) {
      this.graphics.add(dudeAnimation);
      // this.graphics.use(dudeAnimation);
    }
    // this.graphics.use(dudeAnimation);
  }

  private updateMovement(delta: number): void {
    const pathPoints = GAME_CONFIG.pathPoints.map(point => new Vector(point.x, point.y));

    if (this.currentPathIndex >= pathPoints.length) {
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
    const maxHealth = this.maxHealth;
    if (this.health < maxHealth) {
      const healthPercentage = this.health / maxHealth;
      const healthBarWidth = 60 * healthPercentage;

      const rectActor = new Actor({});
      rectActor.graphics.add(
        new Rectangle({
          width: 20,
          height: 3,
          origin: new Vector(50, 15),
          color: Color.Red,
        })
      );
      rectActor.graphics.add(
        new Rectangle({
          width: healthBarWidth,
          height: 3,
          origin: new Vector(-50, 35),
          color: Color.Green,
        })
      );
      this.addChild(rectActor);
    } else {
      const rectActor = new Actor({});
      rectActor.graphics.add(
        new Rectangle({
          width: maxHealth,
          height: 3,
          origin: new Vector(-10, 35),
          color: Color.Green,
          opacity: 1,
        })
      );
      this.addChild(rectActor);
    }
  }
}
