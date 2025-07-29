import GAME_CONFIG from '#/constants/config.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';

import { MAIN_RESOURCES, SCENE_RESOURCES } from '#/constants/resources.ts';
import { Dog } from '#/entities/Dog.ts';
import type { GameEngine } from '#/services/GameEngine.ts';
import { GameManager } from '#/services/GameManager.ts';
import Bar from '#/ui/components/containers/bar.tsx';
import { Transition } from 'excalibur';
import { Level } from './Level.ts';

export class FinalScene extends Level {
  static instance: FinalScene | null = null;

  constructor() {
    super(SCENE_RESOURCES.maps.last, Dog);
  }

  public static getInstance() {
    if (!FinalScene.instance) {
      FinalScene.instance = new FinalScene();
    }
    return FinalScene.instance;
  }

  override async onActivate(context: ex.SceneActivationContext): Promise<void> {
    super.onActivate(context);
    MAIN_RESOURCES.musics.happy.loop = true;
    MAIN_RESOURCES.musics.happy.play(useGameOptionsStore.getState().musicVolume);

    SCENE_RESOURCES.maps.last.addToScene(this);

    this.createGrid();
    this.createPath();
    const gameManager = GameManager.getInstance(context.engine as GameEngine);
    gameManager.startGame();

    this.createSceneUI(GAME_CONFIG.containerId, 'scene-interface', Bar());
  }

  override onTransition(direction: 'in' | 'out'): Transition | undefined {
    void direction;
    MAIN_RESOURCES.musics.happy.stop();
    this.cleanupSceneUI(GAME_CONFIG.containerId, 'scene-interface');
    this.clear();
    return undefined;
  }
}
