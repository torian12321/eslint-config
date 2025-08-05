# Usage

## Environment Setup

To the root of your project, add `.npmrc` file with the given content:

```sh
# .npmrc
#
# Custom registry for @torian12321 packages.
@torian12321:registry=https://npm.pkg.github.com
```

## Installation

Add ESLint config to your app/package as a dependency by running the command:

```sh
npm install eslint @torian12321/eslint-config --save-dev
```

### No Additional Dependencies Required! 🎉

This package is a **meta-package** that includes all required ESLint plugins and dependencies.

That's it! All plugins are included in this package, so you don't need to manage multiple plugin versions or worry about compatibility issues.

> **How it works:** This package includes all ESLint plugins as dependencies, so when you install this package, all the required plugins are automatically available in your `node_modules`. This is the same approach used by popular configs like `eslint-config-airbnb`.

## Add Scripts

Add these scripts to your `package.json` file to apply ESLint rules:

```json
{
  "scripts": {
    "format": "eslint --fix",
    "format:check": "eslint"
  }
}
```

## Configuration

### Basic Setup

At your app/package root level, create an `eslint.config.js` file:

```js
import { baseConfig } from '@torian12321/eslint-config';

export default [
  ...baseConfig,
  {
    // ...customRules,
    // ...customConfig,
  },
];
```

### React Setup

If you have a React app/package, use the React configuration instead:

```js
import { reactConfig } from '@torian12321/eslint-config';

export default [
  ...reactConfig,
  {
    // ...customRules,
    // ...customConfig,
  },
];
```

## Migrating from Existing Projects

When adding `@torian12321/eslint-config` to an existing project, you may encounter conflicts with your current ESLint configuration.

### Initial Setup

1. Run `npm run format` to automatically fix most linting issues
2. Manually address any remaining errors

### Handling Large Numbers of Errors

If you encounter an overwhelming number of errors initially, you can temporarily change specific rules from 'error' to 'warn' in your local configuration.

For example, if your project has a large amount of inline styles (which are not allowed by default), you can temporarily set the rule to 'warn':

```js
import { reactConfig } from '@torian12321/eslint-config';

export default [
  ...reactConfig,
  {
    rules: {
      'no-inline-styles/no-inline-styles': 'warn',
    },
  },
];
```

Later, you can create a dedicated task to remove all inline styles and then remove the rule override to enforce the error level again.
