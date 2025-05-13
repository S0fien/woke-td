import { decorators } from './decorators';
import type { Preview } from '@storybook/react';
import '../src/styles/styles.css'; // replace with the name of your tailwind css file
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