import GAME_OPTIONS from '#/constants/options.ts';
import RESOURCES from '#/constants/resources.ts';
import { GameStatus } from '#/ui/components/containers/game-status.tsx';
import { Color, Engine, Loader } from 'excalibur';
import { createRoot } from 'react-dom/client';
import { Level } from '../scenes/Level.ts';
import { GameManager } from './GameManager.ts';

export const loader = new Loader({});
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

  public static getInstance(): GameEngine | null {
    try {
      if (!GameEngine.instance) {
        GameEngine.instance = new GameEngine();
      }
    } catch {
      console.debug('Engine does not exist.');
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
    loader.backgroundColor = Color.Black.toString();
    loader.logo = './favicon.png';
    loader.logoPosition?.normal;
    loader.logoWidth = 300;
    const lol = loader.startButtonFactory();
    lol.innerText = 'Start Game222';
    loader.playButtonText = 'Defend';

    this.start(loader).then(async () => {
      console.log('go to scene');
      await this.goToScene('mainMenu');
      const container = document.createElement('div');
      container.className = 'z-99 absolute bottom-0 right-0 flex justify-end items-end pointer-all';
      container.style.pointerEvents = 'all'; // This allows clicking through to the game
      container.id = 'game-status-container';

      // 2. Append the container to the desired parent
      document.getElementById('game-root')?.appendChild(container);
      if (container) {
        GameEngine.uiRoot = createRoot(container);
        GameEngine.uiRoot.render(<GameStatus />);
      }
    });
  }
}
