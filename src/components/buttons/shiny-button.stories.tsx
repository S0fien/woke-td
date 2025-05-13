import type { Meta, StoryObj } from '@storybook/react';
import { ShinyButton } from './shiny-button';

const meta: Meta<typeof ShinyButton> = {
  title: 'Components/Buttons/ShinyButton',
  component: ShinyButton,
  args: {
    children: 'Click Me',
  },
};

export default meta;

type Story = StoryObj<typeof ShinyButton>;

export const Default: Story = {};

export const CustomClass: Story = {
  args: {
    className: 'bg-blue-500 text-white',
  },
};
