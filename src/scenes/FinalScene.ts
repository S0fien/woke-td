import { MAIN_RESOURCES, SCENE_RESOURCES } from '#/constants/resources.ts';
import { Dog } from '#/entities/Dog.ts';
import { Level } from './Level.ts';

export class FinalScene extends Level {
  static instance: FinalScene | null = null;

  constructor() {
    super(SCENE_RESOURCES.maps.last, Dog, MAIN_RESOURCES.musics.happy);
  }
}
