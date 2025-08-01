'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '#/libs/utils.ts';

const labelVariants = cva(
  'text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-all after:duration-300 hover:after:py-0.5'
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
