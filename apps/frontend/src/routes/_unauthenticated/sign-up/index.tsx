import { SignUpPage } from '@/pages/users/sign-up-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauthenticated/sign-up/')({
  component: () => <SignUpPage />,
});
