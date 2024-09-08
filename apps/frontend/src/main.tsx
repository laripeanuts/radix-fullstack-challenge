import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryProvider } from '@/providers/QueryProvider';

import './lib/styles/global.css';

// Import the generated route tree
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { Toaster } from './components/ui/toaster';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
      <Toaster />
    </QueryProvider>
  </StrictMode>,
);
