import { DashboardPage } from '@/pages/users/dashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/dashboard')({
  loader: () => <DashboardPage />,
  component: () => <DashboardPage />,
});
