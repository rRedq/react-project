/// <reference types="vitest" />
import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   test: {
//     coverage: {
//       provider: 'v8',
//       reporter: ['text'],
//     },
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: ['./setupTests.ts'],
//   },
// });
export default defineConfig({
  plugins: [
    remix({
      appDirectory: 'src/app',
    }),
    tsconfigPaths(),
  ],
});
