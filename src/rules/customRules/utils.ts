type Quasi = {
  value?: {
    raw?: string;
  };
};

export const gqlIsFragment = (quasis: Quasi[] = []) => {
  const str = quasis[0]?.value?.raw ?? '';
  const regexFragment = `^\\s*fragment\\s`;
  const reFragment = new RegExp(regexFragment);

  return reFragment.test(str);
};

export const gqlIsMutation = (quasis: Quasi[] = []) => {
  const regexMutation = `^\\s*mutation\\s`;
  const reMutation = new RegExp(regexMutation);

  return quasis.some(quasi => reMutation.test(quasi?.value?.raw ?? ''));
};

export const gqlIsQuery = (quasis: Quasi[] = []) => {
  const regexQuery = `^\\s*query\\s`;
  const reQuery = new RegExp(regexQuery);

  return quasis.some(quasi => reQuery.test(quasi?.value?.raw ?? ''));
};
