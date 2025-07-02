import { maxParamsRule } from './max-params/index.js';
import { namingConventionGqlRule } from './naming-convention-gql/index.js';

export const propylonCustomPluginRules = {
  rules: {
    'max-params': maxParamsRule,
    'naming-convention-gql': namingConventionGqlRule,
  },
};
