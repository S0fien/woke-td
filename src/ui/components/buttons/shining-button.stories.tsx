import type { Meta, StoryObj } from '@storybook/react';
import ShiningButton from './shining-button.tsx';

const meta: Meta<typeof ShiningButton> = {
  title: 'Components/Buttons/ShiningButton',
  component: ShiningButton,
};

export default meta;

type Story = StoryObj<typeof ShiningButton>;

export const Default: Story = {};
