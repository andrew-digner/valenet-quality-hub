import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: ['tests/e2e/**', 'node_modules/**'],
    coverage: {
      exclude: ['src/app/layout.tsx', 'src/providers/**'],
      provider: 'v8',
      thresholds: {
        branches: 75,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});
