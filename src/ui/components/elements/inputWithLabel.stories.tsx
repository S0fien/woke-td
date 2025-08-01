import type { Meta } from '@storybook/react-vite';
import { Input } from './input.tsx';
import { Label } from './label.tsx';

const meta: Meta = {
  title: 'Elements/InputWithLabel',
  tags: ['autodocs'],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Label htmlFor="input-story">Username</Label>
      <Input id="input-story" placeholder="Enter username" />
    </div>
  ),
};

export default meta;

export const Default = {};
