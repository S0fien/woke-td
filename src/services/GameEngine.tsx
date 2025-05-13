import { GameManager } from './GameManager';
import { Engine, Loader } from 'excalibur';
import { Level } from '../scenes/Level';
import { createRoot } from 'react-dom/client';
import RESOURCES from '#/constants/resources';
import GAME_OPTIONS from '#/constants/options';

export const loader = new Loader();
Object.values(RESOURCES).forEach(r => {
  Object.values(r).forEach(resource => {
    loader.addResource(resource);
  });
});

export class GameEngine extends Engine {
  gameManager: GameManager | null = null;
  static uiRoot: ReturnType<typeof createRoot> | null = null;

  get currentScene(): Level {
    return super.currentScene as Level;
  }

  private static instance: GameEngine | null = null;

  private constructor() {
    super(GAME_OPTIONS);
  }

  public static getInstance(): GameEngine {
    if (!GameEngine.instance) {
      GameEngine.instance = new GameEngine();
    }
    return GameEngine.instance;
  }

  public initializeUI(): void {
    if (!this.isRunning()) {
      this.run();
    }
    // if (!this.isRunning() && !this.canvasCreated) {
    //   console.log('Creating canvas element');

    //   // Create the canvas element
    //   const container = document.getElementById('container');
    //   if (container) {
    //     const canvasElement = document.createElement('canvas');
    //     canvasElement.id = 'game';
    //     container.appendChild(canvasElement);
    //     this.canvasCreated = true;

    //     // Set the canvas element ID for the engine
    //     this.canvasElementId = 'game123';

    //     // Run the engine after the canvas is created
    //     this.run();
    //   } else {
    //     console.error('Container element not found');
    //   }
    // }
  }

  public run() {
    if (this.isRunning()) {
      console.log('is already running');
      return;
    }
    this.start(loader).then(async () => {
      await this.goToScene('mainMenu');
    });
  }
}
