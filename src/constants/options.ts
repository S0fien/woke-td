import { GameScene } from '#/scenes/GameScene.tsx';
import { MainMenu } from '#/scenes/MainMenu.tsx';
import { DisplayMode, FadeInOut, Color, EngineOptions } from 'excalibur';
import GAME_CONFIG from './config.ts';

const GAME_OPTIONS: EngineOptions = {
  suppressPlayButton: true,
  canvasElementId: 'game',
  suppressHiDPIScaling: true,

  displayMode: DisplayMode.FillScreen, // the display mode  width: GAME_CONFIG.width,
  height: GAME_CONFIG.height,
  backgroundColor: GAME_CONFIG.backgroundColor,
  scenes: {
    mainMenu: {
      scene: MainMenu,
      transitions: {
        in: new FadeInOut({
          duration: 500,
          direction: 'in',
          color: Color.Black,
        }),
        out: new FadeInOut({
          duration: 500,
          direction: 'out',
          color: Color.Black,
        }),
      },
    },
    gameScene: {
      scene: GameScene,
      transitions: {
        in: new FadeInOut({
          duration: 500,
          direction: 'in',
          color: Color.Black,
        }),
        out: new FadeInOut({
          duration: 500,
          direction: 'out',
          color: Color.Black,
        }),
      },
    },
  },
};

export default GAME_OPTIONS;
