import { Container, createRoot } from 'react-dom/client';
import App from './app.tsx';

const container = (document.getElementById('game-root') as Container) || new HTMLBodyElement();
const root = createRoot(container);
root.render(<App />);
