import { useEngine } from '#/hooks/useEngine.ts';
import { BiNoEntry } from 'react-icons/bi';
import { cn } from '../../../libs/utils.ts';
import { ShinyButton } from '../buttons/shiny-button.tsx';

function Component() {
  return (
    <div className="rounded-md border border-red-500/50 px-4 py-3 text-white">
      <div className="flex gap-3">
        <BiNoEntry size={40} aria-hidden="true" />
        <div className="flex grow justify-between gap-3">
          <p className="text-4xl">NOT RELEASE</p>
        </div>
      </div>
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
}

export default function FlipCard({
  image,
  title,
  description,
  scene,
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
    <div className="relative">
      <div className={cn('group h-72 w-full [perspective:1000px]', className)} {...props}>
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
              <ShinyButton
                //#region
                className="w-full rounded bg-white py-2 font-semibold text-indigo-600 transition-opacity hover:opacity-80"
                onClick={() => engine?.goToScene(scene)}
              >
                START THE FIGHT
              </ShinyButton>
            </div>
          </div>
        </div>
      </div>
      {!available && (
        <div className="absolute top-1/3 left-1/7 z-50 -rotate-20">
          <Component />
        </div>
      )}
    </div>
  );
}
