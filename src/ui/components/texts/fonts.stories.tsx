import type { Meta, StoryObj } from '@storybook/react';
import { AuroraText } from './aurora-text.tsx';
import { HyperText } from './hyper-text.tsx';
import { TypingAnimation } from './typing-animation.tsx';
import { SparklesText } from './sparkles.tsx';
import { JSX } from 'react';
import Counter from './Counter.tsx';

const Test = ({ children }: { children: JSX.Element }) => <div>{children}</div>;
const meta: Meta<typeof Test> = {
  title: 'Components/Fonts',
  subcomponents: { AuroraText, HyperText, TypingAnimation, SparklesText, Counter },
  component: Test,
};

export default meta;

type Story = StoryObj<typeof Test>;

export const Aurora: Story = {
  render: () => (
    <Test>
      <AuroraText colors={['#FF0080', '#7928CA', '#0070F3', '#38bdf8']} className={'text-2xl'} speed={1}>
        Aurora text
      </AuroraText>
    </Test>
  ),
};

export const Hyper: Story = {
  render: () => (
    <Test>
      <HyperText>Aurora text</HyperText>
    </Test>
  ),
};

export const Typing: Story = {
  render: () => (
    <Test>
      <TypingAnimation>Aurora text</TypingAnimation>
    </Test>
  ),
};

export const SparklesT: Story = {
  render: () => (
    <Test>
      <SparklesText>Aurora text</SparklesText>
    </Test>
  ),
};

const counterArgs = {
  value: 123,
  fontSize: 50,
  places: [100, 10, 1],
  textColor: 'text-foreground',
};
export const CounterDefault: Story = {
  render: () => (
    <Test>
      <Counter {...counterArgs} />
    </Test>
  ),
};

export const CounterLargeFont: Story = {
  render: () => (
    <Test>
      <Counter {...counterArgs} fontSize={100} />
    </Test>
  ),
};

export const CounterCustomColors: Story = {
  render: () => (
    <Test>
      <Counter {...counterArgs} textColor="lime" />
    </Test>
  ),
};
