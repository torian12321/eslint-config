import { baseConfig } from '@torian12321/eslint-config';

export default [
  { ignores: ['eslint.config.js'] },
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
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
