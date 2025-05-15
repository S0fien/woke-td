import type { Meta, StoryObj } from '@storybook/react';
import Bar from './bar.tsx';

const meta: Meta<typeof Bar> = {
  title: 'Containers/Bar',
  component: Bar,
};

export default meta;

type Story = StoryObj<typeof Bar>;

export const Default: Story = {};
