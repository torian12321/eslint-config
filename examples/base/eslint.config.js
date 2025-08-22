import { baseConfig } from '@torian12321/eslint-config';

export default [
  ...baseConfig,
  { ignores: ['eslint.config.js'] },
  {
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
      },
    },

    // Add any project-specific overrides here
    rules: {
      // Example: disable a rule for this project
      'no-console': 'off',
    },
  },
];
