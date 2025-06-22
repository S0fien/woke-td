'use client';

import { cn } from '#/libs/utils.ts';
import { ScrollArea, ScrollBar } from '#/ui/components/elements/scroll-area.tsx';
import { ScrollAreaProps } from '@radix-ui/react-scroll-area';

interface XScrollProps extends ScrollAreaProps {}

export default function XScroll({ children, className, ...props }: XScrollProps) {
  return (
    <div className="flex">
      <ScrollArea className={cn('w-1 flex-1', className)} {...props}>
        {children}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
