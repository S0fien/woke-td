import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './menu';

const meta: Meta<typeof Menu> = {
  title: 'Features/Menu',
  component: Menu,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => <Menu />,
};
