import type { Meta, StoryObj } from '@storybook/react-vite';
import Dock from './Dock.tsx';
import { FaHome, FaCog, FaInfoCircle } from 'react-icons/fa';

const meta: Meta<typeof Dock> = {
  title: 'Containers/Dock',
  component: Dock,
  args: {
    items: [
      { icon: <FaHome />, label: 'Home', onClick: () => alert('Home clicked') },
      { icon: <FaCog />, label: 'Settings', onClick: () => alert('Settings clicked') },
      { icon: <FaInfoCircle />, label: 'Info', onClick: () => alert('Info clicked') },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Dock>;

export const Default: Story = {};

export const CustomMagnification: Story = {
  args: {
    magnification: 100,
  },
};

export const CustomDistance: Story = {
  args: {
    distance: 300,
  },
};
