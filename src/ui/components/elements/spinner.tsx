import { cn } from '#/libs/utils.ts';
import { motion } from 'framer-motion';

const Spinner = ({ size = 'sm', color = 'blue' }: { size?: 'sm' | 'lg'; color?: string }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={cn('rounded-full', size === 'sm' && 'h-3 w-3', size === 'lg' && 'h-6 w-6', color)}
          initial={{ x: 0 }}
          animate={{
            x: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default Spinner;
