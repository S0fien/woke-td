import { Engine, ExitViewPortEvent, Timer, Vector } from 'excalibur';
import { GAME_CONFIG, TOWER_TYPES } from '../config/gameConfig';
import { Projectile } from '../entities/Projectile';
import { Tower } from '../entities/Tower';
import { Enemy, GameState } from '../types/game';
import { Dude } from '../entities/Dude';
import { GameScene } from '../scenes/GameScene';

export class GameManager {
  private engine: Engine;
  private state: GameState;
  private updateTimer: Timer | null = null;
  // eslint-disable-next-line no-unused-vars
  private setGameState: (state: GameState) => void;

  constructor(engine: Engine, setGameState: () => void) {
    this.engine = engine;
    this.state = {
      money: GAME_CONFIG.initialMoney,
      lives: GAME_CONFIG.initialLives,
      wave: 0,
      gameStarted: false,
      gameOver: false,
      victory: false,
      selectedTower: null,
    };
    this.setGameState = setGameState;
  }

  startGame(): void {
    this.state.gameStarted = true;
    this.startNextWave();
    this.startUpdateLoop();
    
    // Handle mouse move for grid highlighting
    this.engine.canvas.addEventListener('mousemove', (event: MouseEvent) => {
      if (this.state.selectedTower) {
        const pos = new Vector(event.offsetX, event.offsetY);
        const gameScene = this.engine.currentScene as GameScene;
        gameScene.resetGridHighlight();
        gameScene.highlightCell(pos);
      }
    });

    // Handle click for tower placement
    this.engine.canvas.addEventListener('click', (event: MouseEvent) => {
      if (this.state.selectedTower) {
        const pos = new Vector(event.offsetX, event.offsetY);
        const gameScene = this.engine.currentScene as GameScene;
        const gridPos = gameScene.getGridPosition(pos);
        this.placeTower(gridPos, this.state.selectedTower);
        this.setGameState(this.getState());
      }
    });
  }

  private startUpdateLoop(): void {
    console.log('startUpdateLoop');
    this.updateTimer = new Timer({
      fcn: () => this.update(),
      interval: GAME_CONFIG.updateInterval,
      repeats: true,
    });
    this.engine.currentScene.add(this.updateTimer);
    this.updateTimer.start();
  }


  private update(): void {
    console.log('update');
    if (this.state.gameOver || this.state.victory) return;

    const currentTime = this.engine.currentFrameElapsedMs;
    const towers = this.getTowers();
    const enemies = this.getEnemies();
    console.log('towers', towers);
    towers.forEach(tower => {
      console.log('tower', tower);
      if (currentTime - tower.lastFireTime < tower.towerType.fireRate) {
        this.fireTower(tower, enemies);
      }
    });
  }

  private fireTower(tower: Tower, enemies: Enemy[]): void {
    console.log('fireTower', tower, enemies);
    let closestEnemy: Enemy | null = null;
    let closestDistance = Infinity;

    enemies.forEach(enemy => {
      const distance = Vector.distance(tower.pos, enemy.pos);
      if (distance < tower.towerType.range && distance < closestDistance) {
        closestEnemy = enemy;
        closestDistance = distance;
      }
    });

    if (closestEnemy) {
      console.log('closestEnemy', closestEnemy);
      const projectile = new Projectile(tower.pos, closestEnemy, tower.towerType.damage);
      this.engine.currentScene.add(projectile);
      projectile.graphics.isVisible = true;
      tower.lastFireTime = this.engine.currentFrameElapsedMs;
    }
  }

