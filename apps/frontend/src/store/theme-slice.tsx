import { StateCreator } from 'zustand';

export type Theme = 'dark' | 'light' | 'system';

type ThemeState = {
  theme: Theme;
};

type ThemeActions = {
  setTheme: (theme: Theme) => void;
};

export type ThemeSlice = ThemeState & ThemeActions;

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (
  set,
  _,
) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
});
