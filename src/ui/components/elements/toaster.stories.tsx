import { toast } from '#/hooks/useToast.ts';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CiCircleCheck } from 'react-icons/ci';
import { FaMarker } from 'react-icons/fa';
import { Button, ButtonProps } from '../buttons/button.tsx';
import Toaster, { ToastAction } from './toaster.tsx';

type ToasterStoryArgs = {
  toastParams: any;
  buttonLabel: string;
  // buttonVariant: typeof buttonVariants;
} & ButtonProps;

const meta: Meta<typeof Toaster> = {
  title: 'Containers/Toaster',
  component: Toaster,
  decorators: [
    Story => (
      <div className="flex h-screen w-screen items-center justify-center">
        <Story />
        <Toaster />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
};

export default meta;

type Story = StoryObj<ToasterStoryArgs>;

export const Default: Story = {
  args: {
    toastParams: {
      title: 'Hello World',
      description: 'This is a toast notification.',
      duration: 3000,
    },
    buttonLabel: 'Show Toast',
    variant: 'default',
  },
  render: ({ toastParams, buttonLabel, ...rest }) => (
    <Button onClick={() => toast(toastParams)} {...rest}>
      {buttonLabel}
    </Button>
  ),
};

export const WithIcon: Story = {
  args: {
    toastParams: {
      title: 'Hello World',
      description: 'This is a toast notification.',
      duration: 3000,
      icon: <CiCircleCheck className="mt-0.5 shrink-0 text-emerald-500" size={38} aria-hidden="true" />,
    },
    buttonLabel: 'Show Toast',
    variant: 'default',
  },
  render: ({ toastParams, buttonLabel, ...rest }) => (
    <Button onClick={() => toast(toastParams)} {...rest}>
      {buttonLabel}
    </Button>
  ),
};

export const Other: Story = {
  args: {
    toastParams: {
      duration: 10000,
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      action: (
        <ToastAction altText="Try again">
          <span className="p-3">Try again</span>
        </ToastAction>
      ),
    },
    buttonLabel: 'Show Toast',
    variant: 'brutal',
  },
  render: ({ toastParams, buttonLabel, ...rest }) => (
    <Button onClick={() => toast(toastParams)} {...rest}>
      {buttonLabel}
    </Button>
  ),
};

export const ActionAndIcon: Story = {
  args: {
    toastParams: {
      icon: <FaMarker className="mb-auto" size={38} />,
      duration: 50000,
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      action: (
        <ToastAction altText="Try again">
          <span className="p-3">Try again</span>
        </ToastAction>
      ),
    },
    buttonLabel: 'Show Toast',
    variant: 'brutal',
  },
  render: ({ toastParams, buttonLabel, ...rest }) => (
    <Button onClick={() => toast(toastParams)} {...rest}>
      {buttonLabel}
    </Button>
  ),
};