  startNextWave(): void {
    console.log('startNextWave', this.state);
    if (this.state.gameOver || this.state.victory) return;

    const newWave = this.state.wave + 1;
    this.state.wave = newWave;

    const enemyCount = GAME_CONFIG.baseEnemyCount + newWave * GAME_CONFIG.enemyCountScaling;
    const enemyHp = GAME_CONFIG.baseEnemyHp + newWave * GAME_CONFIG.enemyHpScaling;

    let spawned = 0;

    const spawnTimer = new Timer({
      fcn: () => {
        console.log('spawnTimer', spawned, enemyCount);
        if (spawned < enemyCount) {
          const enemy = new Dude(enemyHp);
          console.log('enemy', enemy);
          this.engine.currentScene.add(enemy);
          enemy.graphics.isVisible = true;
          enemy.events.on('fadeout', (truc) => {
            console.log('fadeout', truc);
            this.enemyKilled(enemy.value);
          });          
          enemy.events.on('exitviewport', (truc) => {
            console.log('exitviewport', truc);
            this.enemyReachedEnd(truc);
          });
          spawned++;
        } else {
          spawnTimer.cancel();
          this.checkForNextWave();
        }
      },
      interval: 3500,
      repeats: true,
    });

    this.engine.addTimer(spawnTimer);
    spawnTimer.start();
  }

  private checkForNextWave(): void {
    console.log('checkForNextWave');
    const checkTimer = new Timer({
      fcn: () => {
        console.log('checkTimer', this.getEnemies().length);
        if (this.getEnemies().length === 0) {
          checkTimer.cancel();

          if (this.state.wave < GAME_CONFIG.maxWaves) {
            setTimeout(() => this.startNextWave(), GAME_CONFIG.waveDelay);
          } else {
            this.state.victory = true;
          }
        }
      },
      interval: 1000,
      repeats: true,
    });

    // this.engine.addTimer(checkTimer);
    this.engine.currentScene.add(checkTimer);
    checkTimer.start();
  }

  placeTower(pos: Vector, towerType: string): boolean {
    if (this.state.money < TOWER_TYPES.find(t => t.type === towerType)!.cost) {
      return false;
    }

    if (this.isOnPath(pos)) {
      console.log('on path');
      return false;
    }

    const findTower = TOWER_TYPES.find(t => t.type === towerType);
    if (!findTower) {
      return false;
    }
    const tower = new Tower(pos, findTower);
    this.engine.currentScene.add(tower);
    this.engine.add(tower);
    this.state.money -= findTower.cost;
    return true;
  }

  private isOnPath(pos: Vector): boolean {
    const gameScene = this.engine.currentScene as GameScene;
    console.log('isOnPath', gameScene.pathPoints);
    for (let i = 0; i < gameScene.pathPoints.length - 1; i++) {
      const start = gameScene.pathPoints[i];
      const end = gameScene.pathPoints[i + 1];

      if (start.x === end.x) {
        // vertical segment
        if (
          pos.x >= start.x - GAME_CONFIG.pathBuffer &&
          pos.x <= start.x + GAME_CONFIG.pathBuffer &&
          pos.y >= Math.min(start.y, end.y) - GAME_CONFIG.pathBuffer &&
          pos.y <= Math.max(start.y, end.y) + GAME_CONFIG.pathBuffer
        ) {
          return true;
        }
      } else {
        // horizontal segment
        if (
          pos.y >= start.y - GAME_CONFIG.pathBuffer &&
          pos.y <= start.y + GAME_CONFIG.pathBuffer &&
          pos.x >= Math.min(start.x, end.x) - GAME_CONFIG.pathBuffer &&
          pos.x <= Math.max(start.x, end.x) + GAME_CONFIG.pathBuffer
        ) {
          return true;
        }
      }
    }
    return false;
  }

  enemyReachedEnd(event: ExitViewPortEvent): void {
    event.target.kill()
    this.state.lives--;
    if (this.state.lives <= 0) {
      this.state.gameOver = true;
    }
  }

  enemyKilled(value: number): void {
    this.state.money += value;
  }

  getState(): GameState {
    return { ...this.state };
  }

  setSelectedTower(towerType: string | null): void {
    this.state.selectedTower = towerType;
  }

  cleanup(): void {
    if (this.updateTimer) {
      this.updateTimer.cancel();
      this.engine.remove(this.updateTimer);
    }
  }
  
  getTowers(): Tower[] {
    return this.engine.currentScene.actors.filter((a): a is Tower => 'towerType' in a);
  }

  getEnemies(): Enemy[] {
    return this.engine.currentScene.actors.filter((a): a is Enemy => 'health' in a);
  }

  getProjectiles(): Projectile[] {
    return this.engine.currentScene.actors.filter((a): a is Projectile => 'target' in a);
  }
}
