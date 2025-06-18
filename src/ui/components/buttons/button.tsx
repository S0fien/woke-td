import { cn } from '#/libs/utils.ts';

import React from 'react';

export const Button = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={cn('rounded bg-blue-500 px-4 py-2 font-bold text-white', className)} {...props}>
    {children}
  </button>
);
