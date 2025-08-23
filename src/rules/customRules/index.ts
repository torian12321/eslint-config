import { maxParamsRule } from './max-params';
import { namingConventionGqlRule } from './naming-convention-gql';

export const customPluginRules = {
  rules: {
    'max-params': maxParamsRule,
    'naming-convention-gql': namingConventionGqlRule,
  },
};
