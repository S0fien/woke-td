import type { Meta, StoryObj } from '@storybook/react';
import FlipCard from './flip-card';

const meta: Meta<typeof FlipCard> = {
  title: 'Containers/FlipCard',
  component: FlipCard,
  args: {
    image: 'https://via.placeholder.com/300',
    title: 'Card Title',
    description: 'This is the back of the card.',
    subtitle: 'Card Subtitle',
    rotate: 'y',
  },
};

export default meta;

type Story = StoryObj<typeof FlipCard>;

export const Default: Story = {};

export const RotateX: Story = {
  args: {
    rotate: 'x',
  },
};
