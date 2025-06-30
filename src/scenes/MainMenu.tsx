import GAME_CONFIG from '#/constants/config.ts';
import { MAIN_RESOURCES } from '#/constants/resources.ts';
import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import type { GameEngine } from '#/services/GameEngine.tsx';
import Spinner from '#/ui/components/elements/spinner.tsx';
import Menu from '#/ui/features/menu.tsx';
import { Scene, Transition } from 'excalibur';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

let ex: typeof import('excalibur');
export class MainMenu extends Scene {
  private uiRoot: ReturnType<typeof createRoot> | null = null;

  constructor() {
    super();
  }

  createUi(): void {
    if (document.querySelector('#menu-interface')) return;
    const uiContainer = document.createElement('div');
    uiContainer.className = `py-20 h-full flex flex-col items-center justify-around mx-auto`;
    uiContainer.id = 'menu-interface';
    uiContainer.style.pointerEvents = 'all'; // This allows clicking through to the game

    // Add the container to the document
    const container = document.getElementById('ui-container');
    // const container = document.getElementById(GAME_CONFIG.containerId);
    if (container) {
      container.appendChild(uiContainer);
    }

    // Create React root and render UI
    this.uiRoot = createRoot(uiContainer);
    this.uiRoot.render(
      <Suspense fallback={<Spinner />}>
        <Menu />
      </Suspense>
    );
  }

  override onActivate(): void {
    this.createUi();
  }

  override async onInitialize(engine: GameEngine) {
    ex = await import('excalibur');
    MAIN_RESOURCES.musics.caketown.loop = true;
    MAIN_RESOURCES.musics.caketown.play(useGameOptionsStore.getState().musicVolume);

    const menu = MAIN_RESOURCES.backgrounds.menu.toSprite();
    menu.width = engine.screen.canvasWidth;
    menu.height = engine.screen.canvasHeight;
    // const menu = MAIN_RESOURCES.backgrounds.menu.toSprite()
    const bgImage = new ex.Actor();
    bgImage.graphics.add(menu);
    bgImage.pos = new ex.Vector(engine.screen.width / 2, engine.screen.height / 2);

    this.add(bgImage);
    this.createUi();
  }

  override onTransition(direction: 'in' | 'out'): Transition | undefined {
    void direction;

    MAIN_RESOURCES.musics.caketown.stop();
    // Clean up React root when scene is deactivated
    if (this.uiRoot) {
      this.uiRoot.unmount();
      const container = document.getElementById(GAME_CONFIG.containerId);
      const menuContainer = document.getElementById('menu-interface');
      if (menuContainer) {
        container?.removeChild(menuContainer);
      }
    }
    return undefined;
  }
}
