import GAME_OPTIONS from '#/constants/options.ts';
import RESOURCES from '#/constants/resources.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import { Color, Engine, Loader } from 'excalibur';
import { createRoot } from 'react-dom/client';
import { Level } from '../scenes/Level.ts';
import { GameManager } from './GameManager.tsx';

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
    useGameOptionsStore.getState().setState({
      isInitialized: false,
    });
  }

  public static getInstance(): GameEngine | null {
    try {
      if (!GameEngine.instance) {
        GameEngine.instance = new GameEngine();
      }
    } catch (err) {
      console.debug('Engine does not exist.', err);
    }
    return GameEngine.instance;
  }

  public initializeUI(): void {
    if (!this.isRunning()) {
      this.run();
    }
  }

  public run() {
    if (this.isRunning()) {
      console.log('is already running');
      return;
    }
    loader.backgroundColor = Color.Black.toString();
    // loader.logo = './favicon.png';

    loader.startButtonFactory = () => {
      let myButton = document.createElement('button');
      myButton.textContent = 'Defend';
      return myButton;
    };
    this.start(loader).then(async () => {
      useGameOptionsStore.getState().setState({
        isInitialized: true,
      });
      useLevelStore.getState().resetGame();
      await this.goToScene('mainMenu');
    });
  }
}
