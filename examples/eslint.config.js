import { reactConfig } from '@torian12321/eslint-config';

export default [
  ...reactConfig,
  {
    // Add any project-specific overrides here
    rules: {
      // Example: disable a rule for this project
      'no-console': 'off',
    },
  },
];
