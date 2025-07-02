import { describe, expect, it } from 'vitest';

import { gqlIsFragment, gqlIsMutation } from './utils.js';

describe('customRules/utils', () => {
  describe('gqlIsFragment', () => {
    it('should return true for fragment', () => {
      expect(gqlIsFragment([{ value: { raw: 'fragment test {}' } }])).toBe(
        true,
      );
      expect(
        gqlIsFragment([
          { value: { raw: '\n\n  fragment AnotherFragment { ... }' } },
        ]),
      ).toBe(true);
    });

    it('should return false for non-fragment', () => {
      expect(
        gqlIsFragment([{ value: { raw: 'query SomeQuery { ... }' } }]),
      ).toBe(false);
      expect(
        gqlIsFragment([{ value: { raw: 'mutation SomeMutation { ... }' } }]),
      ).toBe(false);
    });
  });

  describe('gqlIsMutation', () => {
    it('should return true for mutation', () => {
      expect(gqlIsMutation([{ value: { raw: 'mutation test {}' } }])).toBe(
        true,
      );
      expect(
        gqlIsMutation([
          { value: { raw: '\n\n  mutation AnotherMutation { ... }' } },
        ]),
      ).toBe(true);
    });

    it('should return false for non-fragment', () => {
      expect(
        gqlIsMutation([{ value: { raw: 'query SomeQuery { ... }' } }]),
      ).toBe(false);
      expect(
        gqlIsMutation([{ value: { raw: 'fragment SomeFragment { ... }' } }]),
      ).toBe(false);
    });
  });
});
