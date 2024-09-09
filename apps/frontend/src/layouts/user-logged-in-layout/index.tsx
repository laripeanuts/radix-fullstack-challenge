import { Outlet } from '@tanstack/react-router';

import { Footer } from './footer';
import { Header } from './header';

export const UserLoggedInLayout = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-muted/40 lg:px-24">
      <div className="flex flex-col justify-between max-w-md sm:gap-4 sm:py-4 lg:w-full lg:max-w-max">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
