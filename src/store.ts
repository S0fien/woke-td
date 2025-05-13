import { GAME_CONFIG } from './config/gameConfig';
import { TowerTypes } from './types/game';

export interface GameState {
  money: number;
  lives: number;
  wave: number;
  gameStarted: boolean;
  gameOver: boolean;
  victory: boolean;
  selectedTower: TowerTypes | null;
}

export const initialStore: GameState = {
  money: GAME_CONFIG.initialMoney,
  lives: GAME_CONFIG.initialLives,
  wave: 0,
  gameStarted: false,
  gameOver: false,
  victory: false,
  selectedTower: null,
  //   magasinName
};
