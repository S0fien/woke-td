import type { Meta, StoryObj } from '@storybook/react-vite';
import LevelSelector from './level-selector.tsx';
// import './level-selector.css';

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
