import { Actor, Color, Vector } from 'excalibur';
import { Enemy } from '../types/game';
import { GAME_CONFIG } from '../config/gameConfig';
import { Resources } from '../resources';

export class Projectile extends Actor {
  damage: number;
  target: Enemy;
  speed: number;

  constructor(pos: Vector, target: Enemy, damage: number) {
    super({
      x: pos.x,
      y: pos.y,
      width: 50,
      height: 50,
      color: Color.Red,
z: 999999
    });

    this.damage = damage;
    this.target = target;
    this.speed = GAME_CONFIG.projectileSpeed;

    this.on('postupdate', evt => {
      this.updateMovement(evt.engine.currentFrameElapsedMs);
    });
  }

  async onInitialize(): Promise<void> {
    const projectile = Resources.weapons[0]
    const projectileSprite = projectile.toSprite()
    this.graphics.add('projectile', projectileSprite)
    this.graphics.use('projectile')
  }

  private updateMovement(delta: number): void {
    if (!this.target || this.target.isKilled()) {
      this.kill();
      return;
    }

    const direction = this.target.pos.sub(this.pos).normalize();
    this.pos.x += (direction.x * this.speed * delta) / 1000;
    this.pos.y += (direction.y * this.speed * delta) / 1000;

    const distance = Vector.distance(this.pos, this.target.pos);
    if (distance < 10) {
      this.target.health -= this.damage;
      if (this.target.health <= 0) {
        this.target.kill();
      }
      this.kill();
    }
  }
}
