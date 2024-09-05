import react from '@vitejs/plugin-react';
import { config } from 'dotenv';
import { resolve } from 'path';
import { defineConfig } from 'vite';

config({ path: resolve(__dirname, '.env') });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  server: {
    port: Number(process.env.FRONTEND_PORT) || 3001,
    proxy: {
      '/api': {
        target: process.env.BASE_BACKEND_URL || 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
