import GAME_CONFIG from '#/constants/config.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';

import { MAIN_RESOURCES, SCENE_RESOURCES } from '#/constants/resources.ts';
import { Shroom } from '#/entities/Shroom.ts';
import type { GameEngine } from '#/services/GameEngine.tsx';
import { GameManager } from '#/services/GameManager.tsx';
import { Transition } from 'excalibur';
import { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { GameScene } from './GameScene.tsx';
import { Level } from './Level.ts';

let ex: typeof import('excalibur');
const Bar = lazy(() => import('#/ui/components/containers/bar.tsx'));

export class FinalScene extends Level {
  static instance: GameScene | null = null;
  private uiRoot: ReturnType<typeof createRoot> | null = null;

  constructor() {
    super(SCENE_RESOURCES.maps.last, Shroom);
  }

  public static getInstance() {
    if (!GameScene.instance) {
      GameScene.instance = new GameScene();
    }
    return GameScene.instance;
  }

  override async onInitialize() {
    super.onInitialize();
    ex = await import('excalibur');
  }

  override async onActivate(context: ex.SceneActivationContext): Promise<void> {
    super.onActivate(context); // Call Level's onActivate
    const test = new ex.Actor();

    MAIN_RESOURCES.musics.happy.loop = true;
    MAIN_RESOURCES.musics.happy.play(useGameOptionsStore.getState().musicVolume);

    SCENE_RESOURCES.maps.last.addToScene(this);

    test.graphics.anchor = new ex.Vector(0, 0);
    test.pos = new ex.Vector(0, 0);
    this.add(test);
    this.createGrid();
    this.createPath();
    const gameManager = GameManager.getInstance(context.engine as GameEngine);
    gameManager.startGame();
    // Add Excalibur label
    // Create a container for React UI
    const uiContainer = document.createElement('div');
    uiContainer.id = 'scene-interface';
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

  override onTransition(direction: 'in' | 'out'): Transition | undefined {
    void direction;
    MAIN_RESOURCES.musics.happy.stop();
    // Clean up React root when scene is deactivated
    if (this.uiRoot) {
      this.uiRoot.unmount();
      const container = document.getElementById(GAME_CONFIG.containerId);
      const sceneContainer = document.getElementById('scene-interface');
      if (sceneContainer) container?.removeChild(sceneContainer);
    }
    this.clear();
    return undefined;
  }
}
