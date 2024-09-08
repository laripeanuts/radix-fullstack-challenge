import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  AuthenticationSlice,
  createAuthenticationSlice,
} from './authentication-slice';
import { createThemeSlice, ThemeSlice } from './theme-slice';

export interface Store extends AuthenticationSlice, ThemeSlice {}

export const useStore = create<Store>()(
  persist(
    (...params) => ({
      ...createAuthenticationSlice(...params),
      ...createThemeSlice(...params),
    }),
    { name: 'alpha-bets-store' },
  ),
);
