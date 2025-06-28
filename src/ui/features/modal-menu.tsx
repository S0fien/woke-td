import { cn } from '#/libs/utils.ts';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode, useState } from 'react';
import { Button, ButtonProps } from '../components/buttons/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/containers/card.tsx';

interface ModalMenuProps {
  Trigger: React.JSX.Element;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footerProps: ButtonProps;
  Footer?: typeof Button;
  modalSize?: 'sm' | 'lg';
  cardClassName?: string;
  headerClassName?: string;
}

export function ModalMenu({
  Trigger,
  title,
  description,
  children,
  Footer,
  cardClassName,
  headerClassName,
  footerProps,
}: ModalMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerWithHandler = React.cloneElement(Trigger, {
    onClick: () => setIsOpen(true),
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {triggerWithHandler}
      <AnimatePresence>
        {isOpen && (
          <div
            onClick={handleClose}
            className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-slate-900/20 p-8 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0, rotate: '180deg' }}
              animate={{
                scale: 1,
                rotate: '0deg',
                transition: { type: 'spring', bounce: 0.25 },
              }}
              exit={{ scale: 0, rotate: '180deg' }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-[800px] cursor-default"
            >
              <Card
                className={cn(
                  'flex w-full max-w-[600px] flex-col gap-8 rounded-xl px-8 py-6 shadow-2xl',
                  cardClassName
                )}
              >
                {(title || description) && (
                  <CardHeader className={cn(headerClassName, 'flex flex-row items-center justify-start gap-4')}>
                    {description && <CardDescription>{description}</CardDescription>}
                    {title && <CardTitle>{title}</CardTitle>}
                  </CardHeader>
                )}
                <CardContent>{children}</CardContent>
                {Footer && (
                  <CardFooter>
                    <Footer onClick={handleClose} {...footerProps} />
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
