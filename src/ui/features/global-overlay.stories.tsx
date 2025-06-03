import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlobalOverlay } from './global-overlay.tsx';

const meta: Meta<typeof GlobalOverlay> = {
  title: 'Features/GlobalOverlay',
  component: GlobalOverlay,
};

export default meta;

type Story = StoryObj<typeof GlobalOverlay>;

export const Default: Story = {};
