import type { Meta, StoryObj } from '@storybook/react';
import ExcaliburUiApp from './ExcaliburUiApp.tsx';

const meta: Meta<typeof ExcaliburUiApp> = {
  title: 'Features/ExcaliburUiApp',
  component: ExcaliburUiApp,
};

export default meta;

type Story = StoryObj<typeof ExcaliburUiApp>;

export const Default: Story = {};
