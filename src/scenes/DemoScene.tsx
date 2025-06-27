import RESOURCES from '#/constants/resources.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import { Actor, SceneActivationContext, Vector } from 'excalibur';

import GAME_CONFIG from '#/constants/config.ts';
import type { GameEngine } from '#/services/GameEngine.tsx';
import { GameManager } from '#/services/GameManager.tsx';
import Bar from '#/ui/components/containers/bar.tsx';
import { createRoot } from 'react-dom/client';
import { Level } from './Level.ts';

// Types are erased at compile time and do not exist at runtime.
// Just import the type directly:

export class DemoScene extends Level {
  static instance: DemoScene | null = null;
  private uiRoot: ReturnType<typeof createRoot> | null = null;

  constructor() {
    super(RESOURCES.maps.tiled);
  }

  public static getInstance() {
    if (!DemoScene.instance) {
      DemoScene.instance = new DemoScene();
    }
    return DemoScene.instance;
  }

  // onPostUpdate(engine: Engine, elapsed: number): void {
  //     // console.log('postupdate', elapsed);
  //     // this.gameManager.update(elapsed);
  // }

  // override onInitialize(engine: GameEngine) {

  // }
  override onActivate(context: SceneActivationContext): void {
    super.onActivate(context); // Call Level's onActivate
    // this.pathPoints = DemoPathPoints.map(point => new Vector(point.x, point.y));

    const test = new Actor();

    RESOURCES.musics.happy.loop = true;
    RESOURCES.musics.happy.play(useGameOptionsStore.getState().musicVolume);

    RESOURCES.maps.tiled.addToScene(this);

    // test.graphics.add(map);
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
    uiContainer.id = 'demo-interface';
    uiContainer.classList = 'absolute bottom-0 w-full flex justify-center items-end';
    uiContainer.style.pointerEvents = 'all'; // This allows clicking through to the game

    // Add the container to the document
    const container = document.getElementById(GAME_CONFIG.containerId);
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
      const container = document.getElementById(GAME_CONFIG.containerId);
      if (container && container.lastChild && container.lastElementChild?.id !== 'ui-container') {
        container.removeChild(container.lastChild);
      }
    }
    this.clear();
  }
}
