import { Level } from './Level.ts';

export class GameScene extends Level {
  static instance: GameScene | null = null;

  constructor() {
    super();
  }
}
