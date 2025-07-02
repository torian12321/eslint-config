import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

import prettierConfig from '@torian12321/prettier-config';

export const prettierRules = [
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error', prettierConfig],
    },
  },
  eslintConfigPrettier,
];
