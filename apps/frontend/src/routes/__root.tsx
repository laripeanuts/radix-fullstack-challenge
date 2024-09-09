import { createRootRoute } from '@tanstack/react-router';

import { UserLoggedInLayout } from '@/layouts/user-logged-in-layout';
import { UserNotLoggedLayout } from '@/layouts/user-not-logged-layout';
import { useStore } from '@/store';

export const Route = createRootRoute({
  beforeLoad: async () => {
    const isAuthenticated = useStore.getState().isAuthenticated;

    if (!isAuthenticated) {
      await import('@/pages/users/sign-in-page');
      await import('@/pages/users/sign-up-page');
    }

    await import('@/pages/users/dashboard');
  },
  component: () => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);

    return isAuthenticated ? <UserLoggedInLayout /> : <UserNotLoggedLayout />;
  },
});
