import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.test.js'],
    exclude: ['**/node_modules/**'],
    reporters: 'verbose',
  },
});
