import type { Meta, StoryObj } from '@storybook/react-vite';
import { JSX } from 'react';
import { AuroraText } from './aurora-text.tsx';
import Counter from './Counter.tsx';
import { HyperText } from './hyper-text.tsx';
import { SparklesText } from './sparkles.tsx';
import { TypingAnimation } from './typing-animation.tsx';

const Fonts = ({ children }: { children: JSX.Element }) => <div>{children}</div>;
const meta: Meta<typeof Fonts> = {
  title: 'Components/Fonts',

  subcomponents: {
    AuroraText: AuroraText as React.ComponentType<any>,
    HyperText: HyperText as React.ComponentType<any>,
    TypingAnimation: TypingAnimation as React.ComponentType<any>,
    SparklesText: SparklesText as React.ComponentType<any>,
    Counter: Counter as React.ComponentType<any>,
  },
  component: Fonts,
};

export default meta;

type Story = StoryObj<typeof Fonts>;

export const Aurora: Story = {
  render: () => (
    <Fonts>
      <AuroraText colors={['#FF0080', '#7928CA', '#0070F3', '#38bdf8']} className={'text-2xl'} speed={1}>
        Aurora text
      </AuroraText>
    </Fonts>
  ),
};

export const Hyper: Story = {
  render: () => (
    <Fonts>
      <HyperText>Aurora text</HyperText>
    </Fonts>
  ),
};

export const Typing: Story = {
  render: () => (
    <Fonts>
      <TypingAnimation>Aurora text</TypingAnimation>
    </Fonts>
  ),
};

export const SparklesT: Story = {
  render: () => (
    <Fonts>
      <SparklesText>Aurora text</SparklesText>
    </Fonts>
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
    <Fonts>
      <Counter {...counterArgs} />
    </Fonts>
  ),
};

export const CounterLargeFont: Story = {
  render: () => (
    <Fonts>
      <Counter {...counterArgs} fontSize={100} />
    </Fonts>
  ),
};

export const CounterCustomColors: Story = {
  render: () => (
    <Fonts>
      <Counter {...counterArgs} textColor="lime" />
    </Fonts>
  ),
};
