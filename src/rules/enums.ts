export const enumRules = {
  rules: {
    /**
     * Desincourage the use of enums
     */
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'TSEnumDeclaration',
        message: 'Avoid the use of enums',
      },
    ],

    /**
     * Enums rules in case of use:
     */
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-mixed-enums': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
  },
};
