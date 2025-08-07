import type { Meta, StoryObj } from '@storybook/react-vite';

import { TRUMPER_TOWER } from '#/constants/towers.ts';
import useLevelStore from '#/hooks/useLevelStore.ts';
import { TowerContainer } from './tower-container.tsx';

const mockState = {
  selectedTower: null,
  towers: [TRUMPER_TOWER],
  setState: () => {},
  resetGame: () => {},
};

const meta: Meta<typeof TowerContainer> = {
  component: TowerContainer,
  title: 'Containers/TowerContainer',
  decorators: [
    Story => {
      // Set Zustand store state before rendering the story
      useLevelStore.setState(mockState);
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof TowerContainer>;

export const Primary: Story = {
  render: () => <TowerContainer />,
};
