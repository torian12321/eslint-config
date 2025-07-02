import { maxParamsRule } from './max-params/index.js';
import { namingConventionGqlRule } from './naming-convention-gql/index.js';

export const torian12321CustomPluginRules = {
  rules: {
    'max-params': maxParamsRule,
    'naming-convention-gql': namingConventionGqlRule,
  },
};
