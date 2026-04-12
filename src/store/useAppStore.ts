import { create } from 'zustand';
import type { SportId, DrillCategory } from '../types';

interface AppState {
  selectedSport: SportId;
  selectedCategory: DrillCategory | 'all';
  setSport: (sport: SportId) => void;
  setCategory: (category: DrillCategory | 'all') => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedSport: 'basketball',
  selectedCategory: 'all',
  setSport: (sport) => set({ selectedSport: sport, selectedCategory: 'all' }),
  setCategory: (category) => set({ selectedCategory: category }),
}));
