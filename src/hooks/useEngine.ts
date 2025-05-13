import { GameManager } from '#/services/GameManager';
import { useEffect, useState } from 'react';
import { GameEngine } from '#/services/GameEngine';

export const useEngine = () => {
  const [engine, setEngine] = useState<GameEngine | null>(null);
  const [gameManager, setGameManager] = useState<GameManager | null>(null);

  useEffect(() => {
    // Ensure container element exists
    let container = document.getElementById('container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'container';
      document.body.appendChild(container);
    }

    // Get the engine instance outside of render
    const engineInstance = GameEngine.getInstance();
    setEngine(engineInstance);

    engineInstance.initializeUI();
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
