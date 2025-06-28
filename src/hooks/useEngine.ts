import GAME_CONFIG from '#/constants/config.ts';
import { GameEngine } from '#/services/GameEngine.tsx';
import { useEffect, useState } from 'react';

export const useEngine = () => {
  console.log('hello');
  const [engine, setEngine] = useState<GameEngine>();

  useEffect(() => {
    console.log('first');
    const initializeEngine = async () => {
      // Ensure container element exists
      let container = document.getElementById(GAME_CONFIG.containerId);
      console.log('container is', container, GameEngine);
      if (!container || !GameEngine) {
        return;
      }

      // Get the engine instance outside of render
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
