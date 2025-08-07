import { Level } from './Level.ts';

export class DemoScene extends Level {
  static instance: DemoScene | null = null;

  constructor() {
    super();
  }
}
