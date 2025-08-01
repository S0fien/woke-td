import { cn } from '#/libs/utils.ts';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, isValid, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'placeholder:text-muted-foreground flex h-14 w-full border-2 border-white p-4 font-bold text-white shadow-[2px_2px_0_0_#000] transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        props.value !== '' && (isValid ? 'border-green-500' : 'border-red-500'),
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
