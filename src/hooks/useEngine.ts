import { GameEngine } from '#/services/GameEngine.ts';
import { useEffect, useState } from 'react';

export const useEngine = () => {
  const [engine, setEngine] = useState<GameEngine>();

  useEffect(() => {
    const initializeEngine = async () => {
      let container = document.getElementById('game-root');
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
