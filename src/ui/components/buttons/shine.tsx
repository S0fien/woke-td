import * as React from 'react';
import { cn } from '../../../libs/utils.ts';
import { motion, MotionProps, type AnimationProps } from 'motion/react';

const animationProps = {
  initial: { '--x': '100%', scale: 0.8 },
  animate: { '--x': '-100%', scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 1,
    type: 'spring',
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: 'spring',
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;

interface ShineProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>, MotionProps {
  children: React.ReactNode;
  className?: string;
}

export const Shine = React.forwardRef<HTMLButtonElement, ShineProps>(({ children, className, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(
        'relative me-2 mb-2 rounded-lg px-5 px-6 py-2 py-2.5 text-center text-xl font-medium text-white backdrop-blur-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-bl hover:shadow hover:shadow-[0_0_20px_var(--primary)/10%] focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800',
        className
      )}
      {...animationProps}
      {...props}
    >
      <span
        className="relative block size-full text-2xl tracking-wide uppercase dark:font-light"
        style={{
          maskImage:
            'linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))',
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
          WebkitMask:
            'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
          backgroundImage:
            'linear-gradient(-75deg,var(--primary)/10% calc(var(--x)+20%),var(--primary)/50% calc(var(--x)+25%),var(--primary)/10% calc(var(--x)+100%))',
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] p-px"
      ></span>
    </motion.button>
  );
});

Shine.displayName = 'Shine';
