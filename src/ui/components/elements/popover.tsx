import { ReactNode } from 'react';

const Popover = ({
  trigger = <button className="btn">Hover me</button>,
  text,
  tip,
}: React.HTMLProps<HTMLDivElement> & { trigger: ReactNode; text?: string; tip?: string }) => {
  return (
    <div className="tooltip" data-tip={tip}>
      <div className="tooltip-content">
        <div className="-rotate-10 animate-bounce text-2xl font-black text-orange-400">{text}</div>
      </div>
      {trigger}
    </div>
  );
};

export default Popover;
