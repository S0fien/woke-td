import type { Meta, StoryObj } from '@storybook/react';

import { TowerContainer } from './tower-container';

const meta: Meta<typeof TowerContainer> = {
  component: TowerContainer,
  title: 'Containers/TowerContainer',
};

export default meta;
type Story = StoryObj<typeof TowerContainer>;

export const Primary: Story = {
  render: () => <TowerContainer />,
};
