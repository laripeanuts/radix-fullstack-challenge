import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import { useStore } from '@/store';
import { useNavigate } from '@tanstack/react-router';
import { Moon, Sun } from 'lucide-react';

export const Header = () => {
  const { user, singOut, theme, setTheme } = useStore((state) => state);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: 'Error!',
      description: 'You are now logged out',
      variant: 'success',
    });

    singOut();
    navigate({ to: '/sign-in' });
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 py-2 mb-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex items-center gap-4">
        <button
          className="cursor-pointer hover:opacity-80"
          onClick={() => navigate({ to: '/' })}
        >
          {theme === 'light' ? (
            <img
              src="/logo.png"
              alt="radix logo"
              className="object-cover w-32 h-14 drop-shadow-md "
            />
          ) : (
            <img
              src="/logo-white.svg"
              alt="radix logo"
              className="object-cover w-32 h-14 drop-shadow-md "
            />
          )}
        </button>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <div className="w-1 h-10 bg-slate-200"></div>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-violet-900 text-violet-50"
            >
              <span>RA</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{`Welcome, ${user?.name}`}</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
