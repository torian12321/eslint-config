const DEFAULT_MAX_PARAMS = 3;

/**
 * Enforce a maximum number of parameters in function definitions.
 * This rule is a duplicate of `max-params` from the original on ESLint, but with it will allow a warning and an error for different values.
 */
export const maxParamsRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce a maximum number of parameters in function definitions',
      category: 'Stylistic Issues',
      recommended: false,
    },
    schema: [
      {
        oneOf: [
          {
            type: 'integer',
            minimum: 0,
          },
          {
            type: 'object',
            properties: {
              max: {
                type: 'integer',
                minimum: 0,
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
    const options = context.options[0];
    let maxParams = DEFAULT_MAX_PARAMS;

    if (typeof options === 'object' && Object.hasOwn(options, 'max')) {
      maxParams = options.max;
    } else if (typeof options === 'number') {
      maxParams = options;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkFunction = (node: any) => {
      const totalParams = node.params.length;

      if (totalParams > maxParams) {
        context.report({
          node,
          message:
            'Function has too many parameters ({{ totalParams }}). Maximum allowed is {{ maxParams }}. Consider using an object parameter instead.',
          data: {
            totalParams,
            maxParams,
          },
        });
      }
    };

    return {
      FunctionDeclaration: checkFunction,
      ArrowFunctionExpression: checkFunction,
      FunctionExpression: checkFunction,
    };
  },
};
