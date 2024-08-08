import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/vitest.setup.ts',
    coverage: {
      exclude: ['node_modules/**'],
      include: ['src/**'],
    },
  },
});
