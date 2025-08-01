import { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input.tsx';

const meta: Meta<typeof Input> = {
  title: 'Elements/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
  },
};

export const Invalid: Story = {
  args: {
    placeholder: 'Invalid input',
    'aria-invalid': true,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};
