import { useEffect, useRef, useState } from 'react';
import { GAME_CONFIG, TOWER_TYPES } from './config/gameConfig';
import { GameManager } from './services/GameManager';
import { loader, Resources } from './resources';
import { GameScene } from './scenes/GameScene';
import { GameState } from './types/game';
import './styles/TowerDefenseGame.css';

import * as React from 'react';
import { Engine } from 'excalibur';
import { MainMenu } from './scenes/MainMenu';
import { GameMenu } from './scenes/GameMenu';
export const TowerDefenseGame: React.FC = () => {
  const [engine, setEngine] = useState<Engine | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    money: GAME_CONFIG.initialMoney,
    lives: GAME_CONFIG.initialLives,
    wave: 0,
    gameStarted: false,
    gameOver: false,
    victory: false,
    selectedTower: null,
  });

  const gameManager = new GameManager(engine, () => setGameState(prev => ({ ...prev })));

  const startGame = () => {

    const engine = new Engine({
      canvasElementId: 'game2',
      
      // physics: {
      //   enabled: false,
      // },
      pixelArt: true,
      width: GAME_CONFIG.width,
      height: GAME_CONFIG.height,
      backgroundColor: GAME_CONFIG.backgroundColor,
      scenes: {
        mainMenu: MainMenu,
        gameMenu: GameMenu,
        gameScene: GameScene,
      },
    });
    setEngine(engine);
    const gameManager = new GameManager(engine, () => setGameState(prev => ({ ...prev })));

    // Handle clicking on the game area to place towers

    engine.start(loader).then(async () => {
      // const truc = await loader.areResourcesLoaded();
      // console.log('engine started', truc);
      // engine.goToScene('gameScene');
      // engine.addScene('game', gameScene
      // Resources.Fusion[0].addToScene(engine.currentScene)

      await engine.goToScene('gameScene');
      gameManager.startGame();
      setGameStarted(true);
    });
  };
  useEffect(() => {
    if (gameState.selectedTower && gameManager) {
        gameManager.setSelectedTower(gameState.selectedTower);
    }
  }, [gameState.selectedTower]);

  useEffect(() => {
    if (gameStarted && gameManager) {
      const interval = setInterval(() => {
        setGameState(gameManager.getState());
      }, 100);

      return () => {
        clearInterval(interval);
        gameManager.cleanup();
      };
    }
  }, [gameStarted]);

  return (
    <div className="game-container">
      <h1>Tower Defense Game <img src={Resources.Dude[0].image.src} alt="dude" /> </h1>

      <canvas
        id="game2"
        width={GAME_CONFIG.width}
        height={GAME_CONFIG.height}
      ></canvas>

      {!gameStarted ? (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      ) : (
        <div className="game-interface">
          <div className="game-info">
            <div>Money: ${gameState.money}</div>
            <div>Lives: {gameState.lives}</div>
            <div>
              Wave: {gameState.wave}/{GAME_CONFIG.maxWaves}
            </div>
          </div>

          <div className="tower-selection">
            <h3>Select Tower</h3>
            <div className="tower-options">
              {TOWER_TYPES.map(tower => (
                <button
                  key={tower.type}
                  className={`tower-button ${gameState.selectedTower === tower.type ? 'selected' : ''}`}
                  onClick={() => setGameState(prev => ({ ...prev, selectedTower: tower.type }))}
                  disabled={gameState.money < tower.cost}
                >
                  {tower.type} (${tower.cost})
                </button>
              ))}
            </div>
          </div>
          <div>old canvas</div>

          {gameState.gameOver && (
            <div className="game-over-overlay">
              <h2>Game Over</h2>
              <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
          )}

          {gameState.victory && (
            <div className="victory-overlay">
              <h2>Victory!</h2>
              <p>You've completed all {GAME_CONFIG.maxWaves} waves!</p>
              <button onClick={() => window.location.reload()}>Play Again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
