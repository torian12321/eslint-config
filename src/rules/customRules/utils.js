export const gqlIsFragment = (quasis = []) => {
  const str = quasis[0]?.value?.raw;
  const regexFragment = `^\\s*fragment\\s`;
  const reFragment = new RegExp(regexFragment);

  return reFragment.test(str);
};

export const gqlIsMutation = (quasis = []) => {
  const regexMutation = `^\\s*mutation\\s`;
  const reMutation = new RegExp(regexMutation);

  return quasis.some(quasi => reMutation.test(quasi?.value?.raw));
};

export const gqlIsQuery = (quasis = []) => {
  const regexQuery = `^\\s*query\\s`;
  const reQuery = new RegExp(regexQuery);

  return quasis.some(quasi => reQuery.test(quasi?.value?.raw));
};
