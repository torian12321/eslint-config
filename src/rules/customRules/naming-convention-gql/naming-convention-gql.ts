import { gqlIsFragment, gqlIsMutation } from '../utils';
import {
  DEFAULT_FRAGMENT_SUFFIXES,
  DEFAULT_MUTATION_PREFIXES,
  DEFAULT_QUERY_PREFIXES,
} from './constants';
import {
  formatTocamelCase,
  hasValidPrefix,
  hasValidSuffix,
  isCamelCase,
} from './utils';

/**
 * ESLint rule to enforce naming conventions for GraphQL when using `graphql-tag`.
 *
 * This rule checks that:
 * 1. GraphQL queries are declared using 'const'
 * 2. Variable names for queries and mutations are in UPPERCASE_SNAKE_CASE format
 * 3. Variable names for queries use a valid prefix:
 *    - 'GET_'
 * 4. Variable names for mutations use a valid prefix:
 *    - 'CREATE_' | 'UPDATE_' | 'DELETE_' | 'BULK_CREATE_' | 'BULK_UPDATE_' | 'BULK_DELETE_'
 * 5. Variable names for fragments are in camelCase format
 * 6. Variable names for fragments use a valid suffix:
 *    - 'Fragment'
 *
 */
export const namingConventionGqlRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce naming conventions for GraphQL queries and mutations',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [
      {
        oneOf: [
          {
            type: 'object',
            properties: {
              queryPrefixes: {
                minItems: 1,
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              mutationPrefixes: {
                minItems: 1,
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              fragmentSuffixes: {
                minItems: 1,
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
            additionalProperties: false,
          },
        ],
      },
    ],
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(context: any) {
    const options = context.options[0] ?? {};
    let validQueryPrefixes = DEFAULT_QUERY_PREFIXES;
    let validMutationPrefixes = DEFAULT_MUTATION_PREFIXES;
    let validFragmentSuffixes = DEFAULT_FRAGMENT_SUFFIXES;

    if (typeof options === 'object') {
      if (options.queryPrefixes) {
        validQueryPrefixes = options.queryPrefixes;
      }
      if (options.mutationPrefixes) {
        validMutationPrefixes = options.mutationPrefixes;
      }
      if (options.fragmentSuffixes) {
        validFragmentSuffixes = options.fragmentSuffixes;
      }
    }

    return {
      // Performs action in the function on every variable declarator
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      VariableDeclarator(node: any) {
        if (node?.init?.tag?.name === 'gql') {
          const varName = node?.id?.name ?? '';
          const varKind = node.parent.kind;
          const quasis = node?.init?.quasi?.quasis;

          if (varKind !== 'const') {
            context.report({
              node,
              message:
                "gql variable declaration must use 'const' instead of '{{ varKind }}'.",
              data: {
                varKind,
              },
            });
          }

          if (gqlIsFragment(quasis)) {
            if (!isCamelCase(varName)) {
              context.report({
                node,
                message:
                  "gql variable name '{{ varName }}' must be in camelCase format",
                data: {
                  varName,
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                fix(fixer: any) {
                  // Convert to camelCase
                  const camelCased = formatTocamelCase(varName);
                  return fixer.replaceText(node?.id, camelCased);
                },
              });
            }
            if (!hasValidSuffix(varName, validFragmentSuffixes)) {
              context.report({
                node,
                message:
                  'gql fragment variable name must use a valid suffix: {{ validSuffix }}.',
                data: {
                  validSuffix: validFragmentSuffixes
                    .map(suffix => `'${suffix}'`)
                    .join(' | '),
                },
              });
            }
          } else {
            // Check for UPPER_CASE format on mutation/query
            if (varName !== varName.toUpperCase()) {
              context.report({
                node,
                message:
                  "gql variable name '{{ varName }}' must be in UPPER_CASE format",
                data: {
                  varName,
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                fix(fixer: any) {
                  return fixer.replaceText(
                    node?.id,
                    varName.replace(/([A-Z])/g, '_$1').toUpperCase(),
                  );
                },
              });
            }

            if (!gqlIsMutation(quasis)) {
              if (!hasValidPrefix(varName, validQueryPrefixes)) {
                context.report({
                  node,
                  message:
                    'gql query variable name must use a valid prefix: {{ validPrefixes }}.',
                  data: {
                    validPrefixes: validQueryPrefixes
                      .map(prefix => `'${prefix}_'`)
                      .join(' | '),
                  },
                });
              }
            } else {
              if (!hasValidPrefix(varName, validMutationPrefixes)) {
                context.report({
                  node,
                  message:
                    'gql mutation variable name must use a valid prefix: {{ validPrefixes }}.',
                  data: {
                    validPrefixes: validMutationPrefixes
                      .map(prefix => `'${prefix}_'`)
                      .join(' | '),
                  },
                });
              }
            }
          }
        }
      },
    };
  },
};
