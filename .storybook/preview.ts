import { decorators } from './decorators.tsx';
import type { Preview } from '@storybook/react-vite';
import '../src/styles/styles.css';

const preview: Preview = {
  decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
