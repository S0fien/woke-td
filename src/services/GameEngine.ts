import GAME_OPTIONS from '#/constants/options.ts';
import { MAIN_RESOURCES } from '#/constants/resources.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import { DefaultLoader, Engine, GoToOptions, Scene } from 'excalibur';
import { createRoot } from 'react-dom/client';
import { Level } from '../scenes/Level.ts';
import { CustomLoader } from './CustomLoader.ts';
import { GameManager } from './GameManager.ts';

export class GameEngine extends Engine {
  gameManager: GameManager | null = null;
  static uiRoot: ReturnType<typeof createRoot> | null = null;
  loader: DefaultLoader;

  get currentScene(): Level {
    return super.currentScene as Level;
  }

  private static instance: GameEngine | null = null;

  private constructor() {
    super(GAME_OPTIONS);
    this.loader = new CustomLoader();

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

  public async initializeUI(): Promise<void> {
    if (!this.isRunning()) {
      await this.run();
    }
  }

  override async goToScene<TData = undefined>(
    destinationScene: Scene<TData> | string,
    options?: GoToOptions<TData> | undefined
  ): Promise<void> {
    await super.goToScene(destinationScene, options);
  }

  public async run() {
    if (this.isRunning()) {
      console.log('is already running');
      return;
    }

    Object.values(MAIN_RESOURCES).forEach(r => {
      Object.values(r).forEach(resource => {
        this.loader.addResource(resource);
      });
    });

    this.start(this.loader).then(async () => {
      useGameOptionsStore.getState().setState({
        isInitialized: true,
      });
      useLevelStore.getState().resetGame();
      await this.goToScene('mainMenu');
    });
  }
}
