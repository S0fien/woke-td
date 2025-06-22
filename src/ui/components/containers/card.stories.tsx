import { cn } from '#/libs/utils.ts';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BiBell, BiCheck } from 'react-icons/bi';
import { Button } from '../buttons/button.tsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card.tsx';

const notifications = [
  {
    title: 'Someone subscribe in a New York.',
    description: '1 hour ago',
  },
];

type CardProps = React.ComponentProps<typeof Card>;

const CardDemo = ({ className, ...props }: CardProps) => {
  return (
    <Card className={cn('w-full max-w-[380px]', className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex w-full items-center space-x-4 rounded-sm border-2 border-black p-4 dark:border-white">
          <BiBell />
          <div className="flex-1 space-y-1">
            <p className="text-sm leading-none font-medium">Push Notifications</p>
            <p className="text-muted-foreground text-sm">Send notifications to device.</p>
          </div>
          {/* <Switch className="hidden md:block"/> */}
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start border-2 border-black p-4 transition-all dark:border-white dark:bg-zinc-900"
            >
              <span className="flex size-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm leading-none font-medium">{notification.title}</p>
                <p className="text-muted-foreground text-sm">{notification.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="brutal">
          <BiCheck className="mr-2 size-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
};

const meta: Meta<typeof Card> = {
  title: 'Containers/Card',
  component: Card,
  render: () => <CardDemo />,
  //   args: {
  //     // image: 'https://via.placeholder.com/300',
  //     title: 'Card Title',
  //     // description: 'This is the back of the card.',
  //     // rotate: 'y',
  //   },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const RotateX: Story = {
  args: {
    // rotate: 'x',
  },
};
