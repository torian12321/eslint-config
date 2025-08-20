export const enumRules = {
  rules: {
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-mixed-enums': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/no-magic-numbers': [
      'warn',
      {
        ignoreEnums: false,
      },
    ],
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'TSEnumDeclaration',
        message: 'Avoid the use of enums',
      },
    ],
  },
};
