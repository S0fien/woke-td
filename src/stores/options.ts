import { GameOptions } from '#/types/game.ts';

export const gameOptionsStore: GameOptions = {
  gameStarted: false,
  musicRunning: true,
  musicVolume: 0.2,
  isInitialized: false,
  resources: null,
  username: '',
  levelCompleted: [],
};
