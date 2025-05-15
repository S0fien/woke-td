import type { Meta, StoryObj } from '@storybook/react';
import { AuroraText } from './aurora-text.tsx';

const meta: Meta<typeof AuroraText> = {
  title: 'Components/Texts/AuroraText',
  component: AuroraText,
  args: {
    children: 'Aurora Text',
    colors: ['#FF0080', '#7928CA', '#0070F3', '#38bdf8'],
    speed: 1,
  },
};

export default meta;

type Story = StoryObj<typeof AuroraText>;

export const Default: Story = {};

export const FasterAnimation: Story = {
  args: {
    speed: 2,
  },
};

export const CustomColors: Story = {
  args: {
    colors: ['#FF0000', '#00FF00', '#0000FF'],
  },
};
