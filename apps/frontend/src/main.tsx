import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryProvider } from '@/providers/query-provider';

import './lib/styles/global.css';

// Import the generated route tree
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './providers/theme-provider';
import { routeTree } from './routeTree.gen';

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
    <ThemeProvider>
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster />
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>,
);
