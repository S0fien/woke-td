import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../buttons/button.tsx';
import LevelSelector from './level-selector.tsx';
// import './level-selector.css';

const meta: Meta<typeof LevelSelector> = {
  title: 'Containers/LevelSelector',
  component: LevelSelector,
  decorators: Story => (
    <div className="flex">
      <Story />
    </div>
  ),
  args: {
    modalSize: 'lg',
    Trigger: (
      <Button className="m-auto" variant={'brutal'}>
        Trigger selection
      </Button>
    ),
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
