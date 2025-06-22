import { gameOptionsStore } from '#/stores/options.ts';
import { GameOptions } from '#/types/game.ts';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GameOptionsStore extends GameOptions {
  // eslint-disable-next-line no-unused-vars
  setState: (state: Partial<GameOptions>) => void;
  resetGame: () => void;
}

const useGameOptionsStore = create<GameOptionsStore>()(
  devtools(
    persist(
      set => ({
        ...gameOptionsStore,
        setState: newState => set(state => ({ ...state, ...newState })),
        resetGame: () => set({ ...gameOptionsStore, gameStarted: true }),
      }),
      {
        name: 'game-storage',
      }
    )
  )
);

export default useGameOptionsStore;
