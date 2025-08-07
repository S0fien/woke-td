import { cn } from '#/libs/utils.ts';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva('', {
  variants: {
    variant: {
      default: 'border-transparent bg-primary text-primary-foreground',
      secondary: 'border-transparent bg-secondary text-secondary-foreground',
      destructive: 'border-transparent bg-destructive text-destructive-foreground',
      outline: 'text-foreground',
      retro:
        'relative inline-flex items-center justify-center border-1 border-white rounded-[8px] shadow-[1px_1px_1px_rgba(255,255,255,0.6)] text-white bg-orange-500 hover:bg-orange-600 p-1',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        variant !== 'retro' &&
          'focus-visible:outline-ring/70 inline-flex items-center justify-center rounded-full border px-1.5 text-xs leading-normal font-medium outline-offset-2 transition-colors focus-visible:outline focus-visible:outline-2',
        badgeVariants({ variant }),
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
