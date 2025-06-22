import { Color, DisplayMode, EngineOptions, FadeInOut } from 'excalibur';
import GAME_CONFIG from './config.ts';

const { DemoScene } = await import('#/scenes/DemoScene.tsx');
const { GameScene } = await import('#/scenes/GameScene.tsx');
const { MainMenu } = await import('#/scenes/MainMenu.tsx');

const GAME_OPTIONS: EngineOptions = {
  // suppressPlayButton: true,
  canvasElementId: 'game',
  // suppressHiDPIScaling: true,

  displayMode: DisplayMode.FillContainer, // the display mode
  width: GAME_CONFIG.width,
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
    demoScene: {
      scene: DemoScene,
      transitions: {
        in: new FadeInOut({
          duration: 1500,
          direction: 'in',
          color: Color.Black,
        }),
        out: new FadeInOut({
          duration: 1500,
          direction: 'out',
          color: Color.Black,
        }),
      },
    },
  },
};

export default GAME_OPTIONS;
