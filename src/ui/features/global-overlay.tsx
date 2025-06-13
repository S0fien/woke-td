import useGameOptionsStore from '#/hooks/useGameOptionsStore.ts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { AudioContextFactory } from 'excalibur';
import { BiGlobe, BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
export const GlobalOverlay = () => {
  const kdsjds = AudioContextFactory.create();

  const gameOptions = useGameOptionsStore();
  return (
    <div className={`ml-auto flex cursor-pointer gap-3 pr-10 pb-5`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <CiSettings
              className="pointer-all hover:fill-lightblue size-14 transition-all hover:animate-[spin_ease-in-out_3s]"
              color="lightgray"
            />
          </TooltipTrigger>
          <TooltipContent className="dark bg-black/80 px-4 py-3">
            <div className="flex gap-3">
              <BiGlobe className="mt-0.5 shrink-0 opacity-60" size={16} color="lightgray" aria-hidden="true" />
              <div className="space-y-1">
                <p className="text-foreground text-[13px] font-medium">Not available</p>
                <p className="text-muted-foreground text-xs">This feature is not available yet.</p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {gameOptions.musicRunning ? (
        <BiVolumeFull
          className="size-14 transition-all hover:animate-[pulse_2s_ease-in-out_infinite] hover:fill-amber-300"
          color="lightgray"
          onClick={() => {
            useGameOptionsStore.setState({ ...useGameOptionsStore.getState(), musicRunning: false, musicVolume: -1 });
            kdsjds.suspend();
          }}
        />
      ) : (
        <BiVolumeMute
          className="size-14 transition-all hover:animate-[pulse_2s_ease-in-out_infinite] hover:fill-amber-300"
          color="lightgray"
          onClick={() => {
            useGameOptionsStore.setState({ ...useGameOptionsStore.getState(), musicRunning: true, musicVolume: 1 });
            kdsjds.resume();
          }}
        />
      )}
    </div>
  );
};
