import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  AuthenticationSlice,
  createAuthenticationSlice,
} from './authentication-slice';

export interface Store extends AuthenticationSlice {}

export const useStore = create<Store>()(
  persist(
    (...params) => ({
      ...createAuthenticationSlice(...params),
    }),
    { name: 'alpha-bets-store' },
  ),
);
