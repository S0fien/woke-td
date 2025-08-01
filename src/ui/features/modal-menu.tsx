interface UsernameModalProps {
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (username: string) => void;
}

export function UsernameModal({ open, onClose, onSubmit }: UsernameModalProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 3 || username.length > 16) {
      setError('Username must be 3-16 characters.');
      inputRef.current?.focus();
      return;
    }
    setError('');
    onSubmit(username);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.25 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-xs"
          >
            <Card className="rounded-xl px-6 py-4">
              <CardHeader>
                <CardTitle>Enter your username</CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent>
                  <input
                    ref={inputRef}
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full rounded border px-3 py-2 text-black"
                    placeholder="Username"
                    minLength={3}
                    maxLength={16}
                    autoFocus
                  />
                  {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="brutal">
                    OK
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
import { cn } from '#/libs/utils.ts';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode, useRef, useState } from 'react';
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
  ...props
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
                  'm-auto flex w-full max-w-[600px] flex-col gap-8 rounded-xl px-8 py-6 shadow-2xl',
                  cardClassName
                )}
              >
                {(title || description) && (
                  <CardHeader className={cn(headerClassName, 'flex flex-row items-center justify-start gap-4')}>
                    {description && <CardDescription>{description}</CardDescription>}
                    {title && <CardTitle>{title}</CardTitle>}
                  </CardHeader>
                )}
                <CardContent className={cn(props.modalSize === 'sm' && 'border-none')}>{children}</CardContent>
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
