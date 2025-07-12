import { GameEngine } from '#/services/GameEngine.ts';
import { useEffect, useState } from 'react';

export const useEngine = () => {
  const [engine, setEngine] = useState<GameEngine>();

  useEffect(() => {
    const initializeEngine = async () => {
      console.log('ici');
      let container = document.getElementById('game-root');
      console.log('container', container);
      if (!container || !GameEngine) {
        return;
      }

      const engineInstance = GameEngine.getInstance();
      console.log('engine', engineInstance);
      if (engineInstance) {
        setEngine(engineInstance);
        await engineInstance.initializeUI();
      }
    };

    initializeEngine();
  }, []);

  return { engine };
};
