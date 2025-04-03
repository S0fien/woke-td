import { Resources } from './../resources';
import { Actor, Animation, AnimationStrategy, Color, Rectangle, SpriteSheet, Vector } from 'excalibur';
import { GAME_CONFIG } from '../config/gameConfig';

export class Dude extends Actor {
  health: number;
  maxHealth: number;
  value: number;
  currentPathIndex: number;
  speed: number;
  private spriteSheet: SpriteSheet | undefined;
  private runAnimation: Animation | undefined;

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

    // Create sprite sheet from the Resources



  // const leftIdle = new Animation({
  //     frames: [
  //         {graphic: playerSpriteSheet.getSprite(0, 1), duration: 300},
  //         {graphic: playerSpriteSheet.getSprite(1, 1), duration: 300},
  //         {graphic: playerSpriteSheet.getSprite(2, 1), duration: 300},
  //         {graphic: playerSpriteSheet.getSprite(3, 1), duration: 300},
  //     ]
  // // })
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

  async onInitialize(): Promise<void> {
    console.log('ikjlkj')
    const dude = Resources.Dude[0]

    // const anim = new Animation({
    //   strategy: AnimationStrategy.Loop,

    //   frames: [
    //     {graphic: dude.toSprite(), duration: 300},
    //     {graphic: dudeSprite?.currentFrame?.graphic.getSprite(1, 0), duration: 300},
    //     {graphic: dude.toSprite(), duration: 300},
    //   ]
    // })
    const anim = Animation
    .fromSpriteSheet(SpriteSheet
      .fromImageSource({image: Resources.Girly[0], grid: {
columns: 4, rows: 4, spriteWidth: 100, spriteHeight: 109
      } }), [0, 1, 2, 3], 300, AnimationStrategy.PingPong)
    this.graphics.add(anim)
    this.graphics.use(anim)
    anim.play()
    // if (dudeSprite) {
    //   console.log('dudeSprite', dudeSprite)
    //   this.graphics.add(dudeSprite);
    //   this.graphics.use(dudeSprite);
    // }
    // // Add and play the walk animation
    // if (this.runAnimation) {
    //   this.graphics.add(this.runAnimation);
    //   this.graphics.use(this.runAnimation);
    //   // this.runAnimation.play();
    // }
    // if (this.spriteSheet) {
    //   this.graphics.add(this.spriteSheet.getSprite(0, 0));
    //   this.graphics.use(this.spriteSheet.getSprite(0, 0));
    // }
  }

  private updateMovement(delta: number): void {
    const pathPoints = GAME_CONFIG.pathPoints.map(point => new Vector(point.x, point.y));

    if (this.currentPathIndex >= pathPoints.length) {
      console.log('dead')
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
    console.log('ll:');
    if (this.health < this.maxHealth) {
      const healthPercentage = this.health / this.maxHealth;
      const healthBarWidth = 20 * healthPercentage;
      console.log('ll:');
      console.log('ll:');

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
