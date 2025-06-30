import { cn } from '#/libs/utils.ts';

interface ProgressBarProps {
  minValue?: number;
  maxValue?: number;
  rounded?: 'none' | 'md' | 'full';
  color?: 'violet' | 'pink' | 'red' | 'orange' | 'yellow' | 'lime' | 'cyan';
  currentValue?: number;
  showPercentage?: boolean;
  disabled?: boolean;
  className?: string;
}

const ProgressBar = ({
  minValue = 0,
  maxValue = 1,
  rounded = 'md',
  color = 'violet',
  currentValue = 0,
  showPercentage = true,
  disabled,
  className,
}: ProgressBarProps) => {
  const clampedValue = Math.min(maxValue, Math.max(currentValue, minValue));
  const widthPercentage = ((clampedValue - minValue) / (maxValue - minValue)) * 100;

  return (
    <div
      className={cn(
        'h-9 w-72 max-w-md overflow-hidden border-2 border-black bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none md:w-full',
        { 'rounded-none': rounded === 'none' },
        { 'rounded-md': rounded === 'md' },
        { 'rounded-full': rounded === 'full' },
        { 'shadow-[2px_2px_0px_rgba(0,0,0,1)]': !disabled },
        {
          'border-[#727272] bg-[#D4D4D4] text-[#676767] hover:bg-[#D4D4D4] hover:shadow-none active:bg-[#D4D4D4]':
            disabled,
        },
        className
      )}
    >
      <div
        style={{ width: widthPercentage + '%' }}
        className={cn(
          'flex h-full flex-row items-center justify-end overflow-hidden',
          {
            'bg-violet-200 hover:bg-violet-300': color === 'violet' && !disabled,
          },
          {
            'bg-pink-200 hover:bg-pink-300': color === 'pink' && !disabled,
          },
          {
            'bg-red-200 hover:bg-red-300': color === 'red' && !disabled,
          },
          {
            'bg-orange-200 hover:bg-orange-300': color === 'orange' && !disabled,
          },
          {
            'bg-yellow-200 hover:bg-yellow-300': color === 'yellow' && !disabled,
          },
          {
            'bg-lime-200 hover:bg-lime-300': color === 'lime' && !disabled,
          },
          {
            'bg-cyan-200 hover:bg-cyan-300': color === 'cyan' && !disabled,
          },
          { 'rounded-none': rounded === 'none' },
          { 'rounded-md': rounded === 'md' },
          { 'rounded-full': rounded === 'full' }
        )}
      >
        {showPercentage && !disabled && (
          <h1
            className={cn(
              'mr-2',
              widthPercentage !== 100 ? 'font-bold' : 'font-black',
              widthPercentage !== 100 ? 'opacity-60' : 'opacity-100',
              className
            )}
          >
            {Math.round(widthPercentage)}%
          </h1>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
