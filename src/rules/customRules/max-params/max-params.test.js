/* eslint-disable no-dupe-keys */
import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';

import { maxParamsRule } from './max-params.js';

describe('customRules/max-params', () => {
  const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2015 },
  });

  it('should pass valid cases and fail invalid cases', () => {
    ruleTester.run('max-params', maxParamsRule, {
      valid: [
        {
          code: 'const myFunction = (a, b, c) => { console.log(a, b, c) }',
        },
      ],
      invalid: [
        {
          code: 'const myFunction = (a, b, c, d, e, f) => { console.log(a, b, c, d, e, f) }',
          errors: 1,
          errors: [
            {
              message:
                'Function has too many parameters (6). Maximum allowed is 3. Consider using an object parameter instead.',
            },
          ],
        },
      ],
    });
  });

  describe('custom options', () => {
    it('should work when passing an object', () => {
      ruleTester.run('max-params', maxParamsRule, {
        valid: [
          {
            code: 'const myFunction = (a, b) => { console.log(a, b) }',
            options: [{ max: 2 }],
          },
        ],
        invalid: [
          {
            code: 'const myFunction = (a, b, c) => { console.log(a, b, c) }',
            options: [{ max: 2 }],
            errors: 1,
            errors: [
              {
                message:
                  'Function has too many parameters (3). Maximum allowed is 2. Consider using an object parameter instead.',
              },
            ],
          },
        ],
      });
    });

    it('should work when passing a number', () => {
      ruleTester.run('max-params', maxParamsRule, {
        valid: [
          {
            code: 'const myFunction = (a, b) => { console.log(a, b) }',
            options: [2],
          },
        ],
        invalid: [
          {
            code: 'const myFunction = (a, b, c) => { console.log(a, b, c) }',
            options: [1],
            errors: 1,
            errors: [
              {
                message:
                  'Function has too many parameters (3). Maximum allowed is 1. Consider using an object parameter instead.',
              },
            ],
          },
        ],
      });
    });
  });
});
