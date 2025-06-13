import GAME_CONFIG from '#/constants/config.ts';
import RESOURCES from '#/constants/resources.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import { GameEngine } from '#/services/GameEngine.tsx';
import { GameManager } from '#/services/GameManager.ts';
import Bar from '#/ui/components/containers/bar.tsx';
import { Actor, SceneActivationContext, Vector } from 'excalibur';

import { createRoot } from 'react-dom/client';
import { Level } from './Level.ts';

export class GameScene extends Level {
  static instance: GameScene | null = null;
  private uiRoot: ReturnType<typeof createRoot> | null = null;

  constructor() {
    super();
  }

  public static getInstance() {
    if (!GameScene.instance) {
      GameScene.instance = new GameScene();
    }
    return GameScene.instance;
  }

  // onPostUpdate(engine: Engine, elapsed: number): void {
  //     // console.log('postupdate', elapsed);
  //     // this.gameManager.update(elapsed);
  // }

  // override onInitialize(engine: GameEngine) {

  // }
  override onActivate(context: SceneActivationContext): void {
    this.pathPoints = GAME_CONFIG.pathPoints.map(point => new Vector(point.x, point.y));
    // this.add(new Dude(100));

    const test = new Actor();
    // test.graphics.anchor = new Vector(0, 0);

    RESOURCES.musics.happy.loop = true;
    RESOURCES.musics.happy.play(useGameOptionsStore.getState().musicVolume);

    const map = RESOURCES.maps.simple.toSprite();
    map.width = 1264;
    map.height = 960;
    map.scale = new Vector(1, 1);

    test.graphics.add(map);
    test.graphics.anchor = new Vector(0, 0);
    test.pos = new Vector(0, 0);
    this.add(test);

    this.createGrid();
    this.createPath();
    const gameManager = GameManager.getInstance(context.engine as GameEngine);
    gameManager.startGame();
    // Add Excalibur label
    // Create a container for React UI
    const uiContainer = document.createElement('div');
    uiContainer.classList = 'absolute bottom-0 w-full flex justify-center items-end pointer-all';
    uiContainer.style.pointerEvents = 'all'; // This allows clicking through to the game

    // Add the container to the document
    const container = document.getElementById('game-root');
    if (container) {
      container.appendChild(uiContainer);
    }

    // Create React root and render UI
    this.uiRoot = createRoot(uiContainer);
    this.uiRoot.render(<Bar />);
  }

  onDeactivate() {
    RESOURCES.musics.happy.stop();
    // Clean up React root when scene is deactivated
    if (this.uiRoot) {
      this.uiRoot.unmount();
      const container = document.getElementById('container');
      if (container && container.lastChild && container.lastElementChild?.id !== 'game-interface') {
        container.removeChild(container.lastChild);
      }
    }
    this.clear();
  }
}
