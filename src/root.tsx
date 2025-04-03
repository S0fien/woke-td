import { Engine } from 'excalibur';
import * as React from 'react';
import { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { TowerDefenseGame } from './TowerDefenseGame';
import { GAME_CONFIG } from './config/gameConfig';
import { GameScene } from './scenes/GameScene';
import { MainMenu } from './scenes/MainMenu';
const engine = new Engine({
  canvasElementId: 'game',
  width: GAME_CONFIG.width,
  height: GAME_CONFIG.height,
  
  backgroundColor: GAME_CONFIG.backgroundColor,
  scenes: {
    mainMenu: MainMenu,
    // game: GameScene,
    gameScene: GameScene,
  },
});


export const ExcaliburContext = createContext(engine);    
const domNode = document.getElementById('container');

if (domNode) {
  console.log('domNode', domNode);
  const root = createRoot(domNode);
  root.render(
    <React.StrictMode>
      {/* <ExcaliburContext.Provider value={engine}> */}
        <TowerDefenseGame />
      {/* </ExcaliburContext.Provider> */}
    </React.StrictMode>
  );
}
