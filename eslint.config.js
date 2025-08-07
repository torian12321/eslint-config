import { baseConfig } from './src/index.js';

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
