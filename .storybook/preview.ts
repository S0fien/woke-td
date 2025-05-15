import { decorators } from './decorators.tsx';
import type { Preview } from '@storybook/react';
import '../src/styles/styles.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

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
