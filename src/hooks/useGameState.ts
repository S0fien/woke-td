import { useEffect, useState } from "react";
import { GAME_CONFIG } from "../config/gameConfig";
import { GameManager } from "../services/GameManager";

const initialState = {
    money: GAME_CONFIG.initialMoney,
    lives: GAME_CONFIG.initialLives,
    wave: 0,
    gameStarted: false,
    gameOver: false,
    victory: false,
    selectedTower: null,
  }
  

export const useGameState = ({gameManager}: {gameManager: GameManager}) => {
    const [state, setState] = useState(initialState )

            useEffect(() => {
            if (state.selectedTower && gameManager) {
            gameManager.setSelectedTower(state.selectedTower);
            }
        }, [state.selectedTower]);

        useEffect(() => {
            if (state.gameStarted) {
            const interval = setInterval(() => {
                setState(gameManager.getState());
            }, 100);

            return () => {
                clearInterval(interval);
                gameManager?.cleanup();
            };
            }
        }, [state.gameStarted]);
}