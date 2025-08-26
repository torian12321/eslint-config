import { resolve } from 'path';

import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      name: '@torian12321/eslint-config',
      formats: ['es', 'cjs'],
      entry: {
        'eslint-config': resolve(__dirname, 'src/index.ts'),
        base: resolve(__dirname, 'src/base.ts'),
        react: resolve(__dirname, 'src/react.ts'),
      },
    },
    rollupOptions: {
      external: [
        // ESLint and related packages
        'eslint',
        '@eslint/js',
        '@eslint/compat',
        'typescript-eslint',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint-config-prettier',
        'eslint-import-resolver-typescript',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-no-inline-styles',
        'eslint-plugin-prettier',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'eslint-plugin-react-refresh',
        'eslint-plugin-simple-import-sort',
        'globals',

        // Node.js built-in modules
        'node:path',
        'node:fs',
        'node:process',
        'path',
        'fs',
        'process',
      ],
      output: {
        // Ensure proper module format
        exports: 'named',
        globals: {
          eslint: 'eslint',
          '@eslint/js': '@eslint/js',
          'typescript-eslint': 'typescript-eslint',
        },
      },
    },
    target: 'node18',
    minify: true,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.test.ts', '**/*.test.tsx', 'vite.config.ts'],
    }),
  ],
  test: {
    include: ['**/*.test.js', '**/*.test.ts'],
    exclude: ['**/node_modules/**'],
    reporters: 'verbose',
  },
});
