import { LevelState } from '../types/game.ts';

export const levelStore: LevelState = {
  money: 0,
  lives: 0,
  wave: 0,
  gameOver: false,
  victory: false,
  selectedTower: null,
  levelKey: '',
  towers: null,
};
