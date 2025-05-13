import type { Meta, StoryObj } from '@storybook/react';
import { SparklesText } from './sparkles';

const meta: Meta<typeof SparklesText> = {
  title: 'Components/Texts/SparklesText',
  component: SparklesText,
  args: {
    children: 'Sparkling Text',
    sparklesCount: 10,
    colors: { first: '#9E7AFF', second: '#FE8BBB' },
  },
};

export default meta;

type Story = StoryObj<typeof SparklesText>;

export const Default: Story = {};

export const CustomColors: Story = {
  args: {
    colors: { first: '#FF0000', second: '#00FF00' },
  },
};

export const MoreSparkles: Story = {
  args: {
    sparklesCount: 20,
  },
};
