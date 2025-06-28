import GAME_CONFIG from '#/constants/config.ts';
import { RESOURCES } from '#/constants/resources.ts';
// import { TOWER_TYPES } from '#/constants/towers.ts';
import { Dude } from '#/entities/Dude.ts';
import { Projectile } from '#/entities/Projectile.ts';
import { Tower } from '#/entities/Tower.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import { Level } from '#/scenes/Level.ts';
import { Enemy, TowerType, TowerTypes } from '#/types/game.ts';
// import { ExitViewPortEvent, Timer, ex.Vector } from 'excalibur';
import { GameEngine } from './GameEngine.tsx';

let ex: typeof import('excalibur');
let towerTypes: typeof import('#/constants/towers.ts');
let TOWER_TYPES: TowerType[];

export class GameManager {
  public engine: GameEngine;
  private updateTimer: ex.Timer | null = null;
  private static instance: GameManager | null = null;

  private constructor(engine: GameEngine) {
    this.engine = engine;
  }

  public static getInstance(engine: GameEngine): GameManager {
    if (!GameManager.instance) {
      if (!engine) {
        throw new Error('GameManager requires GameEngine instance for first initialization');
      }
      GameManager.instance = new GameManager(engine);
    }
    return GameManager.instance;
  }

  public getCurrentLevel() {
    return useLevelStore.getState().level;
  }

  async startGame(): Promise<void> {
    ex = await import('excalibur');
    towerTypes = await import('#/constants/towers.ts');
    TOWER_TYPES = towerTypes.TOWER_TYPES;

    useGameOptionsStore.setState({ ...useGameOptionsStore.getState(), gameStarted: true });
    this.startNextWave();
    this.startUpdateLoop();

    this.engine.input.pointers.on('move', evt => {
      const state = useLevelStore.getState();
      if (state.selectedTower) {
        const pos = evt.worldPos;
        this.engine.currentScene.resetGridHighlight();
        this.engine.currentScene.highlightCell(pos);
      }
    });

    // Handle click for tower placement
    this.engine.canvas.addEventListener('click', (event: MouseEvent) => {
      this.engine.currentScene.resetGridHighlight();
      const state = useLevelStore.getState();
      if (state.selectedTower) {
        const pos = new ex.Vector(event.offsetX, event.offsetY);
        const gameScene = this.engine.currentScene;
        const gridPos = gameScene.getGridPosition(pos);
        const { selectedTower } = state;
        if (selectedTower) {
          this.placeTower(gridPos, selectedTower);
        }
      }
    });
  }

  private startUpdateLoop(): void {
    this.updateTimer = new ex.Timer({
      fcn: () => this.update(),
      interval: GAME_CONFIG.updateInterval,
      repeats: true,
    });
    this.engine.currentScene.add(this.updateTimer);
    this.updateTimer.start();
  }

  private update(): void {
    const state = useLevelStore.getState();
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
      const distance = ex.Vector.distance(tower.pos, enemy.pos);
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
    const state = useLevelStore.getState();
    if (state.gameOver || state.victory) return;

    const newWave = state.wave + 1;
    useLevelStore.setState({ wave: newWave });

    const current = this.getCurrentLevel();
    if (!current) return;

    const enemyCount = current.baseEnemyCount + newWave * current.enemyCountScaling;
    const enemyHp = current.baseEnemyHp + newWave * current.enemyHpScaling;

    let spawned = 0;

    const spawnTimer = new ex.Timer({
      action: () => {
        if (spawned < enemyCount) {
          const enemy = new Dude(enemyHp, this.engine.currentScene.pathPoints);
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
    const checkTimer = new ex.Timer({
      fcn: async () => {
        if (this.getEnemies().length === 0) {
          checkTimer.cancel();

          const state = useLevelStore.getState();
          if (state.wave < GAME_CONFIG.maxWaves) {
            setTimeout(() => this.startNextWave(), GAME_CONFIG.waveDelay);
          } else {
            useLevelStore.setState({ victory: true });
            this.cleanup();
          }
        }
      },
      interval: 1000,
      repeats: true,
    });

    this.engine.add(checkTimer);
    checkTimer.start();
  }

  isCellOccupied(pos: ex.Vector): boolean {
    const towerAtCell = this.engine.currentScene.actors.find(a => {
      const isTower = TOWER_TYPES.find(t => t.type === a.name);
      return a.pos.equals(pos) && isTower;
    });
    if (towerAtCell) {
      return true;
    }
    return false;
  }

  placeTower(pos: ex.Vector, towerType: TowerTypes): boolean {
    const state = useLevelStore.getState();

    if (state.money < TOWER_TYPES.find(t => t.type === towerType)!.cost) {
      return false;
    }

    const findTower = TOWER_TYPES.find(t => t.type === towerType);

    if (this.isCellOccupied(pos) || this.isOnPath(pos) || !findTower) {
      return false;
    }

    const tower = new Tower(pos, findTower);
    this.engine.currentScene.add(tower);

    useLevelStore.setState({
      money: state.money - findTower.cost,
      selectedTower: null,
    });

    return true;
  }

  public isOnPath(pos: ex.Vector): boolean {
    const gameScene = this.engine.currentScene as Level;
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

  async enemyReachedEnd(event: ex.ExitViewPortEvent): Promise<void> {
    event.target.kill();
    const state = useLevelStore.getState();
    RESOURCES.musics.lose.play(useGameOptionsStore.getState().musicVolume);
    useLevelStore.setState({ lives: state.lives - 1 });
    const newState = useLevelStore.getState();
    if (newState.lives <= 0) {
      useLevelStore.setState({ gameOver: true });
      this.cleanup();
    }
  }

  async enemyKilled(value: number): Promise<void> {
    const state = useLevelStore.getState();
    useLevelStore.setState({ money: state.money + value });
  }

  async setSelectedTower(towerType: TowerTypes | null): Promise<void> {
    useLevelStore.setState({ selectedTower: towerType });
  }

  cleanup(): void {
    if (this.updateTimer) {
      this.updateTimer.cancel();
      this.engine.remove(this.updateTimer);
    }
    this.engine.stop();
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
