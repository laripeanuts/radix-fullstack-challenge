/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    setupFiles: ['./src/tests/tests-setup.ts'],
    environment: 'happy-dom',
  },
});
