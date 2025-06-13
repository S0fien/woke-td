import type { Meta, StoryObj } from '@storybook/react-vite';
import ContextualMenu from './contextual-menu.tsx';

const meta: Meta<typeof ContextualMenu> = {
  title: 'Features/ContextualMenu',
  component: ContextualMenu,
};

export default meta;

type Story = StoryObj<typeof ContextualMenu>;

export const Default: Story = {};
