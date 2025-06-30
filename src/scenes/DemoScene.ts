import GAME_CONFIG from '#/constants/config.ts';
import { MAIN_RESOURCES, SCENE_RESOURCES } from '#/constants/resources.ts';
import { Dog } from '#/entities/Dog.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import type { GameEngine } from '#/services/GameEngine.ts';
import { GameManager } from '#/services/GameManager.ts';
import Bar from '#/ui/components/containers/bar.tsx';
import { Transition } from 'excalibur';
import { createRoot } from 'react-dom/client';
import { Level } from './Level.ts';

let ex: typeof import('excalibur');

export class DemoScene extends Level {
  static instance: DemoScene | null = null;
  private uiRoot: ReturnType<typeof createRoot> | null = null;

  constructor() {
    super(SCENE_RESOURCES.maps.tiled, Dog);
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

  override async onInitialize() {
    super.onInitialize();
    ex = await import('excalibur');
  }

  override onActivate(context: ex.SceneActivationContext): void {
    super.onActivate(context); // Call Level's onActivate
    // this.pathPoints = DemoPathPoints.map(point => new Vector(point.x, point.y));

    const test = new ex.Actor();

    MAIN_RESOURCES.musics.happy.loop = true;
    MAIN_RESOURCES.musics.happy.play(useGameOptionsStore.getState().musicVolume);

    SCENE_RESOURCES.maps.tiled.addToScene(this);

    // test.graphics.add(map);
    test.graphics.anchor = new ex.Vector(0, 0);
    test.pos = new ex.Vector(0, 0);
    this.add(test);

    this.createGrid();
    this.createPath();
    const gameManager = GameManager.getInstance(context.engine as GameEngine);
    gameManager.startGame();
    // Add Excalibur label
    // Create a container for React UI
    this.createSceneUI(GAME_CONFIG.containerId, 'scene-interface', Bar());
  }

  override onTransition(direction: 'in' | 'out'): Transition | undefined {
    void direction;
    MAIN_RESOURCES.musics.happy.stop();
    // Clean up React root when scene is deactivated
    if (this.uiRoot) {
      this.uiRoot.unmount();
      const container = document.getElementById(GAME_CONFIG.containerId);
      if (container && container.lastChild && container.lastElementChild?.id !== 'ui-container') {
        container.removeChild(container.lastChild);
      }
    }
    this.clear();
    return undefined;
  }
}
