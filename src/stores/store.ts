import GAME_CONFIG from '../constants/config';
import { TowerTypes } from '../types/game';

export interface GameState {
  money: number;
  lives: number;
  wave: number;
  gameStarted: boolean;
  gameOver: boolean;
  victory: boolean;
  selectedTower: TowerTypes | null;
  musicRunning: boolean;
}

export const initialStore: GameState = {
  money: GAME_CONFIG.initialMoney,
  lives: GAME_CONFIG.initialLives,
  wave: 0,
  gameStarted: false,
  gameOver: false,
  victory: false,
  selectedTower: null,
  musicRunning: true,
};
