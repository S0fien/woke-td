import type { Meta, StoryObj } from '@storybook/react';
import { BeamDemo } from './beam.tsx';
import { JSX } from 'react';
import { BorderDemo } from './border-beam.tsx';
const Test2 = ({ children }: { children: JSX.Element }) => <div>{children}</div>;
const meta: Meta<typeof Test2> = {
  title: 'Elements/Beams',
  subcomponents: { BeamDemo, BorderDemo },
  component: Test2,
};

export default meta;

type Story = StoryObj<typeof Test2>;

export const Animated: Story = {
  render: () => (
    <Test2>
      <BeamDemo />
    </Test2>
  ),
};

export const Border: Story = {
  render: () => (
    <Test2>
      <BorderDemo />
    </Test2>
  ),
};
