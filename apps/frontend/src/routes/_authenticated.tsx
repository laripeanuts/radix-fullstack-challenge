import { useStore } from '@/store';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const { isAuthenticated } = useStore.getState();

    if (!isAuthenticated) {
      throw redirect({ to: '/sign-in' });
    }
  },
});
