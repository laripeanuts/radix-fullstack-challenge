import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauthenticated/sign-up/')({
  component: () => <div>Hello /sign-up/!</div>,
});
