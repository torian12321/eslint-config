import { baseConfig } from '@torian12321/eslint-config';

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
