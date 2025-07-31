import GAME_CONFIG from '#/constants/config.ts';
import { SCENE_RESOURCES } from '#/constants/resources.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import type { GameEngine } from '#/services/GameEngine.ts';
import { EnemyConstructor, GameManager } from '#/services/GameManager.ts';
import Bar from '#/ui/components/containers/bar.tsx';
import { Polyline, TiledResource } from '@excaliburjs/plugin-tiled';
import { Actor, Color, DefaultLoader, Scene, SceneActivationContext, Transition, Vector } from 'excalibur';
import { createRoot } from 'react-dom/client';

export class Level extends Scene {
  private grid: Actor[][] = [];
  public hoverCell: Actor | null = null;
  public pathPoints: Vector[] = [];
  public static map: TiledResource;
  public static enemy: EnemyConstructor;
  static uiRoot: ReturnType<typeof createRoot> | null = null;
  static instance: Level | null = null;

  protected music: any = null;
  protected mapResource: any = null;
  public enemyClass: EnemyConstructor;
  protected uiId: string = 'scene-interface';

  constructor(mapResource: any, enemyClass: any, music: any = null, uiId: string = 'scene-interface') {
    super();
    Level.map = mapResource;
    Level.enemy = enemyClass;
    this.mapResource = mapResource;
    this.enemyClass = enemyClass;
    this.music = music;
    this.uiId = uiId;
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Level(this.map, this.enemy);
    }
    return this.instance;
  }

  protected createSceneUI(containerId: string, uiId: string, BarComponent: React.ReactNode) {
    const uiContainer = document.createElement('div');
    uiContainer.id = uiId;
    uiContainer.classList = 'absolute bottom-0 w-full flex justify-center items-end';
    uiContainer.style.pointerEvents = 'all';

    const container = document.getElementById(containerId);
    if (container) {
      container.appendChild(uiContainer);
    }

    Level.uiRoot = createRoot(uiContainer);
    Level.uiRoot.render(BarComponent);
  }

  protected cleanupSceneUI(containerId: string, uiId: string) {
    if (Level.uiRoot) {
      Level.uiRoot.unmount();
      const container = document.getElementById(containerId);
      const sceneContainer = document.getElementById(uiId);
      if (sceneContainer) container?.removeChild(sceneContainer);
      Level.uiRoot = null;
    }
  }

  onPreLoad(loader: DefaultLoader): void {
    Object.values(SCENE_RESOURCES).forEach(r => {
      Object.values(r).forEach(resource => {
        loader.addResource(resource);
      });
    });
  }

  onInitialize(): void {
    const currentLevel = useLevelStore.getState().level;
    if (!currentLevel) return;

    useLevelStore.setState({
      money: currentLevel.initialMoney,
      lives: currentLevel.initialLives,
      wave: 0,
      // ...other state
    });
  }

  override async onActivate(context: SceneActivationContext): Promise<void> {
    // Music
    if (this.music) {
      this.music.loop = true;
      this.music.play(useGameOptionsStore.getState().musicVolume);
    }
    // Add map
    if (this.mapResource) {
      this.mapResource.addToScene(this);
    }
    // Grid, path, game manager
    this.createGrid();
    this.createPath();
    const gameManager = GameManager.getInstance(context.engine as GameEngine);
    gameManager.startGame();
    // UI
    this.createSceneUI(GAME_CONFIG.containerId, this.uiId, Bar());
    this.loadPathFromTiled();
  }

  override onTransition(direction: 'in' | 'out'): Transition | undefined {
    void direction;
    if (this.music) this.music.stop();
    this.cleanupSceneUI(GAME_CONFIG.containerId, this.uiId);
    this.clear();
    return undefined;
  }

  public createGrid() {
    const cols = Math.floor(GAME_CONFIG.width / GAME_CONFIG.gridSize);
    const rows = Math.floor(GAME_CONFIG.height / GAME_CONFIG.gridSize);

    for (let row = 0; row < rows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < cols; col++) {
        const cell = new Actor({
          x: col * GAME_CONFIG.gridSize + GAME_CONFIG.gridSize / 2,
          y: row * GAME_CONFIG.gridSize + GAME_CONFIG.gridSize / 2,
          width: GAME_CONFIG.gridSize - 2,
          height: GAME_CONFIG.gridSize - 2,
          opacity: 0.25,
          color: Color.Black,
        });
        this.grid[row][col] = cell;
        this.add(cell);
      }
    }
  }

  private loadPathFromTiled() {
    const pathLayer = Level.map.getObjectLayers('path');
    if (!pathLayer) return;

    // Find the first polyline object
    const polylineObj = pathLayer[0].objects.find((obj: any) => obj.points);
    if (!polylineObj) return;

    // Polyline points are relative to the object's (x, y)
    this.pathPoints = (polylineObj as Polyline).points.map(
      (pt: any) => new Vector(polylineObj.x + pt.x, polylineObj.y + pt.y)
    );
  }

  // Draw the path as a polyline using a custom Actor
  public createPath() {
    for (let i = 0; i < this.pathPoints.length - 1; i++) {
      const start = this.pathPoints[i];
      const end = this.pathPoints[i + 1];
      const pathSegment = new Actor({
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2,
        width: Math.abs(end.x - start.x),
        height: Math.abs(end.y - start.y),
        color: Color.Red,
        opacity: 0,
      });

      this.add(pathSegment);
    }
  }

  public getGridPosition(pos: Vector): Vector {
    const col = Math.floor(pos.x / GAME_CONFIG.gridSize);
    const row = Math.floor(pos.y / GAME_CONFIG.gridSize);
    return new Vector(
      col * GAME_CONFIG.gridSize + GAME_CONFIG.gridSize / 2,
      row * GAME_CONFIG.gridSize + GAME_CONFIG.gridSize / 2
    );
  }

  public isCellError(): boolean {
    return this.hoverCell?.color.equal(Color.Red) || false;
  }

  public highlightCell(pos: Vector) {
    const gridPos = this.getGridPosition(pos);
    const col = Math.floor(gridPos.x / GAME_CONFIG.gridSize);
    const row = Math.floor(gridPos.y / GAME_CONFIG.gridSize);

    const hoverCellConfig = {
      x: gridPos.x,
      y: gridPos.y,
      width: GAME_CONFIG.gridSize,
      height: GAME_CONFIG.gridSize,
      z: 9999999999, // Ensure the hover cell is always on top
      color: Color.Pink,
      opacity: 0.8,
    };
    const isSolid = Level.map.getTilesByPoint(gridPos).find(tile => tile.exTile.solid);

    if (row >= 0 && row < this.grid.length && col >= 0 && col < this.grid[0].length) {
      const engine = this.engine as GameEngine;
      const gameManager = GameManager.getInstance(engine);

      if (gameManager.isCellOccupied(gridPos) || gameManager.isOnPath(gridPos) || isSolid) {
        this.hoverCell = new Actor({
          ...hoverCellConfig,
          color: Color.Red,
        });
        this.add(this.hoverCell);
      } else {
        this.hoverCell = new Actor({
          ...hoverCellConfig,
          color: Color.Green,
        });
      }
      this.add(this.hoverCell);
    }
  }

  public resetGridHighlight() {
    if (this.hoverCell) {
      this.remove(this.hoverCell);
      this.hoverCell = null;
    }
  }
}
