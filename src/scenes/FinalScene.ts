import { MAIN_RESOURCES, SCENE_RESOURCES } from '#/constants/resources.ts';
import { Dude } from '#/entities/Dude.ts';
import { Level } from './Level.ts';

export class FinalScene extends Level {
  static instance: FinalScene | null = null;

  constructor() {
    super(SCENE_RESOURCES.maps.last, Dude, MAIN_RESOURCES.musics.happy);
  }
}
