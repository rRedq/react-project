/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text'],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
  },
});
