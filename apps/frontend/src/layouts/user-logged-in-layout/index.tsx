import { Outlet } from '@tanstack/react-router';

export const UserLoggedInLayout = () => {
  return (
    <div>
      <h1>Logged in LAYOUT</h1>
      <Outlet />
    </div>
  );
};
