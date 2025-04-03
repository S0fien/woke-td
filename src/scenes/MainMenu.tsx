import { Color, Font, Label, Scene } from 'excalibur';
import { useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { ExcaliburContext } from '../root';
import { Dude } from '../entities/Dude';

export class MainMenu extends Scene {
  private uiRoot: ReturnType<typeof createRoot> | null = null;

  constructor() {
    super();
  }

  onInitialize() {
    // Add Excalibur label
    this.add(
      new Label({
        text: 'Main Menu',
        color: Color.White,
        font: new Font({
          family: 'Arial',
          size: 32,
        }),
      })
    );

    this.add(new Dude(100));
    // Create a container for React UI
    const uiContainer = document.createElement('div');
    uiContainer.style.position = 'absolute';
    uiContainer.style.top = '25%';
    uiContainer.style.left = '0';
    uiContainer.style.display = 'flex';
    uiContainer.style.flexDirection = 'column';
    uiContainer.style.justifyContent = 'space-around';

    uiContainer.style.width = this.engine.screen.width + 'px';
    uiContainer.style.height = this.engine.screen.height + 'px';
    // uiContainer.style.pointerEvents = 'all'; // This allows clicking through to the game

    // Add the container to the document
    // document.body.appendChild(uiContainer);
    const container = document.getElementById('container');
    if (container) {
      container.appendChild(uiContainer);
    }

    // Create React root and render UI
    this.uiRoot = createRoot(uiContainer);
    this.uiRoot.render(
      <>
        <ExcaliburContext.Provider value={this.engine}>
          <MenuUI />
        </ExcaliburContext.Provider>
      </>
    );
  }

  onDeactivate() {
    console.log('deactivating');
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

// React component for the menu UI
function MenuUI() {
  const engine = useContext(ExcaliburContext)
  return (
    // <ExcaliburRoot>
    <>
      <h1>Hello</h1>
      <div id="menu-buttons">
        <button
          onClick={async () => {
            console.log('Start Game');
            await engine.goToScene('gameScene');
            // engine.goToScene('GameMenu')
          }}
        >
          Start Game
        </button>
        <button onClick={() => console.log('Options')}>Options</button>
        <button onClick={() => console.log('Exit')}>Exit</button>
      </div>

      {/* </ExcaliburRoot> */}
    </>
  );
}
