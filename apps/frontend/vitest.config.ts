/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    setupFiles: ['./src/tests/setup.ts'],
    environment: 'happy-dom',
  },
});
