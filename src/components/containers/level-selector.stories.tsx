import type { Meta, StoryObj } from '@storybook/react';
import LevelSelector from './level-selector.tsx';
import './level-selector.css';
// Ensure the relative import path includes the file extension
const meta: Meta<typeof LevelSelector> = {
  title: 'Containers/LevelSelector',
  component: LevelSelector,
  args: {
    modalSize: 'lg',
  },
};

export default meta;

type Story = StoryObj<typeof LevelSelector>;

export const Default: Story = {};

export const SmallModal: Story = {
  args: {
    modalSize: 'sm',
  },
};
