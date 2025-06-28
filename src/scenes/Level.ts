import GAME_CONFIG from '#/constants/config.ts';
import { RESOURCES } from '#/constants/resources.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import type { GameEngine } from '#/services/GameEngine.tsx';
import { GameManager } from '#/services/GameManager.tsx';
import { Polyline, TiledResource } from '@excaliburjs/plugin-tiled';
import { Actor, Color, DefaultLoader, Scene, SceneActivationContext, Vector } from 'excalibur';

export class Level extends Scene {
  private grid: Actor[][] = [];
  private hoverCell: Actor | null = null;
  public pathPoints: Vector[] = [];
  private map: TiledResource;

  constructor(public tiledMap: TiledResource) {
    super();
    this.map = tiledMap;
  }

  onPreLoad(loader: DefaultLoader): void {
    Object.values(RESOURCES).forEach(r => {
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

  onActivate(engine: SceneActivationContext) {
    void engine;
    const currentLevel = useLevelStore.getState().level;
    if (!currentLevel) return;

    useLevelStore.setState({
      money: currentLevel.initialMoney,
      lives: currentLevel.initialLives,
      wave: 0,
      // ...other state
    });
    this.loadPathFromTiled();
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
          opacity: 0.2,
          color: Color.LightGray,
        });
        this.grid[row][col] = cell;
        this.add(cell);
      }
    }
  }

  // Load path points from Tiled object layer named "Path"
  private loadPathFromTiled() {
    // Find the object layer named "Path"
    // const pathLayer = RESOURCES.maps.tiled.data.layers.find(
    //   (layer: any) => layer.type === 'objectgroup' && layer.name === 'road'
    // );
    const pathLayer = this.map.getObjectLayers('path');
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

  public isAlreadyUsed(pos: Vector) {
    const finding = this.actors.find(actor => {
      return actor.pos.equals(pos);
    });

    return finding;
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

    if (row >= 0 && row < this.grid.length && col >= 0 && col < this.grid[0].length) {
      const engine = this.engine as GameEngine;
      const gameManager = GameManager.getInstance(engine);

      if (gameManager.isCellOccupied(gridPos) || gameManager.isOnPath(gridPos)) {
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
