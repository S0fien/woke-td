import { Actor, Color, Scene, Vector } from 'excalibur';
import { GAME_CONFIG } from '../config/gameConfig';
import { Dude } from '../entities/Dude';

export class GameScene extends Scene {
  public pathPoints: Vector[] = [];
  private grid: Actor[][] = [];
  private hoverCell: Actor | null = null;

  constructor() {
    super();
  }

  // onPostUpdate(engine: Engine, elapsed: number): void {
  //     // console.log('postupdate', elapsed);
  //     // this.gameManager.update(elapsed);
  // }

  onInitialize() {
    // this.add(new ProjectileEntity(new Vector(100, 100), new Vector(100, 100), 100));
    this.pathPoints = GAME_CONFIG.pathPoints.map(point => new Vector(point.x, point.y));
    this.createGrid();
    this.createPath();
    this.add(new Dude(100));
    // Resources.Fusion[0].addToScene(this);
    // this.add(new TowerEntity(new Vector(100, 100), TOWER_TYPES.find(t => t.type === 'basic')!));
  }

  private createGrid() {
    const cols = Math.floor(GAME_CONFIG.width / GAME_CONFIG.gridSize);
    const rows = Math.floor(GAME_CONFIG.height / GAME_CONFIG.gridSize);

    for (let row = 0; row < rows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < cols; col++) {
        const cell = new Actor({
          x: col * GAME_CONFIG.gridSize + GAME_CONFIG.gridSize / 2,
          y: row * GAME_CONFIG.gridSize + GAME_CONFIG.gridSize / 2,
          width: GAME_CONFIG.gridSize,
          height: GAME_CONFIG.gridSize,
          color: new Color(0, 0, 0, 0.2), // Semi-transparent black
        });
        this.grid[row][col] = cell;
        this.add(cell);
        this.engine.add(cell);
      }
    }
  }

  private createPath() {
    for (let i = 0; i < this.pathPoints.length - 1; i++) {
      const start = this.pathPoints[i];
      const end = this.pathPoints[i + 1];
      const pathSegment = new Actor({
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2,
        width: Math.abs(end.x - start.x) || 40,
        height: Math.abs(end.y - start.y) || 40,
        color: Color.Gray,
      });

      this.add(pathSegment);
      this.engine.add(pathSegment);
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

  public highlightCell(pos: Vector) {
    const gridPos = this.getGridPosition(pos);
    const col = Math.floor(gridPos.x / GAME_CONFIG.gridSize);
    const row = Math.floor(gridPos.y / GAME_CONFIG.gridSize);
    
    if (row >= 0 && row < this.grid.length && col >= 0 && col < this.grid[0].length) {
      // Remove previous hover cell if it exists
      if (this.hoverCell) {
        this.remove(this.hoverCell);
      }

      // Create new hover cell
      this.hoverCell = new Actor({
        x: gridPos.x,
        y: gridPos.y,
        width: GAME_CONFIG.gridSize,
        height: GAME_CONFIG.gridSize,
        color: new Color(255, 255, 255, 0.3),
      });
      this.add(this.hoverCell);
      this.engine.add(this.hoverCell);
    }
  }

  public resetGridHighlight() {
    if (this.hoverCell) {
      this.remove(this.hoverCell);
      this.engine.remove(this.hoverCell);
      this.hoverCell = null;
    }
  }
}
