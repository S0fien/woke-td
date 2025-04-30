import { GameState, initialStore } from '../stores/store';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GameStore extends GameState {
  // eslint-disable-next-line no-unused-vars
  setState: (state: Partial<GameState>) => void;
  resetGame: () => void;
}

const useGameStore = create<GameStore>()(
  devtools(
    persist(
      set => ({
        ...initialStore,
        setState: newState => set(state => ({ ...state, ...newState })),
        resetGame: () => set({ ...initialStore, gameStarted: true }),
      }),
      {
        name: 'game-storage',
      }
    )
  )
);

export default useGameStore;
