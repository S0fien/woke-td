import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './menu.tsx';

const meta: Meta<typeof Menu> = {
  title: 'Features/Menu',
  component: Menu,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <div className="bg-black">
      <Menu />
    </div>
  ),
};
