/* eslint-disabe no-unused-vas */
import { Button } from '#/ui/components/buttons/button.tsx';
import ProgressBar from '#/ui/components/elements/progress-bar.tsx';
import { HyperText } from '#/ui/components/texts/hyper-text.tsx';
import * as ex from 'excalibur';
import { Root, createRoot } from 'react-dom/client';
import { GameEngine } from './GameEngine.tsx';

const Loading = ({ progress }: { progress: number }) => {
  return (
    <div className="pointer-events-auto flex flex-col items-center gap-20">
      <HyperText className="overflow-auto py-20 text-[8rem] font-bold text-white drop-shadow">Woke TD</HyperText>
      {progress === 1 ? (
        <Button id="startGame" size={'lg'} variant={'brutal-normal'}>
          Enter Game
        </Button>
      ) : (
        <ProgressBar currentValue={progress} />
      )}
    </div>
  );
};
export class CustomLoader extends ex.DefaultLoader {
  private uiRoot: Root | null = null;

  constructor() {
    super();
    this.createUi();
  }

  private createUi() {
    if (document.querySelector('#loader-ui')) return;
    const uiContainer = document.createElement('div');
    uiContainer.id = 'loader-ui';
    uiContainer.className =
      'fixed inset-0 flex items-center justify-center pointer-events-none z-50 size-full m-auto max-w-[1368px] max-h-[768px]';
    uiContainer.style.backgroundSize = 'cover';
    uiContainer.style.backgroundPosition = 'center';
    document.body.appendChild(uiContainer);

    this.uiRoot = createRoot(uiContainer);
    this.uiRoot.render(<Loading progress={this.progress} />);
  }

  private destroyUi() {
    if (this.uiRoot) {
      this.uiRoot.unmount();
      const uiContainer = document.getElementById('loader-ui');
      if (uiContainer) {
        uiContainer.remove();
      }
      this.uiRoot = null;
    }
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    void ctx;
    // super.onDraw(ctx);
    console.log('do not draw');
  }

  override async onUserAction(): Promise<void> {
    return new Promise(resolve => {
      const handler = (evt: MouseEvent) => {
        const target = evt.target as HTMLElement;
        if (target.id === 'startGame') {
          window.removeEventListener('click', handler);
          this.destroyUi();
          resolve();
        }
      };
      window.addEventListener('click', handler);
    });
  }

  override onUpdate(engine: GameEngine, elapsedMilliseconds: number): void {
    void engine, elapsedMilliseconds;
    // Perform something every tick, for example collect time elapsed or check
    // what file namess have been loaded for drawing!
    if (this.uiRoot) {
      this.uiRoot.render(<Loading progress={this.progress} />);
    }
  }

  override async onBeforeLoad(): Promise<void> {
    // Overrideable lifecycle method, called directly before loading starts
    // Useful if you need to do anything to the screen/viewport
    // this.engine.backgroundColor = ex.Color.Green;
  }

  override async onAfterLoad(): Promise<void> {
    // Overrideable lifecycle method, called after loading has completed
    // Useful if you need to do anything to the screen/viewport
  }
}
