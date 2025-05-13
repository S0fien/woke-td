import { Actor, Scene, Vector } from 'excalibur';
import { createRoot } from 'react-dom/client';
import { GameEngine } from '../services/GameEngine';
import RESOURCES from '../constants/resources';
import { Menu } from '#/features/menu';
import useGameStore from '#/hooks/useGameStore';

export class MainMenu extends Scene {
  private uiRoot: ReturnType<typeof createRoot> | null = null;

  constructor() {
    super();
  }

  override onInitialize(engine: GameEngine) {
    console.log('MainMenu onInitialize', engine);
    // Add Excalibur labe
    if (useGameStore.getState().musicRunning) {
      RESOURCES.musics.caketown.loop = true;
      RESOURCES.musics.caketown.play();
    }

    const menu = RESOURCES.backgrounds.forest.toSprite();
    menu.width = engine.screen.width;
    menu.height = engine.screen.height;
    // const menu = RESOURCES.backgrounds.menu.toSprite()
    const bgImage = new Actor();
    bgImage.graphics.add(menu);
    bgImage.pos = new Vector(engine.screen.width / 2, engine.screen.height / 2);

    this.add(bgImage);

    console.log('menu', bgImage, RESOURCES.backgrounds.menu);

    // Create a container for React UI
    const uiContainer = document.createElement('div');
    uiContainer.className = 'mx-auto absolute top-0 left-0 flex flex-col gap-4 w-[100vw]';

    uiContainer.style.pointerEvents = 'all'; // This allows clicking through to the game

    // Add the container to the document
    const container = document.getElementById('container');
    if (container) {
      container.appendChild(uiContainer);
    }

    // Create React root and render UI
    this.uiRoot = createRoot(uiContainer);
    this.uiRoot.render(<Menu />);
  }

  onDeactivate() {
    console.log('deactivating');
    RESOURCES.musics.caketown.stop();
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

// React component for the menu U

// override onInitialize(engine: Engine): void {
//   // Scene.onInitialize is where we recommend you perform the composition for your game
//   const player = new Player();
//   this.add(player); // Actors need to be added to a scene to be drawn
// }

// override onPreLoad(loader: DefaultLoader): void {
//   // Add any scene specific resources to load
// }

// override onActivate(context: SceneActivationContext<unknown>): void {
//   // Called when Excalibur transitions to this scene
//   // Only 1 scene is active at a time
// }

// override onDeactivate(context: SceneActivationContext): void {
//   // Called when Excalibur transitions away from this scene
//   // Only 1 scene is active at a time
// }

// override onPreUpdate(engine: Engine, elapsedMs: number): void {
//   // Called before anything updates in the scene
// }

// override onPostUpdate(engine: Engine, elapsedMs: number): void {
//   // Called after everything updates in the scene
// }

// override onPreDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
//   // Called before Excalibur draws to the screen
// }

// override onPostDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
//   // Called after Excalibur draws to the screen
// }
