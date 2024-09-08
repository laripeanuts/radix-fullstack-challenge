import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const UserNotLoggedLayout = () => {
  return (
    <div>
      <h1>Logged in LAYOUT</h1>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
};
