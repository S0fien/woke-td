import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stats } from './stats.tsx';

const meta: Meta<typeof Stats> = {
  title: 'Containers/Stats',
  component: Stats,
};

export default meta;

type Story = StoryObj<typeof Stats>;

export const Default: Story = {};
