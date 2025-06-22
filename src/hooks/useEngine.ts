import GAME_CONFIG from '#/constants/config.ts';
import { GameEngine } from '#/services/GameEngine.tsx';
import { GameManager } from '#/services/GameManager.tsx';
import { useEffect, useState } from 'react';

export const useEngine = () => {
  const [engine, setEngine] = useState<GameEngine>();
  const [gameManager, setGameManager] = useState<GameManager>();

  useEffect(() => {
    // Ensure container element exists
    let container = document.getElementById(GAME_CONFIG.containerId);
    if (!container || !GameEngine) {
      return;
    }

    // Get the engine instance outside of render
    const engineInstance = GameEngine.getInstance();
    if (engineInstance) {
      setEngine(engineInstance);

      engineInstance.initializeUI();
    }

    // Initialize UI after component is mounted
    // engineInstance.on('visible', (event) => {
    //   console.log('initializeUIIIII', event);
    //   engineInstance.initializeUI();
    // })
  }, []);

  useEffect(() => {
    if (engine) {
      const gameManagerInstance = GameManager.getInstance(engine);
      setGameManager(gameManagerInstance);
    }
  }, [engine]);

  return { engine, gameManager };
};
