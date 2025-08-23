import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';

import { namingConventionGqlRule } from './naming-convention-gql';

describe('customRules/naming-convention-gql', () => {
  const ruleTester = new RuleTester({
    languageOptions: { ecmaVersion: 2015 },
  });

  describe('naming convention for queries', () => {
    it('should apply correct naming convention for queries', () => {
      ruleTester.run('naming-convention-gql', namingConventionGqlRule, {
        valid: [
          {
            code: 'const GET_USERS = gql`query getUsers { items { uuid, name } }`',
          },
          {
            // with fragment
            code: 'const GET_USERS = gql`${userFragment} query getUsers { items { uuid, name } }`',
          },
        ],
        invalid: [
          {
            code: 'let GET_USERS = gql`query getUsers { items { uuid, name } }`',
            errors: [
              {
                message:
                  "gql variable declaration must use 'const' instead of 'let'.",
              },
            ],
          },
          {
            code: 'const getUsers = gql`query getUsers { items { uuid, name } }`',
            errors: [
              {
                message:
                  "gql variable name 'getUsers' must be in UPPER_CASE format",
              },
              {
                message:
                  "gql query variable name must use a valid prefix: 'GET_'.",
              },
            ],
            output:
              'const GET_USERS = gql`query getUsers { items { uuid, name } }`',
          },
          {
            code: 'const FETCH_USERS = gql`query getUsers { items { uuid, name  } }`',
            errors: [
              {
                message:
                  "gql query variable name must use a valid prefix: 'GET_'.",
              },
            ],
          },
        ],
      });
    });

    it('should work when passing a custom prefix', () => {
      ruleTester.run('naming-convention-gql', namingConventionGqlRule, {
        valid: [
          {
            code: 'const FETCH_USERS = gql`fetchUsers { items { uuid, name } }`',
            options: [{ queryPrefixes: ['FETCH'] }],
          },
        ],
        invalid: [
          {
            code: 'const GET_USERS = gql`fetchUsers { items { uuid, name } }`',
            options: [{ queryPrefixes: ['FETCH'] }],
            errors: [
              {
                message:
                  "gql query variable name must use a valid prefix: 'FETCH_'.",
              },
            ],
          },
        ],
      });
    });
  });

  describe('naming convention for mutations', () => {
    it('should apply correct naming convention for mutations', () => {
      ruleTester.run('naming-convention-gql', namingConventionGqlRule, {
        valid: [
          {
            code: 'const CREATE_USER = gql`mutation createUser { items { uuid, name } }`',
          },
          {
            code: 'const UPDATE_USER = gql`mutation updateUser { items { uuid, name } }`',
          },
          {
            code: 'const DELETE_USER = gql`mutation deleteUser { items { uuid, name } }`',
          },
          {
            // with fragment
            code: 'const UPDATE_USER = gql`${userFragment} mutation updateUser { items { uuid, name } }`',
          },
        ],
        invalid: [
          {
            code: 'let UPDATE_USER = gql`mutation updateUser { items { uuid, name } }`',
            errors: [
              {
                message:
                  "gql variable declaration must use 'const' instead of 'let'.",
              },
            ],
          },
          {
            code: 'const updateUser = gql`mutation updateUser { items { uuid, name } }`',
            errors: [
              {
                message:
                  "gql variable name 'updateUser' must be in UPPER_CASE format",
              },
              {
                message:
                  "gql mutation variable name must use a valid prefix: 'CREATE_' | 'UPDATE_' | 'DELETE_' | 'BULK_CREATE_' | 'BULK_UPDATE_' | 'BULK_DELETE_'.",
              },
            ],
            output:
              'const UPDATE_USER = gql`mutation updateUser { items { uuid, name } }`',
          },
          {
            code: 'const MODIFY_USER = gql`mutation updateUser { items { uuid, name  } }`',
            errors: [
              {
                message:
                  "gql mutation variable name must use a valid prefix: 'CREATE_' | 'UPDATE_' | 'DELETE_' | 'BULK_CREATE_' | 'BULK_UPDATE_' | 'BULK_DELETE_'.",
              },
            ],
          },
        ],
      });
    });

    it('should work when passing a custom prefix', () => {
      ruleTester.run('naming-convention-gql', namingConventionGqlRule, {
        valid: [
          {
            code: 'const CREATE_USER = gql`mutation createUser { items { uuid, name } }`',
            options: [{ mutationPrefixes: ['CREATE', 'REMOVE'] }],
          },
        ],
        invalid: [
          {
            code: 'const GET_USERS = gql`mutation createUser { items { uuid, name } }`',
            options: [{ mutationPrefixes: ['CREATE', 'REMOVE'] }],
            errors: [
              {
                message:
                  "gql mutation variable name must use a valid prefix: 'CREATE_' | 'REMOVE_'.",
              },
            ],
          },
        ],
      });
    });
  });

  describe('naming convention for fragments', () => {
    it('should apply correct naming convention for fragments', () => {
      ruleTester.run('naming-convention-gql', namingConventionGqlRule, {
        valid: [
          {
            code: 'const userFragment = gql` fragment User_user on User { firstName }`',
          },
        ],
        invalid: [
          {
            code: 'let userFragment = gql` fragment User_user on User { firstName }`',
            errors: [
              {
                message:
                  "gql variable declaration must use 'const' instead of 'let'.",
              },
            ],
          },
          {
            code: 'const USER_FRAGMENT = gql` fragment User_user on User { firstName }`',
            errors: [
              {
                message:
                  "gql variable name 'USER_FRAGMENT' must be in camelCase format",
              },
              {
                message:
                  "gql fragment variable name must use a valid suffix: 'Fragment'.",
              },
            ],
            output:
              'const userFragment = gql` fragment User_user on User { firstName }`',
          },
          {
            code: 'const userPartial = gql` fragment User_user on User { firstName }`',
            errors: [
              {
                message:
                  "gql fragment variable name must use a valid suffix: 'Fragment'.",
              },
            ],
          },
        ],
      });
    });

    it('should work when passing a custom prefix', () => {
      ruleTester.run('naming-convention-gql', namingConventionGqlRule, {
        valid: [
          {
            code: 'const userFr = gql` fragment User_user on User { firstName }`',
            options: [{ fragmentSuffixes: ['Fr', 'Frag'] }],
          },
        ],
        invalid: [
          {
            code: 'const userFragment = gql` fragment User_user on User { firstName }`',
            options: [{ fragmentSuffixes: ['Fr', 'Frag'] }],
            errors: [
              {
                message:
                  "gql fragment variable name must use a valid suffix: 'Fr' | 'Frag'.",
              },
            ],
          },
        ],
      });
    });
    // });
  });
});
