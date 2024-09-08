import { UserAuthenticationPayload } from '@/lib/utils/decode-jwt';
import { StateCreator } from 'zustand';

interface AuthenticationState {
  token: string | null;
  user: UserAuthenticationPayload | null;
  isAuthenticated: boolean;
}

interface AuthenticationActions {
  signIn: ({
    token,
    user,
  }: {
    token: string;
    user: UserAuthenticationPayload;
  }) => void;
  singOut: () => void;
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
  signIn: ({ token, user }) => set({ token, user, isAuthenticated: true }),
  singOut: () => set({ token: null, user: null, isAuthenticated: false }),
});
