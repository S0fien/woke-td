import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './label.tsx';

const meta: Meta<typeof Label> = {
  title: 'Elements/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Username',
  },
};
