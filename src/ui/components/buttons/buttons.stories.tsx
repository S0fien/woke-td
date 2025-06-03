import type { Meta, StoryObj } from '@storybook/react-vite';
import { JSX } from 'react';
import { Button } from './button.tsx';
import { Shine } from './shine.tsx';
import ShiningButton from './shining-button.tsx';
import { ShinyButton } from './shiny-button.tsx';

const Buttons = ({ children }: { children: JSX.Element }) => <div>{children}</div>;
const meta: Meta<typeof Buttons> = {
  title: 'Components/Buttons',

  subcomponents: {
    Button: Button as React.ComponentType<any>,
    Shine: Shine as React.ComponentType<any>,
    ShiningButton: ShiningButton as React.ComponentType<any>,
    ShinyButton: ShinyButton as React.ComponentType<any>,
  },
  component: Buttons,
};

export default meta;

type Story = StoryObj<typeof Buttons>;

export const Default: Story = {
  render: () => (
    <Buttons>
      <Button>Aurora text</Button>
    </Buttons>
  ),
};

export const ShineButton: Story = {
  render: () => (
    <Buttons>
      <Shine>Aurora text</Shine>
    </Buttons>
  ),
};

export const ShiningButtonn: Story = {
  render: () => (
    <Buttons>
      <ShiningButton>Aurora text</ShiningButton>
    </Buttons>
  ),
};

export const ShinyButtonn: Story = {
  render: () => (
    <Buttons>
      <ShinyButton>Aurora text</ShinyButton>
    </Buttons>
  ),
};
