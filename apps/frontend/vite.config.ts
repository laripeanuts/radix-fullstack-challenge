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
    port: Number(process.env.PORT),
    proxy: {
      '/api': {
        target: process.env.API_URL || 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
