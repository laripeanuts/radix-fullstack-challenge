import { Outlet } from '@tanstack/react-router';

export const UserNotLoggedLayout = () => {
  return (
    <div className="flex items-center justify-between w-full min-h-screen overflow-hidden lg:grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center flex-1 h-full py-12">
        <img
          src="/logo.jpeg"
          alt="radix logo"
          width={100}
          height={100}
          className="mb-8 rounded-md drop-shadow-md lg:hidden"
        />
        <Outlet />
      </div>
      <div className="hidden h-full bg-muted lg:block">
        <img
          src="/main.jpg"
          alt="abstract pattern background"
          width="1920"
          height="1080"
          className="relative object-cover w-full h-full"
        />
        <img
          src="/logo-white.svg"
          alt="radix logo"
          width={200}
          height={200}
          className="absolute bottom-0 right-0 mr-24 drop-shadow-md"
        />
      </div>
    </div>
  );
};
