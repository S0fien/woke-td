import type { Meta, StoryObj } from '@storybook/react';
import GameInfo from './game-info.tsx';

const meta: Meta<typeof GameInfo> = {
  title: 'Containers/GameInfo',
  component: GameInfo,
};

export default meta;

type Story = StoryObj<typeof GameInfo>;

export const Default: Story = {};
