import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GeneratedImage } from '../types';

interface Store {
  history: GeneratedImage[];
  settings: {
    steps: number;
    guidance: number;
    seed: number;
    width: number;
    height: number;
  };
  addToHistory: (image: GeneratedImage) => void;
  toggleFavorite: (id: string) => void;
  clearHistory: () => void;
  updateSettings: (settings: Partial<Store['settings']>) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      history: [],
      settings: {
        steps: 30,
        guidance: 7.5,
        seed: Math.floor(Math.random() * 1000000),
        width: 768,
        height: 768,
      },
      addToHistory: (image) =>
        set((state) => ({
          history: [image, ...state.history],
        })),
      toggleFavorite: (id) =>
        set((state) => ({
          history: state.history.map((img) =>
            img.id === id ? { ...img, isFavorite: !img.isFavorite } : img
          ),
        })),
      clearHistory: () => set({ history: [] }),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'image-generator-storage',
    }
  )
);