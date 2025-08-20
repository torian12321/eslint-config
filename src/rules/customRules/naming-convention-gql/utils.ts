export const hasValidPrefix = (varName: string, validPrefixes: string[] = []) =>
  validPrefixes.some(prefix => varName.startsWith(`${prefix}_`));

export const hasValidSuffix = (varName: string, validSuffixes: string[] = []) =>
  validSuffixes.some(suffix => varName.endsWith(suffix));

export const isCamelCase = (str: string) => /^[a-z][a-zA-Z0-9]*$/.test(str);

export const formatTocamelCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, firstChar => firstChar.toLowerCase());
