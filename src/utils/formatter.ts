/**
 * Converts a PasalCase/camelCase string into a human readable string
 * @param source string The string to convert
 * @param keepCapitalLetters boolean If capital letters should be kept
 * @returns string The converted string
 */
export const humanCase = (source: string, keepCapitalLetters: boolean = true): string => {
  if (!source) return '';
  let transformable = source.trim();
  transformable =
    transformable[0].toUpperCase() +
    transformable
      .slice(1)
      .replace(/([A-Z])/g, ' $1')
      .replace(/\s+/g, ' ');
  if (keepCapitalLetters) {
    return transformable;
  } else {
    return transformable.toLowerCase();
  }
};