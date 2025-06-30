import { LEVELS } from '#/constants/levels.ts';
import { MAIN_RESOURCES } from '#/constants/resources.ts';
import { cn } from '#/libs/utils.ts';
import { ModalMenu } from '#/ui/features/modal-menu.tsx';
import { Button } from '../buttons/button.tsx';
import FlipCard from './flip-card.tsx';

export default function LevelSelector() {
  return (
    <ModalMenu
      description={<img src={MAIN_RESOURCES.icons.level.path} className="w-32" />}
      cardClassName="bg-black/40 text-white max-w-[800px]"
      Trigger={<Button variant={'brutal'}>Choose Level</Button>}
      title="Pick your battle!"
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
