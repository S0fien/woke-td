import { LEVELS } from '#/constants/levels.ts';
import { cn } from '#/libs/utils.ts';
import { ModalMenu } from '#/ui/features/modal-menu.tsx';
import { Button } from '../buttons/button.tsx';
import FlipCard from './flip-card.tsx';

export default function LevelSelector() {
  return (
    <ModalMenu
      cardClassName="bg-black/40 text-white max-w-[800px]"
      Trigger={<Button variant={'brutal'}>Choose Level</Button>}
      modalSize="lg"
      Footer={Button}
      footerProps={{
        variant: 'brutal',
        className: 'w-full text-lg',
        children: 'Back to menu',
      }}
    >
      <div className="mx-auto grid h-full shrink-0 grid-cols-3 place-items-center gap-6 rounded-md p-6 shadow-md">
        {LEVELS.map((level, i) => (
          <FlipCard
            key={i}
            index={i}
            scene={level.scene}
            available={level.available}
            className={cn(!level.available && 'blur-[10px]')}
            title={level.name}
            description={level.description}
            image={level.image}
          />
        ))}
      </div>
    </ModalMenu>
  );
}
