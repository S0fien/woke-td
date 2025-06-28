import { toast } from '#/hooks/useToast.ts';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CiCircleCheck } from 'react-icons/ci';
import { FaMarker } from 'react-icons/fa';
import { Button } from '../buttons/button.tsx';
import Toaster, { ToastAction } from './toaster.tsx';

const meta: Meta<typeof Toaster> = {
  title: 'Containers/Toaster',
  component: Toaster,
};

export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button
        onClick={() => {
          toast({
            title: 'Hello World',
            description: 'This is a toast notification.',
            duration: 3000,
          });
        }}
      >
        Show Toast
      </Button>
      <Toaster />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button
        onClick={() => {
          toast({
            title: 'Hello World',
            description: 'This is a toast notification.',
            duration: 3000,
            icon: <CiCircleCheck className="mt-0.5 shrink-0 text-emerald-500" size={38} aria-hidden="true" />,
          });
        }}
      >
        Show Toast
      </Button>
      <Toaster />
    </div>
  ),
};

export const Other: Story = {
  render: () => (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button
        variant="brutal"
        onClick={() => {
          toast({
            duration: 10000,
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
            action: (
              <ToastAction altText="Try again">
                <span className="p-3">Try again</span>
              </ToastAction>
            ),
          });
        }}
      >
        Show Toast
      </Button>
      <Toaster />
    </div>
  ),
};

export const ActionAndIcon: Story = {
  render: () => (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button
        variant="brutal"
        onClick={() => {
          toast({
            icon: <FaMarker className="mb-auto" size={38} />,
            duration: 50000,
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
            action: (
              <ToastAction altText="Try again">
                <span className="p-3">Try again</span>
              </ToastAction>
            ),
          });
        }}
      >
        Show Toast
      </Button>
      <Toaster />
    </div>
  ),
};
