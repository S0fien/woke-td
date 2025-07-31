import { MAIN_RESOURCES, SCENE_RESOURCES } from '#/constants/resources.ts';
import { Dude } from '#/entities/Dude.ts';
import { Level } from './Level.ts';

export class GameScene extends Level {
  static instance: GameScene | null = null;

  constructor() {
    super(SCENE_RESOURCES.maps.second, Dude, MAIN_RESOURCES.musics.happy);
  }
}
