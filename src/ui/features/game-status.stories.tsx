import useLevelStore from '#/hooks/useLevelStore.ts';
import type { Meta, StoryObj } from '@storybook/react-vite';
import GameStatus from './game-status.tsx';

const meta: Meta<typeof GameStatus> = {
  title: 'Features/GameStatus',
  component: GameStatus,
  beforeEach: () => {
    // Reset the game state after each story
    useLevelStore.getState().resetGame();
  },
};

export default meta;

type Story = StoryObj<typeof GameStatus>;

export const Victory: Story = {
  afterEach: () => {
    // Reset the game state before each story
    useLevelStore.setState({
      ...useLevelStore.getState(),
      victory: true,
    });
  },
};

export const GameOver: Story = {
  afterEach: () => {
    // Reset the game state before each story
    useLevelStore.setState({
      ...useLevelStore.getState(),
      gameOver: true,
    });
  },
};
