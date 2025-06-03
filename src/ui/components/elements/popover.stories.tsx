import type { Meta, StoryObj } from '@storybook/react-vite';
import Popover from './popover.tsx';

const meta: Meta<typeof Popover> = {
  title: 'Elements/Popover',
  component: Popover,
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    trigger: <button className="btn">Hover me</button>,
    text: 'This is the content of the popover.',
  },
};

export const WithCustomContent: Story = {
  args: {
    tip: 'Hello',
    trigger: <button className="btn">Hover me</button>,
  },
};
