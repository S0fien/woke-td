import type { Meta, StoryObj } from '@storybook/react';
import { Shine } from './shine';

const meta: Meta<typeof Shine> = {
  title: 'Components/Buttons/Shine',
  component: Shine,
  args: {
    children: 'Shine Button',
  },
};

export default meta;

type Story = StoryObj<typeof Shine>;

export const Default: Story = {};

export const WithCustomClass: Story = {
  args: {
    className: 'bg-red-500 text-white',
  },
};
