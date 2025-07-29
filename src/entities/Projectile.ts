import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import { Actor, Animation, Color, Vector } from 'excalibur';
import GAME_CONFIG from '../constants/config.ts';
import { SCENE_RESOURCES } from '../constants/resources.ts';
import { Enemy } from '../types/game.ts';

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
      z: 999999,
    });

    this.damage = damage;
    this.target = target;
    this.speed = GAME_CONFIG.projectileSpeed;

    this.on('postupdate', evt => {
      this.updateMovement(evt.engine.currentFrameElapsedMs);
    });
  }

  async onInitialize(): Promise<void> {
    const projectiles = Object.values(SCENE_RESOURCES.projectiles).map(projectile => projectile.toSprite());

    const fire = new Animation({
      frames: [
        { graphic: projectiles[0], duration: 150 },
        { graphic: projectiles[1], duration: 150 },
        { graphic: projectiles[2], duration: 150 },
      ],
    });
    this.graphics.add('fire', fire);
    this.graphics.use('fire');
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
      this.target.emit('');
      if (this.target.health <= 0) {
        this.target.kill();
        SCENE_RESOURCES.musics.win.play(useGameOptionsStore.getState().musicVolume);
      }
      this.kill();
    }
  }
}
