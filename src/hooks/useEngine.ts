import GAME_CONFIG from '#/constants/config.ts';
import { GameEngine } from '#/services/GameEngine.ts';
import { useEffect, useState } from 'react';

export const useEngine = () => {
  const [engine, setEngine] = useState<GameEngine>();

  useEffect(() => {
    const initializeEngine = async () => {
      let container = document.getElementById(GAME_CONFIG.containerId);
      if (!container || !GameEngine) {
        return;
      }

      const engineInstance = GameEngine.getInstance();
      if (engineInstance) {
        setEngine(engineInstance);
        await engineInstance.initializeUI();
      }
    };

    initializeEngine();
  }, []);

  return { engine };
};
