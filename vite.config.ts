/// <reference types="vitest" />
import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    !process.env.VITEST &&
      remix({
        appDirectory: 'src/app',
      }),
    tsconfigPaths(),
  ],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      include: ['**/src/**'],
      exclude: ['**/src/vite-env.d.ts', '**/index.ts'],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
  },
});
