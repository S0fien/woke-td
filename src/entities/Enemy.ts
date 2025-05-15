import { Actor, Color, Rectangle, Vector } from 'excalibur';
import GAME_CONFIG from '../constants/config.ts';

export class Enemy extends Actor {
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
    this.value = Math.floor(hp / 10);
    this.currentPathIndex = 1;
    this.speed = GAME_CONFIG.enemySpeed;

    // Create sprite sheet from the RESOURCES
    // const playerSpriteSheet = SpriteSheet.fromImageSource({
    //   image: RESOURCES.Girl,
    //   grid: {
    //     spriteWidth: 416,
    //     spriteHeight: 454,
    //     rows: 4,
    //     columns: 4,
    //   },
    // });

    // const leftIdle = new Animation({
    //   frames: [
    //     { graphic: playerSpriteSheet.getSprite(0, 1), duration: 300 },
    //     { graphic: playerSpriteSheet.getSprite(1, 1), duration: 300 },
    //     { graphic: playerSpriteSheet.getSprite(2, 1), duration: 300 },
    //     { graphic: playerSpriteSheet.getSprite(3, 1), duration: 300 },
    //   ],
    // });
    // this.graphics.add('left-idle', leftIdle);
    // this.graphics.use('left-idle');

    // Create walk animation using frames
    // this.walkAnimation = Animation.fromSpriteSheet(
    //   this.spriteSheet,
    //   range(0, 15), // Use all 16 frames
    //   200, // 200ms per frame
    //   AnimationStrategy.Loop
    // );

    this.on('postupdate', evt => {
      this.updateMovement(evt.elapsed);
      this.updateHealthBar();
    });
  }

  // async onInitialize(): Promise<void> {
  //   // Add and play the walk animation
  //   if (this.runAnimation) {
  //     this.graphics.add(this.runAnimation);
  //     // this.graphics.use(this.runAnimation);
  //     // this.runAnimation.play();
  //   }
  //   if (this.spriteSheet) {
  //     this.graphics.add(this.spriteSheet.getSprite(0, 0));
  //     // this.graphics.use(this.spriteSheet.getSprite(0, 0));
  //   }
  //   const sprite = RESOURCES.characters.Girl.toSprite();
  //   this.graphics.add(sprite);
  //   this.graphics.use(sprite);
  // }

  private updateMovement(delta: number): void {
    const pathPoints = GAME_CONFIG.pathPoints.map(point => new Vector(point.x, point.y));

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
