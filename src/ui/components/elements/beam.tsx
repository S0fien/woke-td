import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../containers/card.tsx';

import { cn } from '#/libs/utils.ts';

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the border in pixels
   * @default 1
   */
  borderWidth?: number;
  /**
   * Duration of the animation in seconds
   * @default 14
   */
  duration?: number;
  /**
   * Color of the border, can be a single color or an array of colors
   * @default "#000000"
   */
  shineColor?: string | string[];
}

/**
 * Shine Border
 *
 * An animated background border effect component with configurable properties.
 */
export function Beam({
  borderWidth = 1,
  duration = 14,
  shineColor = '#000000',
  className,
  style,
  ...props
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          '--border-width': `${borderWidth}px`,
          '--duration': `${duration}s`,
          backgroundImage: `radial-gradient(transparent,transparent, ${
            Array.isArray(shineColor) ? shineColor.join(',') : shineColor
          },transparent,transparent)`,
          backgroundSize: '300% 300%',
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: 'var(--border-width)',
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        'motion-safe:animate-shine pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]',
        className
      )}
      {...props}
    />
  );
}

export function BeamDemo() {
  return (
    <Card className="relative w-full max-w-[350px] overflow-hidden">
      <Beam shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <p>dfopfsdfpdof</p>
            </div>
            <div className="grid gap-2">
              <p>dfopfsdfpdof</p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <button className="w-full">Sign In</button>
      </CardFooter>
    </Card>
  );
}
