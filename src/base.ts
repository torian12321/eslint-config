import pluginJs from '@eslint/js';
import { resolve } from 'node:path';
import tseslint from 'typescript-eslint';

import { customPluginRules } from './rules/customRules';
import { enumRules } from './rules/enums';
import { importRules } from './rules/import';
import { namingConventionRules } from './rules/namingConvention';
import { objectRules } from './rules/objects';
import { prettierRules } from './rules/prettier';
import { variableRules } from './rules/variables';

const project = resolve(process.cwd(), 'tsconfig.json');

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      // Ignore dotfiles
      '.*.js',
      'eslint.config.js',
      'node_modules/*',
      'dist/*',
      'build/*',
      'dist/*',
      'coverage/*',
    ],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}', '!eslint.config.js'] },
  variableRules,
  enumRules,
  objectRules,
  importRules,
  namingConventionRules,
  {
    settings: {
      'import/resolver': {
        typescript: {
          project,
        },
      },
    },
    languageOptions: {
      parserOptions: {
        project,
      },
    },
    plugins: { 'torian12321-eslint': customPluginRules },
    rules: {
      'default-case': 'error',
      'default-param-last': 'warn',
      'no-fallthrough': ['error', { commentPattern: 'fallthrough' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-warning-comments': [
        'warn',
        { terms: ['todo', 'fixme', 'to do'], location: 'start' },
      ],
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'no-else-return': 'error',
      'max-params': ['warn', { max: 3 }],
      'torian12321-eslint/max-params': ['error', { max: 5 }],
      'torian12321-eslint/naming-convention-gql': 'error',
      '@typescript-eslint/member-ordering': ['error'],
      '@typescript-eslint/prefer-for-of': ['error'],
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/no-unused-expressions': ['error'],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/ban-types': 'off',
    },
  },
  ...prettierRules,
];
