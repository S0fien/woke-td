import { Color, ExitViewPortEvent, Font, Label, Timer, Vector } from 'excalibur';
import GAME_CONFIG from '../constants/config';
import { TOWER_TYPES } from '../constants/towers';
import { Projectile } from '../entities/Projectile';
import { Tower } from '../entities/Tower';
import { Enemy, TowerTypes } from '../types/game';
import { Dude } from '../entities/Dude';
import { GameScene } from '../scenes/GameScene';
import { GameEngine } from './GameEngine';
import useGameStore from '../hooks/useGameStore';
import RESOURCES from '../constants/resources';

export class GameManager {
  public engine: GameEngine;
  private updateTimer: Timer | null = null;
  private static instance: GameManager | null = null;

  private constructor(engine: GameEngine) {
    this.engine = engine;
  }

  // public setState(state: Partial<GameState>) {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       useGameStore.setState(state);
  //       resolve(true);
  //     }, 100);
  //   });
  // }

  public static getInstance(engine: GameEngine): GameManager {
    if (!GameManager.instance) {
      if (!engine) {
        throw new Error('GameManager requires GameEngine instance for first initialization');
      }
      GameManager.instance = new GameManager(engine);
    }
    return GameManager.instance;
  }

  async startGame(): Promise<void> {
    console.log('startGame', useGameStore.getState());
    useGameStore.setState({ ...useGameStore.getState(), gameStarted: true });
    this.startNextWave();
    this.startUpdateLoop();

    // Handle mouse move for grid highlighting
    this.engine.canvas.addEventListener('mousemove', (event: MouseEvent) => {
      const state = useGameStore.getState();
      console.log('mousemove', state.selectedTower);
      if (state.selectedTower) {
        const pos = new Vector(event.offsetX, event.offsetY);
        this.engine.currentScene.resetGridHighlight();
        this.engine.currentScene.highlightCell(pos);
      }
    });

    // Handle click for tower placement
    this.engine.canvas.addEventListener('click', (event: MouseEvent) => {
      this.engine.currentScene.resetGridHighlight();
      const state = useGameStore.getState();
      console.log('click', state.selectedTower);
      if (state.selectedTower) {
        const pos = new Vector(event.offsetX, event.offsetY);
        const gameScene = this.engine.currentScene;
        const gridPos = gameScene.getGridPosition(pos);
        const { selectedTower } = state;
        if (selectedTower) {
          this.placeTower(gridPos, selectedTower);
        }
      }
    });

    console.log('state', useGameStore.getState());
  }

  private startUpdateLoop(): void {
    this.updateTimer = new Timer({
      fcn: () => this.update(),
      interval: GAME_CONFIG.updateInterval,
      repeats: true,
    });
    this.engine.currentScene.add(this.updateTimer);
    this.updateTimer.start();
  }

  private update(): void {
    const state = useGameStore.getState();
    if (state.gameOver || state.victory) return;

    const currentTime = this.engine.currentFrameElapsedMs;
    const towers = this.getTowers();
    const enemies = this.getEnemies();
    towers.forEach(tower => {
      if (currentTime - tower.lastFireTime < tower.towerType.fireRate) {
        this.fireTower(tower, enemies);
      }
    });
  }

  private fireTower(tower: Tower, enemies: Enemy[]): void {
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
      const projectile = new Projectile(tower.pos, closestEnemy, tower.towerType.damage);
      this.engine.currentScene.add(projectile);
      projectile.graphics.isVisible = true;
      tower.lastFireTime = this.engine.currentFrameElapsedMs;
    }
  }

  async startNextWave(): Promise<void> {
    const state = useGameStore.getState();
    if (state.gameOver || state.victory) return;

    const newWave = state.wave + 1;
    useGameStore.setState({ wave: newWave });

    const enemyCount = GAME_CONFIG.baseEnemyCount + newWave * GAME_CONFIG.enemyCountScaling;
    const enemyHp = GAME_CONFIG.baseEnemyHp + newWave * GAME_CONFIG.enemyHpScaling;

    let spawned = 0;

    const spawnTimer = new Timer({
      action: () => {
        if (spawned < enemyCount) {
          const enemy = new Dude(enemyHp);
          this.engine.currentScene.add(enemy);
          enemy.graphics.isVisible = true;
          enemy.on('exitviewport', truc => {
            this.enemyReachedEnd(truc);
          });

          enemy.on('kill', () => {
            this.enemyKilled(enemy.value);
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

    this.engine.add(spawnTimer);
    spawnTimer.start();
  }

  private checkForNextWave(): void {
    const checkTimer = new Timer({
      fcn: async () => {
        if (this.getEnemies().length === 0) {
          checkTimer.cancel();

          const state = useGameStore.getState();
          if (state.wave < GAME_CONFIG.maxWaves) {
            setTimeout(() => this.startNextWave(), GAME_CONFIG.waveDelay);
          } else {
            useGameStore.setState({ victory: true });
            this.engine.currentScene.add(
              new Label({
                text: 'Victory!',
                font: new Font({
                  family: 'Arial',
                  size: 32,
                  color: Color.White,
                }),
              })
            );
          }
        }
      },
      interval: 1000,
      repeats: true,
    });

    this.engine.add(checkTimer);
    // this.engine.currentScene.add(checkTimer);
    checkTimer.start();
  }

  placeTower(pos: Vector, towerType: TowerTypes): boolean {
    const state = useGameStore.getState();
    if (state.money < TOWER_TYPES.find(t => t.type === towerType)!.cost) {
      return false;
    }

    const tldl = this.engine.currentScene.actors.find(a => {
      console.log('a', a.pos, pos);
      const isTower = TOWER_TYPES.find(t => t.type === a.name);
      console.log('isTower', isTower);
      return a.pos.equals(pos) && isTower;
    });
    console.log('tldl', tldl);
    if (tldl) {
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
    // this.engine.add(tower);
    useGameStore.setState({
      money: state.money - findTower.cost,
      selectedTower: null,
    });
    return true;
  }

  public isOnPath(pos: Vector): boolean {
    const gameScene = this.engine.currentScene as GameScene;
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

  async enemyReachedEnd(event: ExitViewPortEvent): Promise<void> {
    event.target.kill();
    RESOURCES.musics.lose.play();
    const state = useGameStore.getState();
    useGameStore.setState({ lives: state.lives - 1 });
    const newState = useGameStore.getState();
    if (newState.lives <= 0) {
      useGameStore.setState({ gameOver: true });
      this.cleanup();
    }
  }

  async enemyKilled(value: number): Promise<void> {
    const state = useGameStore.getState();
    useGameStore.setState({ money: state.money + value });
  }

  async setSelectedTower(towerType: TowerTypes | null): Promise<void> {
    useGameStore.setState({ selectedTower: towerType });
  }

  cleanup(): void {
    if (this.updateTimer) {
      this.updateTimer.cancel();
      this.engine.remove(this.updateTimer);
      this.engine.stop();
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
