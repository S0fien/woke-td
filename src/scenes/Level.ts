import GAME_CONFIG from '#/constants/config.ts';
import { TOWER_TYPES_MAP } from '#/constants/towers.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import { GameEngine } from '#/services/GameEngine.tsx';
import { GameManager } from '#/services/GameManager.ts';
import { Actor, Color, Scene, SceneActivationContext, Vector } from 'excalibur';

export class Level extends Scene {
  private grid: Actor[][] = [];
  private hoverCell: Actor | null = null;
  public pathPoints: Vector[] = [];

  constructor() {
    super();
  }

  onActivate(engine: SceneActivationContext): void {
    void engine; // Explicitly indicate that we're ignoring this parameter

    this.createGrid();
    this.createPath();
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
          width: GAME_CONFIG.gridSize - 1, // Slightly smaller to show gaps
          height: GAME_CONFIG.gridSize - 0, // Slightly smaller to show gaps
          //   z: 9999999999,
          opacity: 0.2,
          color: Color.Black,
        });
        this.grid[row][col] = cell;
        this.add(cell);
      }
    }
  }
  public createPath() {
    for (let i = 0; i < this.pathPoints.length - 1; i++) {
      const start = this.pathPoints[i];
      const end = this.pathPoints[i + 1];
      const pathSegment = new Actor({
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2,
        width: Math.abs(end.x - start.x) || 40,
        height: Math.abs(end.y - start.y) || 40,
        color: Color.Gray,
        opacity: 1,
        // z: 9999999999,
      });

      this.add(pathSegment);
      //   this.engine.add(pathSegment);
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
    const isTower = Object.values(TOWER_TYPES_MAP).find(t => t === pos);
    return this.actors.find(actor => {
      return isTower && actor.pos.equals(pos);
    });
  }

  public highlightCell(pos: Vector) {
    const gridPos = this.getGridPosition(pos);
    const col = Math.floor(gridPos.x / GAME_CONFIG.gridSize);
    const row = Math.floor(gridPos.y / GAME_CONFIG.gridSize);
    const { selectedTower } = useLevelStore.getState();

    if (row >= 0 && row < this.grid.length && col >= 0 && col < this.grid[0].length && selectedTower) {
      const engine = this.engine as GameEngine;
      const gameManager = GameManager.getInstance(engine);

      if (this.isAlreadyUsed(gridPos) || gameManager.isOnPath(gridPos)) {
        this.hoverCell = new Actor({
          x: gridPos.x,
          y: gridPos.y,
          width: GAME_CONFIG.gridSize,
          height: GAME_CONFIG.gridSize,
          color: Color.Red,
          opacity: 0.3,
        });
        this.add(this.hoverCell);
      } else {
        this.hoverCell = new Actor({
          x: gridPos.x,
          y: gridPos.y,
          width: GAME_CONFIG.gridSize,
          height: GAME_CONFIG.gridSize,
          color: Color.Green,
          opacity: 0.3,
        });
      }
      this.add(this.hoverCell);
    }
  }

  public resetGridHighlight() {
    if (this.hoverCell) {
      this.remove(this.hoverCell);
      // this.engine.remove(this.hoverCell);
      this.hoverCell = null;
    }
  }
}
