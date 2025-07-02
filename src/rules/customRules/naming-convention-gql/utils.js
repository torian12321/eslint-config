export const hasValidPrefix = (varName, validPrefixes = []) =>
  validPrefixes.some(prefix => varName.startsWith(`${prefix}_`));

export const hasValidSuffix = (varName, validSuffixes = []) =>
  validSuffixes.some(suffix => varName.endsWith(suffix));

export const isCamelCase = str => /^[a-z][a-zA-Z0-9]*$/.test(str);

export const formatTocamelCase = str =>
  str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, firstChar => firstChar.toLowerCase());
