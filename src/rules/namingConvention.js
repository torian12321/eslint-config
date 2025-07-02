export const namingConventionRules = {
  rules: {
    'propylon-eslint/naming-convention-gql': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['interface', 'typeAlias'],
        format: ['PascalCase'],
      },
      {
        selector: ['function'],
        // Allow functions to be named with PascalCase to use it with React components.
        format: ['strictCamelCase', 'PascalCase'],
      },
      {
        selector: ['parameter'],
        format: ['strictCamelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        format: ['PascalCase', 'strictCamelCase', 'UPPER_CASE'],
      },
      {
        selector: 'objectLiteralMethod',
        format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
      },
    ],
  },
};
