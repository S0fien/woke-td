import { DemoScene } from '#/scenes/DemoScene.ts';
import { FinalScene } from '#/scenes/FinalScene.ts';
import { GameScene } from '#/scenes/GameScene.ts';
import { MainMenu } from '#/scenes/MainMenu.ts';
import { Color, DisplayMode, EngineOptions, FadeInOut } from 'excalibur';
import GAME_CONFIG from './config.ts';

const GAME_OPTIONS: EngineOptions = {
  // suppressPlayButton: true,
  canvasElementId: 'game',
  // suppressHiDPIScaling: true,

  displayMode: DisplayMode.FillContainer, // the display mode
  width: GAME_CONFIG.width,
  backgroundColor: Color.fromHex(GAME_CONFIG.background), // the background color
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
    finalScene: {
      scene: FinalScene,
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
