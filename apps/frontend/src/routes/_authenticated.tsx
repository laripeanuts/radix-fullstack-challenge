import { Store } from '@/store';
import {
  BeforeLoadContextOptions,
  createFileRoute,
  redirect,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async (
    ctx: BeforeLoadContextOptions<any, any, any, any, Store>,
  ) => {
    const {
      context: { isAuthenticated },
    } = ctx;

    if (!isAuthenticated) {
      throw redirect({ to: '/sign-in' });
    }
  },
});
