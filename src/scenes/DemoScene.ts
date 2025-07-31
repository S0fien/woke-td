import { MAIN_RESOURCES, SCENE_RESOURCES } from '#/constants/resources.ts';
import { Dog } from '#/entities/Dog.ts';
import { Level } from './Level.ts';

export class DemoScene extends Level {
  static instance: DemoScene | null = null;

  constructor() {
    super(SCENE_RESOURCES.maps.tiled, Dog, MAIN_RESOURCES.musics.happy);
  }
}
