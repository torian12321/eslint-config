import baseConfig from './src/base.js';

export default [
  { ignores: ['eslint.config.js'] },
  ...baseConfig,
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: '.',
      },
    },
  },
];
