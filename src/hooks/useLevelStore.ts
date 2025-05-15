import { levelStore } from '#/stores/level.ts';
import { LevelState } from '#/types/game.ts';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LevelStore extends LevelState {
  // eslint-disable-next-line no-unused-vars
  setState: (state: Partial<LevelState>) => void;
  resetGame: () => void;
}

const useLevelStore = create<LevelStore>()(
  devtools(
    persist(
      set => ({
        ...levelStore,
        setState: newState => set(state => ({ ...state, ...newState })),
        resetGame: () => set({ ...levelStore }),
      }),
      {
        name: 'game-storage',
      }
    )
  )
);

export default useLevelStore;
