import { Store } from '@/store';
import {
  BeforeLoadContextOptions,
  createFileRoute,
  redirect,
} from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: async (
    ctx: BeforeLoadContextOptions<any, any, any, any, Store>,
  ) => {
    const {
      context: { isAuthenticated },
    } = ctx;

    if (isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    } else {
      throw redirect({ to: '/sign-in' });
    }
  },
});
