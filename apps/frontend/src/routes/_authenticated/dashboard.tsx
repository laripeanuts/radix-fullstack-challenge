import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: () => {
    const { singOut } = useStore.getState();
    const navigate = useNavigate({ from: '/dashboard' });

    const handleSignOut = () => {
      singOut();
      navigate({ to: '/sign-in' });
    };

    return (
      <div>
        Hello /_authenticated/dashboard!
        <Button onClick={handleSignOut}>logout</Button>
      </div>
    );
  },
});
