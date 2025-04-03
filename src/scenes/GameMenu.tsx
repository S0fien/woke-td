import { Color, Font, Label, Scene } from 'excalibur';
import { createRoot } from 'react-dom/client';
import App from '../app';

export class GameMenu extends Scene {
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

    // Create a container for React UI
    const uiContainer = document.createElement('div');

    uiContainer.style.position = 'absolute';
    uiContainer.style.top = '0';
    uiContainer.style.left = '0';

    uiContainer.style.pointerEvents = 'all'; // This allows clicking through to the game

    // Add the container to the document
    // document.body.appendChild(uiContainer);
    const container = document.getElementById('container');
    if (container) {
      container.appendChild(uiContainer);
    }

    // Create React root and render UI
    this.uiRoot = createRoot(uiContainer);
    this.uiRoot.render(<MenuUI />);
  }

  onDeactivate() {
    // Clean up React root when scene is deactivated
    console.log('deactivating');
    if (this.uiRoot) {
      this.uiRoot.unmount();
    }
  }
}

// React component for the menu UI
function MenuUI() {
  return (
    <>
      <h1>Game Menu</h1>
      <App />
    </>
  );
}
