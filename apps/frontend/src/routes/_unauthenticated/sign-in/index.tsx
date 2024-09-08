import { SignInPage } from '@/pages/users/sign-in-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauthenticated/sign-in/')({
  component: () => <SignInPage />,
});
