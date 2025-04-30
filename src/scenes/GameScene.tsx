import { Actor, Vector } from 'excalibur';
import GAME_CONFIG from '../constants/config';
import { GameEngine } from '../services/GameEngine';
import { GameManager } from '../services/GameManager';
import { Level } from './Level';
import RESOURCES from '../constants/resources';
import { createRoot } from 'react-dom/client';
import Bar from '../components/bar';

export class GameScene extends Level {
  static instance: GameScene | null = null;
  private uiRoot: ReturnType<typeof createRoot> | null = null;

  constructor() {
    super();
  }

  public static getInstance() {
    if (!GameScene.instance) {
      GameScene.instance = new GameScene();
    }
    return GameScene.instance;
  }

  // onPostUpdate(engine: Engine, elapsed: number): void {
  //     // console.log('postupdate', elapsed);
  //     // this.gameManager.update(elapsed);
  // }

  override onInitialize(engine: GameEngine) {
    console.log('GameScene onInitialize');

    this.pathPoints = GAME_CONFIG.pathPoints.map(point => new Vector(point.x, point.y));
    // this.add(new Dude(100));

    const test = new Actor();
    // test.graphics.anchor = new Vector(0, 0);

    RESOURCES.musics.main.loop = true;
    RESOURCES.musics.main.play();

    const map = RESOURCES.maps.begin.toSprite();
    // RESOURCES.Fusion[0]. addToScene(th\is)\\\;
    // map.width = GAME_CONFIG.width;
    // map.height = GAME_CONFIG.height;
    map.scale = new Vector(1, 1);
    // const imgWidth = map.width;
    // const mapHeight = map.height;
    // const screenWidth = engine.screen.width;
    // const rest =  imgWidth - screenWidth;
    // map.width = screenWidth;
    // map.height =  mapHeight - (rest / 2);

    test.graphics.add(map);
    test.pos = new Vector(engine.screen.width / 2, engine.screen.height / 2);
    this.add(test);

    this.createGrid();
    this.createPath();

    const gameManager = GameManager.getInstance(engine);
    gameManager.startGame();
    console.log('MainMenu onInitialize', engine);
    // Add Excalibur label
    // Create a container for React UI
    const uiContainer = document.createElement('div');
    uiContainer.style.position = 'absolute';
    uiContainer.style.bottom = '5px';
    uiContainer.style.left = '25%';
    uiContainer.style.display = 'flex';
    uiContainer.style.flexDirection = 'row';
    uiContainer.style.justifyContent = 'space-around';
    uiContainer.style.pointerEvents = 'all'; // This allows clicking through to the game

    // Add the container to the document
    // document.body.appendChild(uiContainer);
    const container = document.getElementById('game-interface');
    if (container) {
      container.appendChild(uiContainer);
    }

    // Create React root and render UI
    this.uiRoot = createRoot(uiContainer);
    this.uiRoot.render(<Bar />);
  }

  onDeactivate() {
    console.log('deactivating');
    RESOURCES.musics.main.stop();
    // Clean up React root when scene is deactivated
    if (this.uiRoot) {
      this.uiRoot.unmount();
      const container = document.getElementById('container');
      if (container && container.lastChild) {
        container.removeChild(container.lastChild);
      }
    }
  }
}
