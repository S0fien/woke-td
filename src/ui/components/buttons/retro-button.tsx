import { cva, type VariantProps } from 'class-variance-authority';
import { motion, MotionProps } from 'framer-motion';
import * as React from 'react';
import { cn } from '../../../libs/utils.ts';

const retroButtonVariants = cva(
  'relative inline-flex items-center justify-center w-40 border-2 border-transparent rounded-[8px] bg-[#010101] shadow-[1px_1px_1px_rgba(255,255,255,0.6)]',
  {
    variants: {
      variant: {
        default: [
          'text-white',
          '[--bg-color:theme(colors.orange.500)]',
          '[--bg-color-active:theme(colors.orange.600)]',
          '[--shadow-light:theme(colors.orange.300)]',
          '[--shadow-dark:theme(colors.orange.700)]',
        ],
        darkGray: [
          'text-white',
          '[--bg-color:theme(colors.neutral.700)]',
          '[--bg-color-active:theme(colors.neutral.800)]',
          '[--shadow-light:theme(colors.neutral.400)]',
          '[--shadow-dark:theme(colors.neutral.900)]',
        ],
        white: [
          'text-black',
          '[--bg-color:theme(colors.neutral.200)]',
          '[--bg-color-active:theme(colors.neutral.300)]',
          '[--shadow-light:theme(colors.white)]',
          '[--shadow-dark:theme(colors.neutral.500)]',
        ],
        lightGray: [
          'text-white',
          '[--bg-color:theme(colors.neutral.400)]',
          '[--bg-color-active:theme(colors.neutral.500)]',
          '[--shadow-light:theme(colors.neutral.200)]',
          '[--shadow-dark:theme(colors.neutral.600)]',
        ],
        gray: [
          'text-white',
          '[--bg-color:theme(colors.neutral.600)]',
          '[--bg-color-active:theme(colors.neutral.700)]',
          '[--shadow-light:theme(colors.neutral.400)]',
          '[--shadow-dark:theme(colors.neutral.800)]',
        ],
        shiny: [
          // 'border-none',
          'bg-white',
          'text-white',
          '[--bg-color:theme(colors.orange.500)]',
          '[--bg-color-active:theme(colors.orange.600)]',
          '[--shadow-light:theme(colors.orange.300)]',
          '[--shadow-dark:theme(colors.orange.700)]',
          'overflow-hidden', // Needed for shine effect
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const retroButtonInnerVariants = cva([
  'inline-block w-full rounded-[9px] px-3 py-2',
  'uppercase tracking-wider text-center',
  'bg-[var(--bg-color)] transition-all duration-200',
  'shadow-[inset_1px_1px_1px_var(--shadow-light),inset_-1px_-1px_1px_var(--shadow-dark),2px_2px_4px_#000]',
  'active:scale-[0.98] active:bg-[var(--bg-color-active)]',
  'active:shadow-[inset_0_0_4px_#000,inset_1px_1px_1px_transparent,inset_-1px_-1px_1px_transparent,2px_2px_4px_transparent]',
]);

const shineAnimationProps: MotionProps = {
  initial: { '--x': '100%', scale: 0.8 },
  animate: { '--x': '-100%', scale: 1 },
  // whileTap: { scale: 0.95 },
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
};

type OverlappingMotionPropsKeys =
  | 'onAnimationStart'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragTransitionEnd'
  | 'onHoverEnd'
  | 'onHoverStart'
  | 'onPan'
  | 'onPanEnd'
  | 'onPanSessionStart'
  | 'onPanStart'
  | 'onPointerDown'
  | 'onPointerUp'
  | 'onPointerCancel'
  | 'onPointerEnter'
  | 'onPointerLeave'
  | 'onPointerMove'
  | 'onPointerOut'
  | 'onPointerOver'
  | 'onPointerUpCapture'
  | 'onTap'
  | 'onTapCancel'
  | 'onTapStart'
  | 'onTapForce';

export interface RetroShineButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'>,
    VariantProps<typeof retroButtonVariants>,
    Omit<MotionProps, 'ref' | OverlappingMotionPropsKeys | 'style'> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const RetroButton = React.forwardRef<HTMLButtonElement, RetroShineButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    const isShiny = variant === 'shiny';

    // Omit native drag and pan event handlers to avoid type conflicts with Framer Motion
    const { ...restProps } = props as any;

    return (
      <motion.button
        ref={ref}
        className={cn(retroButtonVariants({ variant, className }))}
        {...(isShiny ? shineAnimationProps : {})}
        {...restProps}
      >
        {isShiny ? (
          <>
            <span
              className={cn(retroButtonInnerVariants(), 'relative my-auto tracking-wide uppercase dark:font-light')}
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
          </>
        ) : (
          <span className={retroButtonInnerVariants()}>{children}</span>
        )}
      </motion.button>
    );
  }
);

RetroButton.displayName = 'RetroButton';
