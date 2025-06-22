'use client';

import { cn } from '#/libs/utils.ts';
import { cva, type VariantProps } from 'class-variance-authority';
import { Toast as ToastPrimitives } from 'radix-ui';
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BiXCircle } from 'react-icons/bi';
import { FaQuestion, FaWindowClose } from 'react-icons/fa';
import { ToasterToast, useToast } from '../../../hooks/useToast.ts';
import { Button } from '../buttons/button.tsx';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-sm border-2 border-black transition-all p-6 pr-8 transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'destructive group bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />;
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'hover:bg-secondary group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground inline-flex h-8 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-yellow-400 px-3 text-sm font-medium shadow-[2px_2px_0_0_#000] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none focus:outline-none disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'text-foreground/50 hover:text-foreground absolute top-2 right-2 rounded-sm border-2 border-black bg-yellow-400 p-1 opacity-70 shadow-[2px_2px_0_0_#000] transition-all group-hover:opacity-100 group-[.destructive]:text-red-300 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none',
      className
    )}
    toast-close=""
    {...props}
  >
    <FaWindowClose className="size-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn('text-sm opacity-90', className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
};

interface UseProgressTimerProps {
  duration: number;
  interval?: number;
  onComplete?: () => void;
}

function useProgressTimer({
  duration,
  interval = 100,
  onComplete,
  running,
}: UseProgressTimerProps & { running: boolean }) {
  const [progress, setProgress] = useState(duration);
  const timerRef = useRef<number | null>(null);

  // Reset progress when duration changes or running becomes true
  useEffect(() => {
    setProgress(duration);
  }, [duration, running]);

  useEffect(() => {
    if (!running) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    const startTime = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, progress - elapsed);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        onComplete?.();
      }
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [duration, interval, onComplete, running]);

  return { progress };
}

const ToastItem = ({ id, title, description, action, duration = 3000, icon, ...props }: ToasterToast) => {
  const [open, setOpen] = useState(true);
  const { progress } = useProgressTimer({
    duration,
    onComplete: () => setOpen(false),
    running: open,
  });

  const handleOpenChange = useCallback((isOpen: boolean) => setOpen(isOpen), []);

  useEffect(() => {
    if (!open) setOpen(false);
  }, [open]);

  return (
    <Toast key={id} open={open} onOpenChange={handleOpenChange} duration={duration} {...props}>
      <div className="grid gap-1">
        <div className="flex items-center gap-3">
          {icon ? icon : null}
          <div className="space-y-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <div className="flex">{action}</div>
        </div>
        <div>
          <ToastClose asChild>
            <p>coucou</p>
            <FaQuestion color="red" size={30} />
            <Button
              variant="brutal-normal"
              className="group -my-1.5 -me-2 size-8 shrink-0 p-0"
              aria-label="Close notification"
            >
              <BiXCircle color="red" size={30} />
            </Button>
          </ToastClose>
          {/* <ToastClose asChild>
            <BiXCircle color="red" size={30} aria-hidden="true" />
            <Button className="group -my-1.5 -me-2 size-8 shrink-0 p-0" aria-label="Close notification">
              <BiXCircle color="red" size={30} />
            </Button>
          </ToastClose> */}
        </div>
      </div>

      <div className="contents" aria-hidden="true">
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-yellow-400"
          style={{
            width: `${(progress / duration) * 100}%`,
            transition: 'width 100ms linear',
          }}
        />
      </div>
    </Toast>
  );
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="left">
      {toasts.map(props => (
        <ToastItem {...props} key={crypto.randomUUID()} id={crypto.randomUUID()} />
      ))}
      <ToastViewport className="sm:right-auto sm:left-0" />
    </ToastProvider>
  );
}
