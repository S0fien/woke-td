import type { Meta, StoryObj } from '@storybook/react-vite';
import { Confetti, ConfettiButton } from './confetti.tsx';

const meta: Meta<typeof Confetti> = {
  title: 'Elements/Confetti',
  component: Confetti,
  args: {
    manualstart: true,
  },
};

export default meta;

type Story = StoryObj<typeof Confetti>;

export const Default: Story = {
  render: () => (
    <div>
      <Confetti style={{ width: '100%', height: '200px' }} />
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div>
      <Confetti manualstart={true} style={{ width: '100%', height: '200px' }} />
      <ConfettiButton>Click Me</ConfettiButton>
    </div>
  ),
};
