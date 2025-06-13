import type { Meta, StoryObj } from '@storybook/react-vite';
import { BiGlobe } from 'react-icons/bi';
import { Button } from '../buttons/button.tsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip.tsx';

const meta: Meta<typeof Tooltip> = {
  title: 'Elements/Tooltip',
  component: Tooltip,
  render: ({ children, delayDuration }) => (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>{children}</Tooltip>
    </TooltipProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    children: (
      <>
        <TooltipTrigger asChild>
          <Button>W/ icon</Button>
        </TooltipTrigger>
        <TooltipContent className="dark py-3">
          <div className="flex gap-3">
            <BiGlobe className="mt-0.5 shrink-0 opacity-60" size={16} aria-hidden="true" />
            <div className="space-y-1">
              <p className="text-[13px] font-medium">Tooltip with title and icon</p>
              <p className="text-muted-foreground text-xs">
                Tooltips are made to be highly customizable, with features like dynamic placement, rich content, and a
                robust API.
              </p>
            </div>
          </div>
        </TooltipContent>
      </>
    ),
  },
};
