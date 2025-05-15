import GAME_CONFIG from '../constants/config.ts';
import { LevelState } from '../types/game.ts';

export const levelStore: LevelState = {
  money: GAME_CONFIG.initialMoney,
  lives: GAME_CONFIG.initialLives,
  wave: 0,
  gameOver: false,
  victory: false,
  selectedTower: null,
};
