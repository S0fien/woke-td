import type { Meta, StoryObj } from '@storybook/react';
import Counter from './Counter.tsx';

const meta: Meta<typeof Counter> = {
  title: 'Components/Texts/Counter',
  component: Counter,
  args: {
    value: 123,
    fontSize: 50,
    places: [100, 10, 1],
    textColor: 'white',
  },
};

export default meta;

type Story = StoryObj<typeof Counter>;

export const Default: Story = {};

export const LargeFont: Story = {
  args: {
    fontSize: 100,
  },
};

export const CustomColors: Story = {
  args: {
    textColor: 'lime',
  },
};
