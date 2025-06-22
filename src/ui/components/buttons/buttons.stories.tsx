import type { Meta, StoryObj } from '@storybook/react-vite';
import { JSX } from 'react';
import { Button } from './button.tsx';
import { RetroButton } from './retro-button.tsx';
import ShiningButton from './shining-button.tsx';

const Buttons = ({ children }: { children: JSX.Element }) => <div className="m-auto">{children}</div>;
const meta: Meta<typeof Buttons> = {
  title: 'Components/Buttons',
  decorators: Story => (
    <div className="m-auto">
      <Story />
    </div>
  ),
  subcomponents: {
    Button: Button as React.ComponentType<any>,
    ShiningButton: ShiningButton as React.ComponentType<any>,
    Retro: RetroButton as React.ComponentType<any>,
  },
  component: Buttons,
};

export default meta;

type Story = StoryObj<typeof Buttons>;

export const Default: Story = {
  render: () => (
    // <Buttons>
    <Button>Default</Button>
    // </Buttons>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Buttons>
      <Button variant="destructive">Destructive</Button>
    </Buttons>
  ),
};

export const Outline: Story = {
  render: () => (
    <Buttons>
      <Button variant="outline">Outline</Button>
    </Buttons>
  ),
};

export const Secondary: Story = {
  render: () => (
    <Buttons>
      <Button variant="secondary">Secondary</Button>
    </Buttons>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Buttons>
      <Button variant="ghost">Ghost</Button>
    </Buttons>
  ),
};

export const Link: Story = {
  render: () => (
    <Buttons>
      <Button variant="link">Link</Button>
    </Buttons>
  ),
};

export const Brutal: Story = {
  render: () => (
    <Buttons>
      <Button variant="brutal">Brutal</Button>
    </Buttons>
  ),
};

export const BrutalNormal: Story = {
  render: () => (
    <Buttons>
      <Button variant="brutal-normal">Brutal Normal</Button>
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

export const RetroBtn: Story = {
  render: () => (
    <Buttons>
      <RetroButton>Aurora text</RetroButton>
    </Buttons>
  ),
};

export const RetroShinyBtn: Story = {
  render: () => (
    <Buttons>
      <RetroButton variant={'shiny'}>Aurora text</RetroButton>
    </Buttons>
  ),
};
