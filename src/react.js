import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

import { customPluginRules } from './rules/customRules/index.js';
import { reactHookRules } from './rules/hooks.js';
import { htmlRules } from './rules/html.js';
import { prettierRules } from './rules/prettier.js';
import baseConfig from './base.js';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { ignores: ['storybook-static/*', 'build/*'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  ...baseConfig,
  reactHookRules,
  htmlRules,
  {
    plugins: {
      react,
      'react-refresh': reactRefresh,
      'torian12321-eslint': customPluginRules,
    },
    settings: {
      react: {
        // Tells eslint-plugin-react to automatically detect the version of React to use.
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.ts', '.tsx'],
        },
      ],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
    },
  },
  ...prettierRules,
];
