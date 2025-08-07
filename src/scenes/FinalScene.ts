import { Level } from './Level.ts';

export class FinalScene extends Level {
  static instance: FinalScene | null = null;

  constructor() {
    super();
  }
}
