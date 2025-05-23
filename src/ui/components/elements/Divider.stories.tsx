import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider.tsx';

const meta: Meta<typeof Divider> = {
  title: 'Elements/Divider',
  component: Divider,
  args: {
    childrens: [<p>siosdop</p>, <p>siosdop</p>],
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
