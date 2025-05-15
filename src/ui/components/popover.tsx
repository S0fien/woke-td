import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

const Popover = ({
  trigger,
  title,
  text,
}: React.HTMLProps<HTMLDivElement> & { trigger: ReactNode; title: string; text: string }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent className="text-muted-foreground z-90 flex w-40 flex-col justify-center space-y-2 rounded-md bg-white px-2 py-2 shadow-md">
          <p className="text-xl font-medium">{title}</p>
          <p className="text-muted-foreground text-xs">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Popover;
