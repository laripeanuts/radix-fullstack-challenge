import { createRootRoute } from '@tanstack/react-router';

import { UserLoggedInLayout } from '@/layouts/user-logged-in-layout';
import { UserNotLoggedLayout } from '@/layouts/user-not-logged-layout';
import { useStore } from '@/store';

export const Route = createRootRoute({
  component: () => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);

    return isAuthenticated ? <UserLoggedInLayout /> : <UserNotLoggedLayout />;
  },
});
