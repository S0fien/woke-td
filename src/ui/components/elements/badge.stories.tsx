import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge.tsx';

const meta: Meta<typeof Badge> = {
  title: 'Elements/Badge',
  component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Default Badge',
    variant: 'default',
  },
};
export const Retro: Story = {
  args: {
    children: 'Retro Badge',
    variant: 'retro',
  },
};
