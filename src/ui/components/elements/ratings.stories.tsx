import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ratings } from './rating.tsx';

const meta: Meta<typeof Ratings> = {
  title: 'Elements/Ratings',
  component: Ratings,
};

export default meta;

type Story = StoryObj<typeof Ratings>;

export const StarRating: Story = {
  args: {
    type: 'star',
  },
};

export const HeartRating: Story = {
  args: {
    type: 'heart',
  },
};
