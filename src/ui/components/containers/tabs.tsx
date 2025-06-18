'use client';

import { cn } from '#/libs/utils.ts';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('bg-muted text-muted-foreground/70 inline-flex items-center justify-center rounded-lg', className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'hover:text-muted-foreground focus-visible:outline-ring/70 aria-selected:text-foreground inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap outline-offset-2 transition-all focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:bg-pink-300/40 aria-selected:shadow-sm aria-selected:shadow-black/5',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('focus-visible:outline-ring/70 mt-2 outline-offset-2 focus-visible:outline-2', className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
