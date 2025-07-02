import { fixupPluginRules } from '@eslint/compat';
import imprt from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export const importRules = {
  plugins: {
    'simple-import-sort': simpleImportSort,
    import: fixupPluginRules(imprt),
  },
  rules: {
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          // Note that if you use the `node:` prefix for Node.js builtins,
          // you can avoid this complexity: You can simply use "^node:".
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Packages. `react` related packages come first.
          ['^react', '@mui', '^@?\\w'],
          // Personal packages.
          ['^(@|@torian12321)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Local imports but with absolute path.
          ['^(src)(/.*|$)'],
          [
            // Parent imports. Put `..` last.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',

            // Other relative imports. Put same-folder imports and `.` last.
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],
  },
};
