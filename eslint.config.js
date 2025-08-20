import { baseConfig } from './lib/eslint-config.js';

export default [
  ...baseConfig,
  { ignores: ['eslint.config.js', 'examples/**'] },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
