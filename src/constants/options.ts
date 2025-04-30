import { GameScene } from '#/scenes/GameScene';
import { MainMenu } from '#/scenes/MainMenu';
import { DisplayMode, FadeInOut, Color } from 'excalibur';
import GAME_CONFIG from './config';

const GAME_OPTIONS = {
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
          color: Color.Pink,
        }),
        out: new FadeInOut({
          duration: 500,
          direction: 'out',
          color: Color.Green,
        }),
      },
    },
  },
};

export default GAME_OPTIONS;
