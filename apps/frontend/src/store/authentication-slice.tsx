import { StateCreator } from 'zustand';

interface UserAuthenticationPayload {
  name: string;
  email: string;
  id: string;
}

interface AuthenticationState {
  token: string | null;
  user: UserAuthenticationPayload | null;
  isAuthenticated: boolean;
}

interface AuthenticationActions {
  login: (token: string, user: UserAuthenticationPayload) => void;
  logout: () => void;
  clearAuth: () => void;
}

export type AuthenticationSlice = AuthenticationState & AuthenticationActions;

export const createAuthenticationSlice: StateCreator<
  AuthenticationSlice,
  [],
  [],
  AuthenticationSlice
> = (set, _) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  login: (token, user) => set({ token, user, isAuthenticated: true }),
  logout: () => set((state) => ({ isAuthenticated: !!state.token })),
  clearAuth: () => set({ token: null, user: null, isAuthenticated: false }),
});
