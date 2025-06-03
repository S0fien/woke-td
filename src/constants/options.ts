import { GameScene } from '#/scenes/GameScene.tsx';
import { MainMenu } from '#/scenes/MainMenu.tsx';
import { Color, DisplayMode, EngineOptions, FadeInOut } from 'excalibur';
import GAME_CONFIG from './config.ts';

const GAME_OPTIONS: EngineOptions = {
  // suppressPlayButton: true,
  canvasElementId: 'game',
  // suppressHiDPIScaling: true,

  displayMode: DisplayMode.Fixed, // the display mode
  width: Math.min(1280, GAME_CONFIG.width),
  height: Math.min(960, GAME_CONFIG.height),
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
