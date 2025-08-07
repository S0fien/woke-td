import GAME_CONFIG from '#/constants/config.ts';
import { SCENE_RESOURCES } from '#/constants/resources.ts';
import { TOWER_TYPES } from '#/constants/towers.ts';
import { Dog } from '#/entities/Dog.ts';
import { Dude } from '#/entities/Dude.ts';
import { Projectile } from '#/entities/Projectile.ts';
import { Shroom } from '#/entities/Shroom.ts';
import { Tower } from '#/entities/Tower.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import { Enemy, TowerTypes } from '#/types/game.ts';
import { ExitViewPortEvent, Timer, Vector } from 'excalibur';
import { GameEngine } from './GameEngine.ts';

export type EnemyConstructor = typeof Dude | typeof Dog | typeof Shroom;
export class GameManager {
  public engine: GameEngine;
  private updateTimer: Timer | null = null;
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
    return this.engine.currentScene.getLevelConfig(useLevelStore.getState().levelKey);
  }

  async startGame(): Promise<void> {
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
      const isCellError = this.engine.currentScene.isCellError();
      this.engine.currentScene.resetGridHighlight();
      const { selectedTower } = useLevelStore.getState();
      if (selectedTower && !isCellError) {
        const pos = new Vector(event.offsetX, event.offsetY);
        const gameScene = this.engine.currentScene;
        const gridPos = gameScene.getGridPosition(pos);
        this.placeTower(gridPos, selectedTower);
      } else {
        useLevelStore.setState({ selectedTower: null });
      }
    });
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
    const { gameOver, victory } = useLevelStore.getState();
    let { wave: currentWave } = useLevelStore.getState();
    if (gameOver || victory) return;

    const wave = currentWave++;
    useLevelStore.setState({ wave: wave + 1 });

    const current = this.getCurrentLevel();
    console.log('current', current);
    if (!current) return;

    const enemyCount = current.baseEnemyCount + wave * current.enemyCountScaling;
    const enemyHp = current.baseEnemyHp + wave * current.enemyHpScaling;

    let spawned = 0;

    const spawnTimer = new Timer({
      action: () => {
        if (spawned < enemyCount) {
          const enemy = this.getCurrentLevel()?.enemy;
          console.log('ennemy', enemy, this.getCurrentLevel());
          if (!enemy) {
            console.error('No enemy class defined for current level');
            return;
          }
          this.spawnEnemy(enemy, this.engine.currentScene.pathPoints, enemyHp);

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

          const state = useLevelStore.getState();
          const current = this.getCurrentLevel();
          if (!current) return;
          if (state.wave < current.maxWaves) {
            setTimeout(() => this.startNextWave(), current.waveDelay);
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

  isCellOccupied(pos: Vector): boolean {
    const towerAtCell = this.engine.currentScene.actors.find(a => {
      const isTower = TOWER_TYPES.find(t => t.type === a.name);
      return a.pos.equals(pos) && isTower;
    });
    if (towerAtCell) {
      return true;
    }
    return false;
  }

  placeTower(pos: Vector, towerType: TowerTypes): boolean {
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

  public spawnEnemy(EnemyClass: EnemyConstructor, pathPoints: Vector[], hp: number) {
    const enemy = new EnemyClass(hp, pathPoints);
    console.log('ennemy', enemy, EnemyClass);
    this.engine.currentScene.add(enemy);
    enemy.graphics.isVisible = true;
    enemy.on('exitviewport', truc => {
      this.enemyReachedEnd(truc);
    });

    enemy.on('kill', () => {
      this.enemyKilled(enemy.value);
    });
  }

  public isOnPath(pos: Vector): boolean {
    for (let i = 0; i < this.engine.currentScene.pathPoints.length - 1; i++) {
      const start = this.engine.currentScene.pathPoints[i];
      const end = this.engine.currentScene.pathPoints[i + 1];

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
    const state = useLevelStore.getState();
    SCENE_RESOURCES.musics.lose.play(useGameOptionsStore.getState().musicVolume);
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
