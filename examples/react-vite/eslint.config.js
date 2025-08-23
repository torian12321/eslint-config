import { reactConfig } from '@torian12321/eslint-config';

export default [
  ...reactConfig,
  { ignores: ['eslint.config.js'] },
  {
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
    // Add any project-specific overrides here
    rules: {
      // Example: change rule for this project to only warn instead of error
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
