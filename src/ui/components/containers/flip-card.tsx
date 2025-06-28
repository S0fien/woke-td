import { useEngine } from '#/hooks/useEngine.ts';
import { FaQuestionCircle } from 'react-icons/fa';
import { cn } from '../../../libs/utils.ts';
import { Button } from '../buttons/button.tsx';
function Component() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-3 text-white">
      <FaQuestionCircle size={60} aria-hidden="true" />
      <p className="text-xl">NOT RELEASE YET</p>
    </div>
  );
}
interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  scene: string;
  description: string;
  available: boolean;
  rotate?: 'x' | 'y';
  index: number;
}

export default function FlipCard({
  image,
  title,
  description,
  scene,
  index,
  rotate = 'y',
  className,
  available,
  ...props
}: FlipCardProps) {
  const rotationClass = {
    x: ['group-hover:[transform:rotateX(180deg)]', '[transform:rotateX(180deg)]'],
    y: ['group-hover:[transform:rotateY(180deg)]', '[transform:rotateY(180deg)]'],
  };
  const self = rotationClass[rotate];
  const { engine } = useEngine();

  return (
    <div className="relative size-full">
      <div className={cn('group h-60 w-full [perspective:1000px]', className)} {...props}>
        <div
          className={cn(
            'relative h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]',
            available && self[0]
          )}
        >
          {/* Front */}
          <div className="absolute h-full w-full [backface-visibility:hidden]">
            <img
              src={image}
              alt="image"
              className="h-full w-full rounded-2xl object-cover shadow-2xl shadow-black/40"
            />
            <div className="absolute bottom-4 left-4 text-xl font-bold text-white">{title}</div>
          </div>

          {/* Back */}
          <div
            className={cn(
              'absolute h-full w-full rounded-2xl bg-black/80 p-4 text-slate-200 [backface-visibility:hidden]',
              self[1]
            )}
          >
            <div className="flex min-h-full flex-col justify-between gap-2">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-white">{title}</h1>

                <p className="mt-1 border-t border-t-gray-200 py-4 text-base leading-normal font-medium text-gray-100">
                  {description}{' '}
                </p>
              </div>
              <Button
                variant={'secondary'}
                className="bg-blue-700 font-bold text-white"
                onClick={() => {
                  engine?.goToScene(scene, {}, index);
                }}
              >
                START THE FIGHT
              </Button>
            </div>
          </div>
        </div>
      </div>
      {!available && (
        <div className="absolute top-0 left-0 z-50 flex size-full justify-center">
          <Component />
        </div>
      )}
    </div>
  );
}
