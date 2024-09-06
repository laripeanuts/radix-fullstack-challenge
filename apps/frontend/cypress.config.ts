import { defineConfig } from 'cypress';
import { env } from './env';

export default defineConfig({
  e2e: {
    baseUrl: env.BASE_FRONTEND_URL,
    env: {
      BASE_FRONTEND_URL: env.BASE_FRONTEND_URL,
      BASE_BACKEND_URL: env.BASE_BACKEND_URL,
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
