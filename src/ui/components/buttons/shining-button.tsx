import { BiArrowFromRight } from 'react-icons/bi';
import { cn } from '../../../libs/utils.ts';

export default function ShiningButton({ children }: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button className="group border-opacity-0 hover:border-opacity-100 cursor-pointer rounded-xl border-4 border-violet-800 bg-transparent p-1 transition-all duration-500">
      <div className="relative flex items-center justify-center gap-4 overflow-hidden rounded-lg bg-violet-800 px-6 py-4 font-bold text-white">
        {children}
        <BiArrowFromRight className="transition-all group-hover:translate-x-2 group-hover:scale-125" />
        <div
          className={cn('animate-shimmer absolute top-0 -left-16 h-full w-12 scale-y-150 rotate-[30deg] bg-white/10')}
        />
      </div>
    </button>
  );
}
