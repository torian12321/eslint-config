import { fixupPluginRules } from '@eslint/compat';
import reactHooks from 'eslint-plugin-react-hooks';

export const reactHookRules = {
  plugins: {
    // @ts-expect-error - reactHooks plugin types include flat config which is incompatible with fixupPluginRules types
    'react-hooks': fixupPluginRules(reactHooks),
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/hook-use-state': ['error', { allowDestructuredState: false }],
  },
};
