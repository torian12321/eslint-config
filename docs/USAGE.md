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

# Usage Examples

## Usage

At your app/package root level, add a `eslint.config.js` file and add

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

If you have a React app/package, add instead:

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
